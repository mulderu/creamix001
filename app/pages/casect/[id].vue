<script setup>
import {Niivue} from '@niivue/niivue'
const nv = new Niivue({ isResizeCanvas: true, isColorbar: true })
const config = useRuntimeConfig();
const route = useRoute()
const patientStore = usePatientStore()
const caseStore = useCaseStore()

const vtItems = ['Axial', 'Coronal', 'Sagittal', 'Multi', 'Volume']
const vtModel = shallowRef(3)

const vgItems = [0.5, 0.75, 1.0, 1.25, 1.5]
const vGammar = shallowRef(1.0)

const onGammarChg = () => {
  console.log('vGammar:', vGammar.value)
  nv.setGamma(vGammar.value); 
}

const vcolorItems = nv.colormaps();
const vColormap = shallowRef('gray')
console.log(vcolorItems);
const onColormapChg = () => {
  console.log('vColormap:', vColormap.value)
  nv.setColormap(nv.volumes[0].id, vColormap.value);
}

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
      , opacity: 1
      , colormap: 'gray'
      , visible: true
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



    


    <v-card class="pa-md-12 d-flex justify-space-between">
      <v-card class="">
        <v-card-text>
          <v-select
              label="Select Gammar"
              v-model="vGammar"
              :items="vgItems"
              @update:modelValue="onGammarChg"
            ></v-select>
        </v-card-text>
      </v-card>

      <v-card class="">
        <v-card-text>
          <v-select
              label="Select Colormap"
              v-model="vColormap"
              :items="vcolorItems"
              @update:modelValue="onColormapChg"
            ></v-select>
        </v-card-text>
      </v-card>

      <v-card class="text-center">
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


