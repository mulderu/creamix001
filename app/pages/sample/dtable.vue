<script setup>
const config = useRuntimeConfig();
const strapi = new Strapi(config.public.apiBase, $fetch)
const tableData = ref([])

const headers = [
  { title: "First", key: "firstName" },
  { title: "Last", key: "lastName" },
  { title: "Address", key: "address" },
  { title: "State", key: "state" },
  { title: "Zip", key: "zipcode" },
  { title: "", value: "actions" },
];

onMounted(async () => {
  const items = await strapi.getItems('addresses')

  console.log(items)
  tableData.value = items.data.map(d => ({...d, done: true, status: 'Call'}))
})


const statusConfig = {
  Seoul: { color: "teal-accent-4", icon: "mdi-phone-outline" },
  Call: { color: "teal-accent-4", icon: "mdi-phone-outline" },
  Meeting: { color: "green-accent-4", icon: "mdi-account-group-outline" },
  Deadline: { color: "purple-accent-3", icon: "mdi-calendar-outline" },
  Lunch: { color: "pink-accent-3", icon: "mdi-projector-screen-outline" },
  Task: { color: "orange-accent-4", icon: "mdi-shopping-outline" },
  Email: { color: "blue-grey-darken-2", icon: "mdi-email-outline" },
};

function getStatusColor(status) {
  return statusConfig[status]?.color || null;
}

function getStatusIcon(status) {
  return statusConfig[status]?.icon || null;
}

definePageMeta({
  layout: "dash",
});
</script>

<template>
  <v-container class="pa-md-12">
    <v-data-table
      class="border"
      :headers="headers"
      hide-default-footer
      item-value="person"
      :items="tableData"
      show-select
    >
      <template #item.state="{ item }">
        <v-chip
          :color="getStatusColor(item.status)"
          label
          :prepend-icon="getStatusIcon(item.status)"
          size="small"
          :text="item.state"
        />
      </template>

      <template #item.done="{ item }">
        <v-checkbox-btn v-model="item.done" class="d-flex" />
      </template>

      <template #item.actions>
        <v-btn
          color="medium-emphasis"
          density="comfortable"
          icon="mdi-dots-vertical"
          size="small"
          variant="text"
        >
          <v-icon />

          <v-menu activator="parent" location="bottom start">
            <v-list density="compact" nav slim>
              <v-list-item link prepend-icon="mdi-pencil" title="Edit" />

              <v-list-item link prepend-icon="mdi-delete" title="Delete" />
            </v-list>
          </v-menu>
        </v-btn>
      </template>
    </v-data-table>

    <div class="py-4" />

    <div class="text-center">
    <v-pagination
      active-color="primary"
      class="border d-inline-block rounded-lg mx-auto"
      density="comfortable"
      length="10"
      rounded="lg"
      show-first-last-page
      total-visible="5"
    />


    </div>
  </v-container>
</template>