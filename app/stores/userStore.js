import { defineStore } from "pinia";
import { ref } from "vue";
import { User } from "./sysclz";

export const useUserStore = defineStore("user", () => {
  const config = useRuntimeConfig();
  // sate
  const user = new User(config.public.apiBase, $fetch)

  return {
    user,
  }
});
