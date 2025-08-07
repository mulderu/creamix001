<script setup>
const config = useRuntimeConfig();
const route = useRoute()
const patientStore = usePatientStore()
const caseStore = useCaseStore()

const refreshCaseData = async() => {
  await caseStore.fetchCase(route.query.case)
} 

const uploadResource = (url) => config.public.uploadServer + url

onMounted(async () => {
  await refreshCaseData();
});

watch(() => route.fullPath, async () => {
  await refreshCaseData();
});


const onAnnoStart = (pos) => {
  console.log('Start at:', pos)
}
const onAnnoEnd = (pos) => {
  console.log('End at:', pos)
}


definePageMeta({
  layout: 'default'
})
//


</script>

<template>
  <v-container class="pa-md-12 bg-surface-light" fluid>
    <p>patientId: {{ route.params.id }}</p>
    <p>caseId: {{ route.query.case }}</p>
    <p class="d-flex" v-if="caseStore.acase">
      <v-row>
        <v-col>Date:</v-col>
        <v-col>{{ caseStore.acase.SeriesDate }}</v-col>
        <v-col>Name:</v-col>
        <v-col>{{ patientStore.decodePName(caseStore.acase.PatientName) }}</v-col>
        <v-col>PatientSex:</v-col>
        <v-col>{{ caseStore.acase.PatientSex }}</v-col>
        <v-col>PatientBirthDate:</v-col>
        <v-col>{{ caseStore.acase.PatientBirthDate }}</v-col>
      </v-row>
    </p>
    <v-card class="d-flex" v-if="caseStore.acase">
      <v-card-text>
        <LineDrawer
          :imageSrc="config.public.uploadServer + caseStore.acase.thumb"
          :lineColor="'yellow'"
          :lineWidth="5"
          @drawing_start="onAnnoStart"
          @drawing_end="onAnnoEnd"
        />
      </v-card-text>
    </v-card>


  </v-container>
</template>


