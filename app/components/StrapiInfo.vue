<template>
  <v-container>
    <h1 class="text-h4 mb-4">Strapi Info List</h1>
    <v-card>
      <v-card-text>
        {{ test_str }}
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Strapi } from "/stores/sysclz";

const config = useRuntimeConfig();
console.log(config.public.apiBase); // accessible on client + server
console.log(config.public.admToken);

const test_str = ref(null)

const strapi = new Strapi(config.public.apiBase, $fetch)

onMounted(async () => {
  const data = await strapi.getItems('mulders')

  console.log(data)

  test_str.value = data
})


</script>