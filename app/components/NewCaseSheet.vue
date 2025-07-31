<script setup>
import { VFileUpload, VFileUploadItem } from 'vuetify/labs/VFileUpload'
const { fetchWithAuth, uploadFiles } = useStrapiApi();
const caseStore = useCaseStore();
const { user } = useAuth();

const config = useRuntimeConfig();

const files = ref(null)

const emit = defineEmits(['uploaded'])

const uploadFile = async () => {
  console.log(files.value)
  const dcmFiles = files.value.filter(d => d.name.toLowerCase().indexOf('.dcm')>-1)
  if (dcmFiles.length == 0) return []
  return await uploadFiles(dcmFiles);
};

const startUploadFile = async () => {
  const uploaded_dcm_files = await uploadFile();
  if (uploaded_dcm_files.length == 0) {
    alert('We need .dcm files')
    return
  }
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
  // await caseStore.fetch([], [], ['dcms'])
  console.log(r_api.data)
  await caseStore.fetchCase(r_api.data[0].documentId)
  console.log(caseStore.acase.patient)
  emit('uploaded')
  alert ('Success !')
  files.value = []
  useRouter().push(`/patient/${caseStore.acase.patient.documentId}`)

};

</script>


<template>
  <v-container class="pa-md-2">
    <v-btn :disabled="!files" block color="secondary" @click="startUploadFile" class="my-5">Upload</v-btn>
    <v-file-upload
      v-model="files"
      clearable
      multiple
      show-size
    >
      <template v-slot:item="{ props: itemProps }">
        <v-file-upload-item v-bind="itemProps" lines="one" nav>
          <template v-slot:prepend>
            <v-avatar size="32" rounded></v-avatar>
          </template>

          <template v-slot:clear="{ props: clearProps }">
            <v-btn color="primary" v-bind="clearProps"></v-btn>
          </template>
        </v-file-upload-item>
      </template>
    </v-file-upload>


  </v-container>
</template>
