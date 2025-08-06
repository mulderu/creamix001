from typing import Optional, List, Union
from datetime import datetime
import json
import os
from multiprocessing import Pool
import time
import shutil
import pydicom
import cv2
from PIL import Image
import tempfile
import dicom2nifti

def copyDcmAndParse(pub_dir, dcm_dir, uploadURLs):
  full_data = {} 
  for upUrl in uploadURLs:
    # print('url:', upUrl)
    a_public_path = f"{pub_dir}{upUrl}"
    dcm_tags = getDcmTags(a_public_path)
    sid = dcm_tags['SeriesInstanceUID']
    a_sid_dir = f"{dcm_dir}/{sid}"
    os.makedirs(a_sid_dir, exist_ok=True)
    a_dcm_path = f"{a_sid_dir}{upUrl.replace('/uploads', '')}"
    # copy dcm to sid dir
    shutil.copyfile(a_public_path, a_dcm_path)
    # print('copy dcm:', a_public_path, a_dcm_path)

    if sid not in full_data:
      full_data[sid] = {"id": sid, "instances": [], "thumb":"", "nii": ""}

    dcm_tags["dcm_path"] = a_dcm_path
    dcm_tags["dcm_file"] = a_dcm_path.replace(pub_dir, "")
    full_data[sid]["instances"].append(dcm_tags)
  return full_data


def makeDcms2Nii(dcm_dir, out_dir):
  os.makedirs(out_dir, exist_ok=True)
  print ("dcm2nii cmd:", dcm_dir, out_dir)
  dicom2nifti.convert_dir.convert_directory(dcm_dir, out_dir)
  # print ("dcm2nii raw-result:", os.listdir(out_dir))
  return [f for f in os.listdir(out_dir) if f.lower().endswith('.nii.gz')]


def copyfiles2TempAndRunJob(files, run_proc):
  dirpath = tempfile.mkdtemp()
  for fpath in files:
    shutil.copyfile(fpath, dirpath)
    r = run_proc(dirpath)
  shutil.rmtree(dirpath)
  return r

def exec_cmd(cmd):
  print("exec_cmd:", cmd)
  try:
    return os.system(cmd)
  except Exception as err:
    print("exec error:", err)
    return -1


def multipCmd(cmds):
    start_time = time.time()
    with Pool(5) as p:
        print(p.map(exec_cmd, cmds))
    print('multipCmd time : %f' % (time.time()-start_time))

def getDcmTags(a_file):
    a_dicom = pydicom.dcmread(a_file)
    krname = a_dicom.PatientName
    # unicode_string = krname.decode('euc-kr') # krname
    unicode_string = str(krname.decode('euc-kr').encode('utf-8'))

    return {
      "PatientID": a_dicom.PatientID,
      "PatientName":unicode_string,
      "PatientSex": a_dicom.PatientSex,
      "PatientBirthDate": a_dicom.PatientBirthDate,
      "StudyInstanceUID": a_dicom.StudyInstanceUID,
      "SeriesInstanceUID": a_dicom.SeriesInstanceUID,
      "SeriesNumber": str(a_dicom.SeriesNumber),
      "InstanceNumber": str(a_dicom.InstanceNumber),
      "SOPInstanceUID": a_dicom.SOPInstanceUID,
      "Modality": a_dicom.Modality,
      "InstanceNumber": str(a_dicom.InstanceNumber),
      "InstitutionName": a_dicom.InstitutionName,
      "StudyDate": a_dicom.StudyDate,
      "StudyTime": a_dicom.StudyTime,
      "StudyDescription": a_dicom.StudyDescription,
      "SeriesDate": a_dicom.SeriesDate,
      "SeriesTime": a_dicom.SeriesTime,
      "SeriesDescription": a_dicom.SeriesDescription,
    }