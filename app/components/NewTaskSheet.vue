<script setup lang="ts">
import { Strapi } from "/stores/sysclz";

const config = useRuntimeConfig();
const strapi = new Strapi(config.public.apiBase, $fetch);

const overlay = ref(strapi.loading)

const firstName = ref("");
const lastName = ref("");
const address = ref("");
const state = ref("Seoul");
const stateList = ["Seoul", "경기", "충남", "제주", "기타"];
const zipcode = ref("");

const saveAddress = async () => {
  const data = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    state: state.value,
    zipcode: zipcode.value,
  };

  console.log(data);

  const posted = await strapi.postItems('addresses', { data });
  console.log('posted:', posted)
};
</script>


<template>
  <v-container class="pa-md-2">
    <v-container>
      <v-overlay
        v-model="overlay"
        class="align-center justify-center"
        contained
      >
        <v-btn color="success" @click="overlay = false"> Hide Overlay </v-btn>
      </v-overlay>

      <v-row justify="center">
        <v-col cols="12" md="4">
          <v-text-field
            class="mx-auto"
            clearable
            color="primary"
            density="comfortable"
            hide-details="auto"
            v-model="firstName"
            label="First name"
            persistent-clear
            variant="underlined"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            class="mx-auto"
            clearable
            color="primary"
            density="comfortable"
            hide-details="auto"
            v-model="lastName"
            label="Last name"
            persistent-clear
            variant="underlined"
          />
        </v-col>

        <v-col cols="12" md="8">
          <v-text-field
            class="mx-auto"
            clearable
            color="primary"
            density="comfortable"
            hide-details="auto"
            v-model="address"
            label="Address"
            persistent-clear
            variant="underlined"
          />
        </v-col>

        <v-col cols="12" md="8">
          <v-row>
            <v-col cols="6">
              <v-select
                class="mx-auto"
                clearable
                color="primary"
                density="comfortable"
                hide-details="auto"
                v-model="state"
                :items="stateList"
                label="State"
                persistent-clear
                variant="underlined"
              />
            </v-col>

            <v-col cols="6">
              <v-text-field
                class="mx-auto"
                clearable
                color="primary"
                density="comfortable"
                hide-details="auto"
                v-model="zipcode"
                label="Zipcode"
                persistent-clear
                variant="underlined"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <div class="d-flex ga-3 pt-3">
      <v-btn
        border
        class="flex-grow-1 text-none"
        color="primary"
        rounded="pill"
        size="large"
        text="Save"
        @click="saveAddress"
        variant="flat"
      />
    </div>
  </v-container>
</template>
