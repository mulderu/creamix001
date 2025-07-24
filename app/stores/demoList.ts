const { fetchWithAuth, uploadFiles, populateStr
    , fieldStr, sortStr, filterExStr } = useStrapiApi()

export const useDemoListStore = defineStore('demoListStore', {
  state: () => ({
    data: null
  }),
  actions: {
    async fetch() {
      const params = [
        filterExStr([['title', '$in', 'aaaa'], ['title', '$in', 'helo']]),

        fieldStr(['title', 'body']),
        populateStr(['files']),
        sortStr(['id:desc']),
      ].join('&')

      const r = await fetchWithAuth(`/api/mulders?${params}`, {
        method: 'GET',
      })

      console.log(r)
      this.data = r.data
    }
  }
})
