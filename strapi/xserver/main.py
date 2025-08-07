from fastapi import FastAPI, HTTPException, Depends, UploadFile, File
from fastapi.responses import FileResponse
from pydantic import BaseModel
import asyncio
from uuid import uuid4, UUID
from typing import Optional, List, Union
from datetime import datetime
import json
import os
import shutil
import dicomutil as du
from types import SimpleNamespace

class DcmCvtRequest(BaseModel):
    urls: List[str]

class FileList(BaseModel):
    files: List[str]


app = FastAPI()

# Directory for storing uploaded files
PUBLIC_DIRECTORY = "/opt/app/public"
UPLOAD_DIRECTORY = f"{PUBLIC_DIRECTORY}/uploads"
DCMPNG_DIRECTORY = f"{PUBLIC_DIRECTORY}/uploads/dcmpngs"

# curl -v -X GET http://localhost:8000/api/job/hello?q=1zzzzzz
@app.get("/api/job/{job_id}")
def api_job(job_id: str, q: Union[str, None] = None):
    return {"job_id": job_id, "q": q}

@app.get("/api/demo/{job_id}")
def api_job(job_id: str):
  files = os.listdir(UPLOAD_DIRECTORY)
  return {"job_id": job_id, "files": files}


@app.post("/api/dcmconvert/{job_id}")
def api_dcmconvert(job_id: str, dcmreq: DcmCvtRequest):
  '''
  { "instances": [{tags}, {}, ...], "thumb": "....png", "nii": ".....nii.gz" }
  '''
  # files = os.listdir(UPLOAD_DIRECTORY)
  # full_data[sid] = {"id": sid, "instances": [], "thumb":"", "nii": ""}
  success_code = 0
  full_data = du.copyDcmAndParse(PUBLIC_DIRECTORY, DCMPNG_DIRECTORY, dcmreq.urls)
  cmd_list = []
  for sid in full_data:
    instanceList = full_data[sid]["instances"]
    instanceList.sort(key=lambda x: x["InstanceNumber"])
    mid_instance = instanceList[len(instanceList)//2]
    modality = mid_instance["Modality"].lower() 
    print('sid:', sid, ', modality:', modality, ', dcm-len:', len(instanceList))

    if modality in ['ct', 'px', 'dx']:
      a_sid_dir = f"{DCMPNG_DIRECTORY}/{sid}"
      a_png_path = f"{a_sid_dir}/0000_{mid_instance['SeriesNumber']}_{mid_instance['InstanceNumber']}.png"
      full_data[sid]["thumb"] = a_png_path.replace(PUBLIC_DIRECTORY, '')
      
      if os.path.exists(a_png_path):
        print('Alread exits pngs:', a_png_path)
      else:
        pngcvt_cmd = f"dcmj2pnm +oj {mid_instance['dcm_path']} {a_png_path}"
        cmd_list.append(pngcvt_cmd)

      if modality == 'ct':
        r = du.processCTData(sid, mid_instance, full_data
                         , cmd_list, a_sid_dir, DCMPNG_DIRECTORY, PUBLIC_DIRECTORY)
        if r == -1:
          success_code = 401 # fail for CT Process
    else:
      print("We don't process this modality:", modality)
      success_code = 400 # fail for modality
        
  du.multipCmd(cmd_list)
  # print(full_data)

  return {"job_id": job_id, "dtags": full_data, "code": success_code}

@app.post("/api/filejob/{job_id}")
def api_filejob(job_id: str, freq: FileList):
  # files = os.listdir(UPLOAD_DIRECTORY)
  r_list = []
  for apath in freq.files:
    print('apath:', apath)
    a_file_path = f"{PUBLIC_DIRECTORY}{apath}"

    if job_id == 'del001':
      os.unlink(a_file_path)
      r_list.append({'cmd': 'del', 'path': a_file_path})

  return {"job_id": job_id, "data": r_list}


# @app.post("/posts/", response_model=BlogPostRead)
# def create_post(post: BlogPostCreate, db: Session = Depends(get_db)):
#     db_post = BlogPost(id=str(uuid4()), title=post.title, content=post.content)
#     db.add(db_post)
#     db.commit()
#     db.refresh(db_post)
#     mqclient.publish(mqtt_topic, json.dumps({"model": "post",
#                      "act": "created", "data": {"id": db_post.id, "title": db_post.title, "content": db_post.content}}))

#     return db_post


# @ app.get("/posts/{post_id}", response_model=BlogPostRead)
# def read_post(post_id: UUID, db: Session = Depends(get_db)):
#     db_post = db.query(BlogPost).filter(BlogPost.id == str(post_id)).first()
#     if db_post is None:
#         raise HTTPException(status_code=404, detail="Post not found")
#     return db_post


# @ app.get("/posts/", response_model=List[BlogPostRead])
# def list_posts(db: Session = Depends(get_db)):
#     return db.query(BlogPost).all()


# @ app.put("/posts/{post_id}", response_model=BlogPostRead)
# def update_post(post_id: UUID, post: BlogPostUpdate, db: Session = Depends(get_db)):
#     db_post = db.query(BlogPost).filter(BlogPost.id == str(post_id)).first()
#     if db_post is None:
#         raise HTTPException(status_code=404, detail="Post not found")
#     if post.title is not None:
#         db_post.title = post.title
#     if post.content is not None:
#         db_post.content = post.content
#     db.commit()
#     db.refresh(db_post)
#     return db_post


# @ app.delete("/posts/{post_id}", response_model=BlogPostRead)
# def delete_post(post_id: UUID, db: Session = Depends(get_db)):
#     db_post = db.query(BlogPost).filter(BlogPost.id == str(post_id)).first()
#     if db_post is None:
#         raise HTTPException(status_code=404, detail="Post not found")
#     db.delete(db_post)
#     db.commit()
#     return db_post


# @ app.get("/posts/search", response_model=List[BlogPostRead])
# def search_posts(query: str, db: Session = Depends(get_db)):
#     results = db.query(BlogPost).filter(
#         or_(BlogPost.title.contains(query), BlogPost.content.contains(query))
#     ).all()
#     return results


# @app.post("/simpleUploadfile/")
# async def upload_file(file: UploadFile = File(...)):
#     file_location = os.path.join(UPLOAD_DIRECTORY, file.filename)
#     with open(file_location, "wb+") as file_object:
#         file_object.write(file.file.read())
#     return {"info": f"file '{file.filename}' saved at '{file_location}'"}


# @app.get("/simpleDownloadfile/{filename}")
# async def download_file(filename: str):
#     file_location = os.path.join(UPLOAD_DIRECTORY, filename)
#     if not os.path.exists(file_location):
#         raise HTTPException(status_code=404, detail="File not found")
#     return FileResponse(path=file_location, filename=filename)


# @app.post("/uploadfile/", response_model=FileInfoRead)
# async def upload_file(file: UploadFile = File(...), db: Session = Depends(get_db)):
#     # Create the directory for the current month
#     current_time = datetime.utcnow()
#     subfolder = current_time.strftime("%Y%m")
#     upload_path = os.path.join(UPLOAD_DIRECTORY, subfolder)
#     os.makedirs(upload_path, exist_ok=True)

#     # Generate a unique filename
#     unique_filename = f"{uuid4()}{os.path.splitext(file.filename)[1]}"
#     file_location = os.path.join(upload_path, unique_filename)

#     # Save the file
#     with open(file_location, "wb+") as file_object:
#         shutil.copyfileobj(file.file, file_object)

#     # Save file information to the database
#     db_file_info = FileInfo(filename=file.filename, filepath=file_location)
#     db.add(db_file_info)
#     db.commit()
#     db.refresh(db_file_info)

#     return db_file_info


# @app.get("/downloadfile/{file_id}", response_model=FileInfoRead)
# async def download_file(file_id: UUID, db: Session = Depends(get_db)):
#     db_file_info = db.query(FileInfo).filter(
#         FileInfo.id == str(file_id)).first()
#     if db_file_info is None:
#         raise HTTPException(status_code=404, detail="File not found")
#     return FileResponse(path=db_file_info.filepath, filename=db_file_info.filename)


# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)