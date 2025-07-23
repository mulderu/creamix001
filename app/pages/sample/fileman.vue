<script setup>
import { useTheme } from "vuetify";

const theme = useTheme();

const items = [
  {
    title: "Developer backpack",
    subtitle: "Black\nLeather",
    price: "$290.00",
    quantity: 1,
  },
  {
    title: "Designer backpack",
    subtitle: "Brown\nLeather",
    price: "$390.00",
    quantity: 1,
  },
];

definePageMeta({
  layout: "dash",
  middleware: "auth",
});
</script>

<template>
  <v-container
    class="pa-md-12"
    :class="theme.current.value.dark ? 'bg-grey-darken-5' : 'bg-grey-lighten-5'"
    fluid
  >
    <v-row justify="center">
      <v-col cols="12" md="5">
        <div class="text-h6 mb-4">Order summary</div>

        <v-card border flat rounded="lg">
          <template #text>
            <template v-for="(item, i) in items" :key="i">
              <v-divider v-if="i !== 0" class="my-4 mx-n4" />

              <v-list-item class="px-0">
                <template #prepend>
                  <v-img
                    class="me-2"
                    color="surface-light"
                    height="100"
                    min-width="72"
                    rounded
                  />
                </template>

                <template #title>
                  <div class="d-flex align-center justify-space-between">
                    <strong>{{ item.title }}</strong>

                    <v-btn
                      color="surface-variant"
                      density="compact"
                      icon="mdi-trash-can"
                      :ripple="false"
                      size="small"
                      variant="text"
                    />
                  </div>
                </template>

                <template #subtitle>
                  <div>
                    {{ item.subtitle }}
                  </div>
                </template>

                <div class="d-flex align-end justify-space-between">
                  <strong class="text-subtitle-1">{{ item.price }}</strong>

                  <v-select
                    color="primary"
                    density="compact"
                    hide-details
                    item-color="surface-variant"
                    :items="[1, 2, 3, 4, 5, 6, 7, 8]"
                    :list-props="{
                      density: 'compact',
                      nav: true,
                      lines: false,
                    }"
                    max-width="72"
                    :model-value="item.quantity"
                    variant="outlined"
                  />
                </div>
              </v-list-item>
            </template>

            <v-divider class="my-4 mx-n4" />

            <v-list-item class="px-0">
              <template #title>
                <div class="d-flex align-center justify-space-between">
                  <span>Subtotal</span>

                  <strong>$680.00</strong>
                </div>
              </template>
            </v-list-item>

            <v-list-item class="px-0">
              <template #title>
                <div class="d-flex align-center justify-space-between">
                  <span>Shipping</span>

                  <strong>$10.00</strong>
                </div>
              </template>
            </v-list-item>

            <v-list-item class="px-0">
              <template #title>
                <div class="d-flex align-center justify-space-between">
                  <span>Taxes</span>

                  <strong>$68.00</strong>
                </div>
              </template>
            </v-list-item>

            <v-divider class="my-2" />

            <v-list-item class="px-0">
              <template #title>
                <div class="d-flex align-center justify-space-between text-h6">
                  <span>Total</span>

                  <strong>$758.00</strong>
                </div>
              </template>
            </v-list-item>
          </template>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <div class="text-h6 mb-4">Contact information</div>

        <v-text-field
          bg-color="surface"
          color="primary"
          density="compact"
          label="Email address"
          persistent-placeholder
          variant="outlined"
        />

        <v-checkbox-btn
          color="primary"
          density="comfortable"
          label="Sign me up for your newsletter."
        />

        <v-divider class="my-6" />

        <div class="text-h6 mb-4">Shipping information</div>

        <div class="d-flex ga-4">
          <v-text-field
            bg-color="surface"
            color="primary"
            density="compact"
            label="First name"
            persistent-placeholder
            variant="outlined"
          />

          <v-text-field
            bg-color="surface"
            color="primary"
            density="compact"
            label="Last name"
            persistent-placeholder
            variant="outlined"
          />
        </div>

        <v-text-field
          bg-color="surface"
          color="primary"
          density="compact"
          label="Address"
          persistent-placeholder
          variant="outlined"
        />

        <div class="d-flex ga-4">
          <v-text-field
            bg-color="surface"
            color="primary"
            density="compact"
            label="City"
            persistent-placeholder
            variant="outlined"
          />

          <v-text-field
            bg-color="surface"
            color="primary"
            density="compact"
            label="State"
            persistent-placeholder
            variant="outlined"
          />
        </div>

        <div class="d-flex ga-4">
          <v-text-field
            bg-color="surface"
            class="flex-1-0-0"
            color="primary"
            density="compact"
            label="ZIP code"
            persistent-placeholder
            variant="outlined"
          />

          <v-select
            bg-color="surface"
            class="flex-1-0-0"
            color="primary"
            density="compact"
            :items="['United States', 'Canada', 'Mexico']"
            label="Country"
            persistent-placeholder
            variant="outlined"
          />
        </div>

        <v-divider class="my-6" />

        <div class="text-h6 mb-4">Delivery method</div>

        <v-item-group mandatory="force">
          <v-row class="mb-4">
            <v-col cols="12" md="6">
              <v-item value="standard">
                <template #default="{ isSelected, toggle }">
                  <v-list-item
                    :border="`md ${isSelected ? 'primary opacity-100' : ''}`"
                    class="bg-surface"
                    lines="three"
                    prepend-icon="mdi-truck-outline"
                    :ripple="false"
                    rounded="lg"
                    slim
                    subtitle="6-10 business days"
                    title="Standard"
                    variant="text"
                    @click="toggle"
                  >
                    <div class="mt-4 text-body-2">
                      <strong>$5.00</strong>
                    </div>

                    <v-avatar
                      v-if="isSelected"
                      class="position-absolute right-0 top-0 me-3 mt-4"
                      color="primary"
                      icon="mdi-check"
                      size="18"
                    >
                      <v-icon size="14" />
                    </v-avatar>
                  </v-list-item>
                </template>
              </v-item>
            </v-col>

            <v-col cols="12" md="6">
              <v-item value="express">
                <template #default="{ isSelected, toggle }">
                  <v-list-item
                    :border="`md ${isSelected ? 'primary opacity-100' : ''}`"
                    class="bg-surface"
                    lines="three"
                    prepend-icon="mdi-truck-fast-outline"
                    :ripple="false"
                    rounded="lg"
                    slim
                    subtitle="2-3 business days"
                    title="Express"
                    variant="outlined"
                    @click="toggle"
                  >
                    <div class="mt-4 text-body-2">
                      <strong>$15.00</strong>
                    </div>

                    <v-avatar
                      v-if="isSelected"
                      class="position-absolute right-0 top-0 me-3 mt-4"
                      color="primary"
                      icon="mdi-check"
                      size="18"
                    >
                      <v-icon size="14" />
                    </v-avatar>
                  </v-list-item>
                </template>
              </v-item>
            </v-col>
          </v-row>
        </v-item-group>

        <v-divider class="my-6" />

        <div class="text-h6 mb-4">Payment information</div>

        <v-text-field
          bg-color="surface"
          color="primary"
          density="compact"
          label="Cardholder name"
          persistent-placeholder
          variant="outlined"
        />

        <v-text-field
          bg-color="surface"
          color="primary"
          density="compact"
          label="Card number"
          persistent-placeholder
          variant="outlined"
        />

        <div class="d-flex ga-4">
          <v-text-field
            bg-color="surface"
            color="primary"
            density="compact"
            label="Expiration date"
            persistent-placeholder
            variant="outlined"
          />

          <v-text-field
            bg-color="surface"
            color="primary"
            density="compact"
            label="CVV"
            max-width="100"
            persistent-placeholder
            variant="outlined"
          />
        </div>

        <v-btn
          block
          class="text-none"
          color="primary"
          height="48"
          prepend-icon="mdi-lock"
          rounded="lg"
          text="Place order"
          variant="flat"
        />
      </v-col>
    </v-row>
  </v-container>
</template>