<script lang="ts" setup>
import { User } from "../stores/sysclz";

const router = useRouter()
const config = useRuntimeConfig();
const user = new User(config.public.apiBase, $fetch)

user.logout()
router.push("/login")
</script>

<template>
  <div>
    <h1> move to login !</h1>
  </div>
</template>
