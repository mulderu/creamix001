<script lang="ts" setup>
definePageMeta({
  layout: 'dash'
})
//

const route = useRoute()

// When accessing /posts/1, route.params.id will be 1
console.log(route.params.id)
</script>

<template>
  <div>
    <p>params</p>
    <p>{{ route.params }}</p>
  </div>
</template>