<script setup>
  import { shallowRef } from 'vue'

  const model = shallowRef(1)

  const methods = [
    {
      title: 'Credit Card',
      subtitle: 'Secure and fast transactions',
      description: 'Use your credit card for quick and secure payments. Enjoy the convenience of instant transactions.',
      icon: 'mdi-credit-card-outline',
      iconColor: 'primary',
      color: 'primary-lighten-5',
    },
    {
      title: 'Cash',
      subtitle: 'Pay in cash upon arrival',
      description: 'Pay in cash upon arrival. Enjoy the simplicity of cash transactions without any fees.',
      icon: 'mdi-cash',
      iconColor: 'success',
      color: 'primary-lighten-5',
    },
    {
      title: 'Wire Transfer',
      subtitle: 'Direct bank transfers',
      description: 'Make payments directly from your bank account. Ideal for larger transactions.',
      icon: 'mdi-bank-outline',
      iconColor: 'success',
      color: 'success-lighten-5',
    },
    {
      title: 'BitCoin',
      subtitle: 'Pay with cryptocurrency',
      description: 'Use Bitcoin for secure and anonymous transactions. Embrace the future of payments.',
      icon: 'mdi-bitcoin',
      iconColor: 'warning',
      color: 'warning-lighten-5',
    },
  ]


  definePageMeta({
    layout: "dash",
    middleware: "auth",
  });

</script>

<template>
  <v-container class="pa-md-6" fluid>
    <div class="text-h6 font-weight-medium mb-2">Payment Methods</div>

    <div class="text-body-2 text-medium-emphasis mb-6">
      Choose your preferred payment method for a seamless experience.
    </div>

    <v-item-group v-model="model">
      <v-row>
        <v-col v-for="(method, i) in methods" :key="i" cols="12" sm="6">
          <v-item v-slot="{ isSelected, toggle }">
            <v-card
              class="h-100"
              :color="isSelected ? 'primary' : undefined"
              flat
              rounded="lg"
              variant="outlined"
              @click="toggle"
            >
              <v-card-text>
                <div class="d-flex flex-column">
                  <div class="d-flex align-center justify-space-between mb-4">
                    <div class="d-flex align-center ga-3">
                      <v-avatar
                        border
                        :color="isSelected ? 'primary' : undefined"
                        :icon="method.icon"
                        size="36"
                      >
                        <v-icon
                          :color="isSelected ? 'white' : method.iconColor"
                          size="20"
                        />
                      </v-avatar>

                      <div>
                        <div class="text-subtitle-1 font-weight-medium">{{ method.title }}</div>
                        <div class="text-body-2 text-medium-emphasis">{{ method.subtitle }}</div>
                      </div>
                    </div>

                    <div>
                      <v-radio
                        color="primary"
                        density="compact"
                        hide-details
                        :model-value="isSelected"
                        readonly
                      />
                    </div>
                  </div>

                  <div class="text-body-2 text-medium-emphasis">{{ method.description }}</div>
                </div>
              </v-card-text>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>
  </v-container>
</template>