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
  const token = useState("auth_token");

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
    console.log(`Bearer ${token.value}`)

    const res = await $fetch(`${config.public.apiBase}/api/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })

    console.log(res)

    // return res.map(file => file.id)
    return res
  }

  return { fetchWithAuth, uploadFiles };
};
