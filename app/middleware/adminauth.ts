function isAuthenticated(): boolean { return true }
// ---cut---
export default defineNuxtRouteMiddleware((to, from) => {
  console.log('pass admin auth.ts')
  // isAuthenticated() is an example method verifying if a user is authenticated
  if (isAuthenticated() === false) {
    return navigateTo('/login')
  }
})
