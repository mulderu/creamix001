/**
 * case controller
 */

import { factories } from '@strapi/strapi';
import axios, { AxiosResponse, AxiosError } from 'axios';
// const request = require('request');
import * as fs from 'fs';

const fileDeleteOnDel = true

export default factories.createCoreController('api::case.case', ({ strapi }) => ({
  // GET /cases
  async find(ctx) {
    const response = await super.find(ctx);
    // Add your custom logic here (after or before find)
    return response;
  },

  // GET /cases/:id
  async findOne(ctx) {
    const response = await super.findOne(ctx);
    // Custom logic
    return response;
  },

  // POST /cases
  async create(ctx) {
    // Custom logic before create
    const CreatedById = 1
    const UpdateById = 1
    const PublishedAt = new Date()
    const responseData = []
    const { data: postData } = ctx.request.body;

    console.log('Creating case:', postData);

    // const response = await super.create(ctx);
    // const newCase = response.data

    // Custom logic after create
    // console.log('case created:', newCase);

    const dcmFiles = await strapi.query('plugin::upload.file').findMany({
      where: {
        id: postData.dcms 
      },
    });

    // console.log('dcmFiles:', dcmFiles)
    // const { data: pythonData } = await axios.get(`http://${process.env.HOST_IP}:8000/api/demo/hixxx`);

    const { data: pythonData } = await axios.post(
      `http://${process.env.HOST_IP}:8000/api/dcmconvert/hixxx`, {
        urls: dcmFiles.map(d => d.url)
      });

    for (let series_id in pythonData.dtags) {
      console.log('series_id:', series_id)
      const series = pythonData.dtags[series_id]
      const fInstance = series[0]

      const { PatientID, PatientName, PatientSex, PatientBirthDate} = fInstance

      postData['instances'] = series.map(d => ({SOPInstanceUID: d.SOPInstanceUID, InstanceNumber: d.InstanceNumber, dcm_file: d.dcm_file, png_path: d.png_path}))

      const aPatient = await strapi.query('api::patient.patient').findOne({
        where: {
          PatientID
        },
      });

      if(!aPatient) {
        // insert
        const newPatient = await strapi.entityService.create('api::patient.patient', {
          data: { PatientID, PatientName, PatientSex, PatientBirthDate, CreatedById, UpdateById, PublishedAt }
        })

        console.log('addNewPatient:', newPatient)
        postData['patient'] = newPatient.id
      } else {
        console.log('exitstPatient:', aPatient)
        postData['patient'] = aPatient.id
      }

      const aCase = await strapi.query('api::case.case').findOne({
        where: {
          SeriesInstanceUID: series_id
        },
      });

      if (!aCase) {
        const newData = { ...postData, ...fInstance, CreatedById, UpdateById, PublishedAt }
        // console.log('newData:', newData)
        const newCase = await strapi.entityService.create('api::case.case', {
          data: newData
        })
        responseData.push(newCase)
        console.log('addNewCase:', newCase)
      } else {
        responseData.push(aCase)
        console.log('already:', aCase)
      }
    }

    return { data: responseData };
  },

  // PUT /cases/:id
  async update(ctx) {
    // Custom logic before update
    console.log('Updating case:', ctx.params.id);

    const response = await super.update(ctx);

    // Custom logic after update
    console.log('Updated case:', response);

    return response;
  },

  // DELETE /cases/:id
  async delete(ctx) {
    // delete
    console.log('Delete case:', ctx.params.id);

    const aCase = await strapi.query('api::case.case').findOne({
      populate: ['dcms'],
      where: {
        documentId: ctx.params.id
      },
    });

    // console.log('del at:', aCase)

    if (aCase) {
      if (fileDeleteOnDel) {
        const { data: pythonData } = await axios.post(
          `http://${process.env.HOST_IP}:8000/api/filejob/del001`, {
            files: aCase.instances.map(d => d.png_path)
          });
        // console.log('python return:', pythonData)

        aCase.dcms.map(async(d) => {
          console.log('del:', d)
          if (fs.existsSync(`/opt/app/public${d.url}`)) {
            fs.unlinkSync(`/opt/app/public${d.url}`)
          }
          await strapi.entityService.delete('plugin::upload.file', d.id);
        })
      }
    }

    const response = await super.delete(ctx);
    // Custom logic after delete
    console.log('Deleted case:', response);
    return response;
  },
}));
