<script setup>
  import { useTheme } from 'vuetify'
const website = useWebsiteStore()

await callOnce(website.fetch)

  const theme = useTheme()

  const items = [
    {
      title: '239',
      subtitle: 'Total users',
      icon: 'mdi-account-group-outline',
      value: 5.4,
    },
    {
      title: '1,431',
      subtitle: 'Bins',
      icon: 'mdi-trash-can-outline',
      value: -2.4,
    },
    {
      title: '10,412',
      subtitle: 'Playgrounds',
      icon: 'mdi-slide',
      value: 3.4,
    },
  ]

  const scnd_items = [
    {
      title: 'Revenue',
      subtitle: 'Sales goal',
      task: 'Completed',
      icon: 'mdi-cash-multiple',
      completed: 12,
      total: 12,
      color: 'primary',
    },
    {
      title: 'Orders',
      subtitle: 'Total orders',
      task: 'Pending shipment',
      icon: 'mdi-cart-outline',
      completed: 4,
      total: 20,
      color: 'purple',
    },
    {
      title: 'Products',
      subtitle: 'Total new',
      task: 'Reviewed',
      icon: 'mdi-package-variant',
      completed: 5,
      total: 12,
      color: 'brown',
    },
  ]
  const cards = [
    {
      title: 'Tasks Completed',
      subtitle: '22/35',
      icon: 'mdi-star-outline',
      color: '#3554d1',
      data: [5, 2, 5, 9, 5, 10, 3, 5],
      action: 'completed',
      more: '28%',
    },
    {
      title: 'New Address',
      icon: 'mdi-note-text-outline',
      subtitle: '5/20',
      color: '#da5656',
      data: [5, 2, 5, 9, 5, 10, 3, 5],
      action: 'tasks',
      more: '31%',
    },
    {
      title: 'Completed Projects',
      icon: 'mdi-projector-screen-outline',
      subtitle: '20/30',
      color: '#2fc584',
      data: [3, 5, 3, 7, 1, 8, 2, 9, 6],
      action: 'projects',
      more: '42%',
    },
  ]

</script>



<template>
  <v-container class="fill-height">
    <v-responsive class="align-centerfill-height mx-auto" max-width="900">
      <div>
        <h1>{{ website.name }}</h1>
        <p>{{ website.description }}</p>
      </div>

      <div class="py-4" />

    <v-row>
      <v-col
        v-for="(item, i) in items"
        :key="i"
        cols="12"
        md="4"
      >
        <v-card rounded="lg">
          <v-card-item class="py-4 ps-6" height="64" :subtitle="item.subtitle" :title="item.title">
            <template #prepend>
              <v-avatar
                color="primary"
                :icon="item.icon"
                rounded
                size="48"
                start
              />
            </template>

            <template #title>
              <div class="d-flex">
                <div class="me-1">{{ item.title }}</div>

                <div
                  class="d-flex align-center text-caption"
                  :class="[item.value > 0 ? 'text-success' : 'text-error']"
                >
                  <v-icon :icon="item.value > 0 ? 'mdi-arrow-up' : 'mdi-arrow-down'" />

                  <span>{{ item.value > 0 ? item.value : item.value * -1 }}%</span>
                </div>
              </div>
            </template>
          </v-card-item>

          <v-card-actions
            :class="{
              'bg-black': theme.current.value.dark,
              'bg-grey-lighten-5': !theme.current.value.dark,
            }"
          >
            <v-spacer />

            <v-btn class="text-none" color="primary" text="View all" />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- second -->
    <v-row>
      <v-col
        v-for="(item, i) in scnd_items"
        :key="i"
        cols="12"
        md="4"
      >
        <v-card :subtitle="item.subtitle" :title="item.title">
          <template #prepend>
            <v-avatar
              class="mt-n14"
              :color="item.color"
              :icon="item.icon"
              rounded
              size="48"
              start
              variant="tonal"
            />
          </template>

          <template #item>
            <div class="d-flex align-center justify-space-between mt-4 mb-1">
              <div class="text-body-2">{{ item.task }}</div>

              <div class="text-subtitle-2">{{ item.completed }}/{{ item.total }}</div>
            </div>

            <div class="d-flex ga-2 mb-2">
              <v-progress-linear
                v-for="n in 5"
                :key="n"
                :color="item.color"
                height="6"
                :model-value="item.completed >= (n * item.total / 5) ? 100 : 0"
                rounded
              />
            </div>
          </template>
        </v-card>
      </v-col>
    </v-row>

    <v-container class="pa-md-12 bg-surface-light" fluid>
    <v-row dense>
      <v-col v-for="(card, i) in cards" :key="i" cols="12" md="4">
        <v-card rounded="lg" variant="flat">
          <v-list-item height="88" lines="two" :subtitle="`${card.subtitle} ${card.action}`" :title="card.title">
            <template #prepend>
              <v-avatar class="border" :icon="card.icon">
                <v-icon color="medium-emphasis" size="small" />
              </v-avatar>
            </template>

            <template #append>
              <span class="text-h5 font-weight-bold">{{ card.subtitle }}</span>
            </template>
          </v-list-item>

          <v-divider />

          <div class="d-flex ga-6 pa-4 align-center">
            <v-sparkline
              :color="card.color"
              fill
              :gradient="[`${card.color}E6`, `${card.color}33`, `${card.color}00`]"
              height="100"
              line-width="1"
              min="0"
              :model-value="card.data"
              padding="0"
              smooth
            />

            <div class="text-end text-caption flex-1-0">
              <v-card :color="card.color" variant="text">
                <strong>{{ card.more }} more</strong>
              </v-card>

              <div>from last week</div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

    </v-responsive>
  </v-container>
</template>
