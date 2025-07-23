<script setup>
const website = useWebsiteStore()
const { fetchWithAuth, uploadFiles } = useStrapiApi()

await callOnce(website.fetch)


const form1 = ref({title: "", body: ""})
const files = ref([])
const snackbar = ref(false)


const uploadFile = async () => {
  if (files.value.length == 0) return []

  return await uploadFiles(files.value)
}

const submitData = async () => {
  const r_files = await uploadFile()
  const { title, body } = form1.value
  const r_api = await fetchWithAuth('/api/mulders', {
    method: 'POST',
    body: {
      data: {
        title, body, files: r_files.map(d => d.id)
      }
    }
  })

  console.log(r_api)
  snackbar.value = true
}

</script>


<template>
  <v-container class="fill-height">
    <v-responsive class="align-centerfill-height mx-auto" max-width="900">
      <div>
        <h1>{{ website.name }}</h1>
        <p>{{ website.description }}</p>
      </div>

      <div class="py-4" />

      <v-row>
        <v-col cols="12">
          <v-card class="py-4" color="surface-variant"
            image="https://cdn.vuetifyjs.com/docs/images/one/create/feature.png"
            prepend-icon="mdi-rocket-launch-outline" rounded="lg" variant="outlined">
            <v-card-text>
              <v-text-field
                v-model="form1.title"
                label="Title"
                placeholder="Demo title"
              ></v-text-field>
              <br>
              <v-textarea
                v-model="form1.body"
                label="Body"
                placeholder="Body Data"
              ></v-textarea>

            </v-card-text>
            <v-card-text>
               <v-form @submit.prevent="submitData">
                <v-file-input
                  label="Upload file"
                  v-model="files"
                  multiple
                  accept="image/*"
                  prepend-icon="mdi-upload"
                ></v-file-input>
                <v-btn type="submit" color="primary">Upload</v-btn>
              </v-form>
              
            </v-card-text>
          </v-card>
        </v-col>

      </v-row>

      <v-snackbar
        v-model="snackbar"
        vertical
      >
        <div class="text-subtitle-1 pb-2">Success</div>
        <p>Data was saved ...</p>
        <template v-slot:actions>
          <v-btn
            color="indigo"
            variant="text"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>

    </v-responsive>
  </v-container>
</template>
