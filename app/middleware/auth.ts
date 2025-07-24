import { User } from "../stores/sysclz";
// function isAuthenticated(): boolean { return true }
// ---cut---
export default defineNuxtRouteMiddleware(async (to, from) => {
  const config = useRuntimeConfig();
  const user = new User(config.public.apiBase, $fetch)
  
  // isAuthenticated() is an example method verifying if a user is authenticated
  if (await user.isAuthenticated() === false) {
    return navigateTo('/login')
  }
})
