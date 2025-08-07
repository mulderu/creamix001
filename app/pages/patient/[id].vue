<script setup>
const config = useRuntimeConfig();
const route = useRoute()
const patientStore = usePatientStore()

const refreshPatientData = async() => {
  await patientStore.fetchPatient(route.params.id)
} 

onMounted(async () => {
  await refreshPatientData();
});

watch(() => route.fullPath, async () => {
  await refreshPatientData();
});

const formatDate00 = d => d.length === 8 ? [d.substring(0,4), d.substring(4,6), d.substring(6)].join('/') : d


definePageMeta({
  layout: 'dash'
})
//


</script>

<template>
  <v-container class="pa-md-12 bg-surface-light" fluid>
    <v-row v-if="patientStore.patient">
      <v-col
        v-for="(item, i) in patientStore.patient.cases"
        :key="i"
        cols="12"
        md="4"
        sm="6"
      >
        <v-card :ripple="false" rounded="lg">
          <v-card-item class="py-4">
            <div class="d-flex align-center justify-space-between mb-4">
              <v-avatar :image="config.public.uploadServer + item.thumb" size="60" />
              <v-chip
                v-if="item.instances.length"
                color="info"
                size="small"
                :text="item.instances.length"
              />
            </div>

            <v-card-title class="flex-grow-1 text-subtitle-2 mb-1">
              <div class="d-flex align-center justify-space-between">
                <div>
                  <v-chip color="warning" class="p-4">
                    &nbsp; {{ item.Modality }} &nbsp;
                  </v-chip>
                </div>
                <div>
              {{ formatDate00(item.SeriesDate) }}
                  </div>
              </div>
            </v-card-title>

            <v-card-text class="pa-0 flex-grow-1 text-body-2 text-medium-emphasis">
              {{ item.SeriesDescription }}
            </v-card-text>
          </v-card-item>

          <v-divider />

          <v-btn-group class="w-100" divided>
            <v-btn
              class="flex-grow-1 text-none"
              flat
              prepend-icon="mdi-rocket-launch"
              text="Predict"
              tile
              target="_blank"
              :href="`/predict/${route.params.id}?case=${item.documentId}`"
            >
              <template #prepend>
                <v-icon color="medium-emphasis" />
              </template>
            </v-btn>

            <v-btn class="flex-grow-1 text-none" flat 
              text="Details" tile 
              target="_blank"
              :href="`/case${item.Modality.toLowerCase()}/${route.params.id}?case=${item.documentId}`"
              />
          </v-btn-group>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>