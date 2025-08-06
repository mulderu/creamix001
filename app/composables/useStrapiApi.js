// use on : app/components/UploadMain.vue
//
// composables/useStrapiApi.js
// const { fetchWithAuth } = useStrapiApi()
//
// await fetchWithAuth(`/api/avatas/${documentId}`, {
//    method: 'PUT',
//    body: {
//      data: {
//        ment: form.value.ment,
//      }
//    }
//  })
//
// not use
export const useStrapiApi = () => {
  const config = useRuntimeConfig();
  const state_token = useState("auth_token");
  const token = state_token.value ? state_token : {value: localStorage.getItem('token')};

  const fetchWithAuth = async (url, options = {}) => {
    const headers = options.headers || {};
    headers.Authorization = `Bearer ${token.value}`;

    console.log(headers)

    return await $fetch(`${config.public.apiBase}${url}`, {
      ...options,
      headers,
    });
  };


  //---------- File Api --------
  // GET	/api/upload/files	Get a list of files
  // GET	/api/upload/files/:id	Get a specific file
  // POST	/api/upload	Upload files
  // POST	/api/upload?id=x	Update fileInfo
  // DELETE	/api/upload/files/:id	Delete a file

  const uploadFiles = async (files) => {
    const formData = new FormData()
    for (const file of files) {
      formData.append('files', file)
    }
    // console.log(`Bearer ${token.value}`)

    const res = await $fetch(`${config.public.apiBase}/api/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })

    // console.log(res)
    // return res.map(file => file.id)
    return res
  }

  const filterStr = cols => cols.map((arr, i) => `filters[${arr[0]}][$eq][${i}]=${arr[1]}`).join('&')
  const filterExStr = cols => cols.map((arr, i) => `filters[${arr[0]}][${arr[1]}][${i}]=${arr[2]}`).join('&')
  const fieldStr = cols => cols.map((nm, i) => `fields[${i}]=${nm}`).join('&')
  const populateStr = cols => cols.map((nm, i) => `populate[${i}]=${nm}`).join('&')
  const sortStr = cols => cols.map((nm, i) => `sort[${i}]=${nm}`).join('&')
  const pageStr = (page, pageSize=20) => `pagination[page]=${page}&pagination[pageSize]=${pageSize}`

  return { fetchWithAuth, uploadFiles, fieldStr, populateStr, sortStr, pageStr,
    filterStr, filterExStr
   };
};
