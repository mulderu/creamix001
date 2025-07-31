const { fetchWithAuth, uploadFiles, populateStr
    , fieldStr, sortStr, filterExStr } = useStrapiApi()

const decodeUtf8 = (encoded: string) => {
  const cleaned = encoded.slice(2, -1);
  const bytes = cleaned.replace(/\\x/g, '%');
  return decodeURIComponent(bytes).replaceAll('^', '');
}

const getMstImg = (instances: any) => {
  if (instances && instances.length>0) {
    console.log(":: got ", instances)
    console.log(instances[Math.floor(instances.length / 2)].png_path)
    return instances[Math.floor(instances.length / 2)].png_path
  }
  return ""
}

export const usePatientStore = defineStore('patientStore', {
  state: () => ({
    data: [],
    patient: null,
    loading: true,
  }),
  actions: {
    async fetchPatient(documentId: string) {
      this.loading = true
      const r = await fetchWithAuth(`/api/patients/${documentId}?populate[0]=cases`, {
        method: 'GET',
      })
    
      r.data.cases.forEach((d) => { d['mimg'] = getMstImg(d.instances) })
      r.data.PatientName = decodeUtf8(r.data.PatientName)
      this.patient = r.data
      this.loading = false
    },
    // async fetch(filters=[], fields=[], populates='*', sorts=['id:desc']) {
    async fetch(filters: string[][], fields=[], populates=[], sorts=['id:desc']) {
      const params = [
        filterExStr(filters),
        fieldStr(fields),
        populateStr(populates),
        sortStr(sorts),
      ].join('&')

      this.loading = true
      const r = await fetchWithAuth(`/api/patients?${params}`, {
        method: 'GET',
      })

      this.data = r.data.map(d => ({...d, PatientName: decodeUtf8(d.PatientName)}))
      this.loading = false
    },
    // async deletePatient(docId: string) {
    //   const r = await fetchWithAuth(`/api/patients/${docId}`, {
    //     method: 'DELETE',
    //   })
    // }
  },
})
