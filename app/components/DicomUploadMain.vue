<script setup>
const website = useWebsiteStore();
const caseStore = useCaseStore();
const { fetchWithAuth, uploadFiles } = useStrapiApi();
const { user } = useAuth();

await callOnce(website.fetch);

onMounted(async () => {
  await caseStore.fetch([], [], ['dcms'])
})

const form1 = ref({ title: "", body: "" });
const files = ref([]);
const working = ref(false);
const snackbar = ref(false);

const uploadFile = async () => {
  console.log(files.value)
  const dcmFiles = files.value.filter(d => d.name.toLowerCase().indexOf('.dcm')>-1)
  if (dcmFiles.length == 0) return []
  return await uploadFiles(dcmFiles);
};

const dicomConvert = async (rfiles) => {
  if (rfiles.length == 0) return [];

  return await uploadFiles(files.value);
};

const submitData = async () => {
  const uploaded_dcm_files = await uploadFile();
  if (uploaded_dcm_files.length == 0) {
    alert('We need .dcm files')
    return
  }
  const { title, body } = form1.value;
  const r_api = await fetchWithAuth("/api/cases", {
    method: "POST",
    body: {
      data: {
        ...caseStore.baseCase,
        users_permissions_user: user.id,
        dcms: uploaded_dcm_files.map((d) => d.id),
      },
    },
  });
  await caseStore.fetch([], [], ['dcms'])

};

const deleteCase = async (docId) => {
  await caseStore.deleteCase(docId)
  await caseStore.fetch([], [], ['dcms'])
}

const decodeUtf8 = (encoded) => {
  const cleaned = encoded.slice(2, -1);
  const bytes = cleaned.replace(/\\x/g, '%');
  return decodeURIComponent(bytes);
}

</script>


<template>
  <v-container class="fill-height">
    <v-responsive class="align-centerfill-height mx-auto" max-width="900">
      <div>
        <h1>dicom-upload-main</h1>
        <ul v-if="caseStore.loading">
          <h1>Loading ...</h1>
        </ul>
        <ul v-else>
          <li class="border-b-sm" v-for="row in caseStore.data" :key="row.id">
            {{ row.PatientID }} / {{ decodeUtf8(row.PatientName) }} / {{ row.SeriesNumber }} /
            {{ row.Modality }} / {{ row.SeriesDate}} / {{ row.SeriesTime}} / {{ row.StudyDescription }} / {{ row.SeriesDescription }}
            <v-btn color="primary" @click="deleteCase(row.documentId)">DEL</v-btn>
          </li>
        </ul>
      </div>

      <div class="py-4" />

      <v-row>
        <v-col cols="12">
          <v-card
            class="py-4"
            color="surface-variant"
            image="https://cdn.vuetifyjs.com/docs/images/one/create/feature.png"
            prepend-icon="mdi-rocket-launch-outline"
            rounded="lg"
            variant="outlined"
          >
            <v-card-text>
              <v-form @submit.prevent="submitData">
                <v-file-input
                  label="Upload file"
                  v-model="files"
                  multiple
                  prepend-icon="mdi-upload"
                ></v-file-input>
                <v-btn type="submit" color="primary">Upload</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-snackbar v-model="snackbar" vertical>
        <div class="text-subtitle-1 pb-2">Success</div>
        <p>Data was saved ...</p>
        <template v-slot:actions>
          <v-btn
            v-if="working"
            color="indigo"
            variant="text"
            @click="snackbar = false"
          >
            <v-progress-circular
              color="primary"
              indeterminate
            ></v-progress-circular>
          </v-btn>
          <v-btn v-else color="indigo" variant="text" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-responsive>
  </v-container>
</template>
