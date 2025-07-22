<script lang="ts" setup>
definePageMeta({
  layout: 'dash'
})

const hDlgAlert = shallowRef(false)
const hDlgForm = shallowRef(false)
const hDlgDlg = shallowRef(false)
//
</script>

<template>
  <div>
    <p>link</p>
    <NuxtLink :to="{ name: 'users-id', params: { id: 123 } }">
      User 123
    </NuxtLink>
    <v-card>
      <v-card-title>
        Dialog
      </v-card-title>
      <v-card-content>
        <v-container class="pa-6 pa-md-12">
          <v-row align="center" class="ga-6 ga-md-16" justify="center">
            <v-btn class="text-none" color="primary" prepend-icon="$vuetify" size="small" text="alert" variant="flat"
              @click="hDlgAlert = true" />

            <v-btn class="text-none" color="warning" prepend-icon="$vuetify" text="form" variant="flat"
              @click="hDlgForm = true" />

            <v-btn class="text-none" color="success" prepend-icon="$vuetify" size="large" text="dlg" variant="flat"
              @click="hDlgDlg = true" />
          </v-row>
        </v-container>

      </v-card-content>
    </v-card>

    <v-container class="pa-md-12">
      <v-card class="mx-auto" elevation="6" max-width="700" rounded="lg">
        <v-card-title>
          Card title
        </v-card-title>

        <v-divider class="mb-2" />

        <v-card-text>
          <v-sheet border="md dashed" height="368" rounded="lg" />
        </v-card-text>

        <v-divider class="mt-2" />

        <v-card-actions>
          <v-spacer />

          <v-btn class="text-none" text="Cancel" />
          <v-btn class="text-none" color="primary" text="Accept" />
        </v-card-actions>
      </v-card>
    </v-container>

    <div>

      <v-dialog v-model="hDlgAlert" contained max-width="500">
        <v-card rounded="lg">
          <v-list class="py-6" :lines="false">
            <v-list-item>
              <template #prepend>
                <v-avatar class="mt-n14" color="success" icon="mdi-account-plus-outline" variant="tonal" />
              </template>

              <template #title>
                <strong class="mb-2 d-inline-block">
                  Activate account
                </strong>
              </template>

              <div class="text-body-2 text-medium-emphasis">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore
                voluptatibus! Eaque
                cupiditate minima!
              </div>
            </v-list-item>
          </v-list>

          <v-divider />

          <v-card-actions class="bg-surface-light">
            <v-spacer />

            <v-btn border class="text-none" color="surface" text="Cancel" variant="flat" @click="hDlgAlert = false" />

            <v-btn class="text-none" color="success" text="Activate" variant="flat" />
          </v-card-actions>
        </v-card>
      </v-dialog>


      <v-dialog v-model="hDlgForm" contained max-width="450">
        <v-card rounded="lg" subtitle="Make changes to your profile here." title="Edit profile">
          <template #text>
            <v-text-field density="compact" label="Name" variant="outlined" />
            <v-text-field density="compact" label="Email" variant="outlined" />
          </template>

          <v-divider />

          <template #actions>
            <v-spacer />

            <v-btn class="text-none" color="surface-variant" text="Save changes" variant="flat"
              @click="hDlgForm = false" />
          </template>
        </v-card>
      </v-dialog>

      <v-dialog v-model="hDlgDlg" contained max-width="500">
        <v-card rounded="lg">
          <template #text>
            <div class="text-center pt-4">
              <v-avatar class="mb-4" color="success" icon="mdi-check" size="x-large" variant="tonal" />

              <div class="font-weight-bold mb-2">
                Purchase complete
              </div>

              <div class="text-body-2 text-medium-emphasis mb-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore!
              </div>

              <div class="d-flex ga-4">
                <v-btn border class="text-none flex-1-1-100" color="surface" text="Home" variant="flat"
                  @click="hDlgDlg = false" />

                <v-btn class="text-none flex-1-1-100" color="primary" text="Manage Team" variant="flat"
                  @click="hDlgDlg = false" />
              </div>
            </div>
          </template>
        </v-card>
      </v-dialog>

    </div>

  </div>
</template>