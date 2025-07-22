<script lang="ts" setup>

definePageMeta({
  layout: 'login'
})
</script>

<template>
  <v-layout>
    <v-main min-height="800">
      <v-container class="h-100 pa-0" fluid>
        <v-row align="center" class="h-100" justify="center">
          <v-responsive class="flex-1-1 px-4" max-width="475">
            <v-img class="mx-auto mb-4" max-width="60" src="https://vuetifyjs.b-cdn.net/docs/images/logos/v.svg" />

            <div class="text-h5 text-center mb-8 font-weight-medium">Register New account</div>

            <v-card class="pa-10 mb-8" elevation="3" rounded="lg">
              <v-label class="text-subtitle-2">Email address</v-label>

              <v-text-field color="primary" density="compact" rounded="lg" variant="outlined" persistent-placeholder
                placeholder="email@gmail.com" prepend-inner-icon="mdi-email" />

              <v-label class="text-subtitle-2">Password</v-label>

              <v-text-field color="primary" density="compact" rounded="lg" variant="outlined" />


              <v-row justify="center">
                <v-col cols="12" md="6">
                  <v-text-field class="mx-auto" clearable color="primary" density="comfortable" hide-details="auto"
                    label="First name" persistent-clear variant="underlined" />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field class="mx-auto" clearable color="primary" density="comfortable" hide-details="auto"
                    label="Last name" persistent-clear variant="underlined" />
                </v-col>

                <v-col cols="12" md="12">
                  <v-text-field class="mx-auto" clearable color="primary" density="comfortable" hide-details="auto"
                    label="Address" persistent-clear variant="underlined" />
                </v-col>

                <v-col cols="12" md="12">
                  <v-row>
                    <v-col cols="6">
                      <v-select class="mx-auto" clearable color="primary" density="comfortable" hide-details="auto"
                        :items="['Florida', 'New York', 'California']" label="State" persistent-clear
                        variant="underlined" />
                    </v-col>

                    <v-col cols="6">
                      <v-text-field class="mx-auto" clearable color="primary" density="comfortable" hide-details="auto"
                        label="Zipcode" persistent-clear variant="underlined" />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>


            </v-card>

          </v-responsive>
        </v-row>
      </v-container>
    </v-main>
  </v-layout>
</template>
