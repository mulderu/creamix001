<script lang="ts" setup>
definePageMeta({
  layout: 'dash',
  middleware: 'auth',
})
//
</script>

<template>
  <div>
    <div><h1>cases</h1></div>
    <div>
      <dicom-upload-main />
    </div>
  </div>
</template>
