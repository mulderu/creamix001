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

def exec_cmd(cmd):
  print(cmd)

  try:
    return os.system(cmd)
  except Exception as err:
    print(err)
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