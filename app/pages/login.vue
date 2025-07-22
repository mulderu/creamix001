<script lang="ts" setup>

const router = useRouter()
const svc = { userStore: null }
const email = ref('')
const password = ref('')

onMounted(() => {
  svc.userStore = useUserStore()

})

const handleLogin = async () => {
  await svc.userStore.user.login(email.value, password.value)
  if (svc.userStore.user.error) {
    alert('Login Fail !')
  } else {
    console.log(svc.userStore.user.user)
    alert('Success')
    await svc.userStore.user.getProfile()
    console.log(svc.userStore.user.user)

    router.push("/dash")
  }
}


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

            <div class="text-h5 text-center mb-8 font-weight-medium">Log into your account</div>

            <v-card class="pa-10 mb-8" elevation="3" rounded="lg">
              <v-label class="text-subtitle-2">Email address</v-label>

              <v-text-field v-model="email" color="primary" density="compact" rounded="lg" variant="outlined" />

              <v-label class="text-subtitle-2">Password</v-label>

              <v-text-field v-model="password" type="password" color="primary" density="compact" rounded="lg"
                variant="outlined" />

              <div class="mb-4">
                <div class="d-flex justify-space-between align-center">
                  <v-checkbox-btn class="ms-n3" color="primary" label="Remember me">
                    <template #label>
                      <span class="text-body-2">Remember me</span>
                    </template>
                  </v-checkbox-btn>

                  <a class="text-decoration-none text-primary text-body-2 font-weight-medium" href="#">
                    Forgot password?
                  </a>
                </div>
              </div>

              <v-btn block @click="handleLogin" class="text-none" color="primary" flat rounded="lg" text="Log In" />

              <v-divider class="my-12">
                <!-- remove in v3.6.7 -->
                <div class="text-no-wrap text-body-2">
                  Or continue with
                </div>
              </v-divider>

              <div class="d-flex ga-4">
                <v-btn class="text-none flex-grow-1" color="error" flat prepend-icon="mdi-google" rounded="lg"
                  text="Google" variant="outlined" />

                <v-btn class="text-none flex-grow-1" color="blue" flat prepend-icon="mdi-facebook" rounded="lg"
                  text="Facebook" variant="outlined" />
              </div>
            </v-card>

            <div class="text-center text-body-2">
              Don't have an account? <a class="text-decoration-none text-primary font-weight-medium"
                href="/register">Sign up</a>
            </div>
          </v-responsive>
        </v-row>
      </v-container>
    </v-main>
  </v-layout>
</template>
