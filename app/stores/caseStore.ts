const { fetchWithAuth, uploadFiles, populateStr
    , fieldStr, sortStr, filterExStr } = useStrapiApi()

const decodeUtf8 = (encoded: string) => {
  const cleaned = encoded.slice(2, -1);
  const bytes = cleaned.replace(/\\x/g, '%');
  return decodeURIComponent(bytes).replaceAll('^', '');
}

const baseCase = {
  archived: false,
  excluded: false,
  source: "upload",
};


export const useCaseStore = defineStore('caseStore', {
  state: () => ({
    acase: null,
    data: [],
    loading: true,
    baseCase
  }),
  actions: {
    async fetchCase(documentId: string) {
      this.loading = true
      const r = await fetchWithAuth(`/api/cases/${documentId}?populate[0]=patient&populate[1]=dcms`, {
        method: 'GET',
      })
      this.loading = false
      this.acase = r.data
    },

    // async fetch(filters=[], fields=[], populates='*', sorts=['id:desc']) {
    async fetch(filters: string[][], fields=[], populates=[], sorts=['id:desc']) {

      console.log('------------')
      console.log(filters)
      console.log(fields)
      console.log(populates)
      console.log(sorts)
      console.log('------------')
      // const params = [
      //   filterExStr([['title', '$in', 'aaaa'], ['title', '$in', 'helo']]),
      //   fieldStr(['title', 'body']),
      //   populateStr(['files']),
      //   sortStr(['id:desc']),
      // ].join('&')
      
      const params = [
        filterExStr(filters),
        fieldStr(fields),
        populateStr(populates),
        sortStr(sorts),
      ].join('&')

      this.loading = true
      const r = await fetchWithAuth(`/api/cases?${params}`, {
        method: 'GET',
      })

      console.log('caseStore.fetch:::')
      console.log(r)
      this.data = r.data.map(d => ({...d, PatientName: decodeUtf8(d.PatientName)}))
      this.loading = false
    },
    async deleteCase(docId: string) {
      const r = await fetchWithAuth(`/api/cases/${docId}`, {
        method: 'DELETE',
      })
    }
  },
})
