import { User } from "../stores/sysclz";

function isAuthenticated(): boolean { return true }
// ---cut---
export default defineNuxtRouteMiddleware(async (to, from) => {
  const config = useRuntimeConfig();
  const user = new User(config.public.apiBase, $fetch)

  //console.log('pass admin auth.ts')
  // isAuthenticated() is an example method verifying if a user is authenticated
  if (await user.isAdminUser() === false) {
    alert('This page is protected by admin authority !')
    return navigateTo('/')
  }
})
