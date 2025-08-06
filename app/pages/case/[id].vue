<script setup>
import {Niivue} from '@niivue/niivue'
const nv = new Niivue({ isResizeCanvas: true })
const config = useRuntimeConfig();
const route = useRoute()
const caseStore = useCaseStore()

const vtItems = ['Axial', 'Coronal', 'Sagittal', 'Multi', 'Volume']
const vtModel = shallowRef(3)


const refreshCaseData = async() => {
  await caseStore.fetchCase(route.query.case)
} 

const uploadResource = (url) => config.public.uploadServer + url

onMounted(async () => {
  await refreshCaseData();
  await nv.attachTo('gl')
  await nv.loadVolumes([
    { 
      url: uploadResource(caseStore.acase.nii)
      , name: "helo.nii.gz"
    }
  ])
});

watch(() => route.fullPath, async () => {
  await refreshCaseData();
});

watch(vtModel, (newValue, oldValue) => {
  console.log('vtModel:', newValue, oldValue)
  const info = [
    nv.sliceTypeAxial,
    nv.sliceTypeCoronal,
    nv.sliceTypeSagittal,
    nv.sliceTypeMultiplanar,
    nv.sliceTypeRender,
  ]
  nv.setSliceType(info[newValue])
})



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
      <div class="d-flex h-30" v-for="x in Object.keys(caseStore.acase).filter(d => d !== 'instances' && d !== 'dcms')" :key="x">
        <div class="bg-red">{{ x }}:</div>
        <div class="bg-yellow">{{ caseStore.acase[x] }}</div>
      </div>
    </p>

    <v-card class="pa-md-12" fluid>
      <v-item-group v-model="vtModel" class="d-flex ga-2 justify-center">
        <v-item v-for="text in vtItems" :key="text">
          <template #default="{ isSelected, toggle }">
            <v-btn
              :active="isSelected"
              border="primary md opacity-100"
              class="text-none"
              color="primary"
              :ripple="{ center: true }"
              :variant="isSelected ? 'flat' : 'text'"
              width="114"
              @click="toggle"
            >
              <span class="text-white">{{ text }}</span>
            </v-btn>
          </template>
        </v-item>
      </v-item-group>
    </v-card>



    <!--
    <p class="h-50" v-if="caseStore.acase">{{ caseStore.acase }}</p>
    -->
    <div>
      <canvas id="gl" height="800" width="1024">
      </canvas>
    </div>

  </v-container>
</template>


