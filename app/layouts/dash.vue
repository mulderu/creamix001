<script setup>
import NewTaskSheet from "~/components/NewTaskSheet.vue";

const drawer = shallowRef(true);
const end_drawer = shallowRef(false);
const tab = shallowRef("patient");
const searchPCode = shallowRef("");
const svc = { userStore: null };
const router = useRouter();

onMounted(async () => {
  svc.userStore = useUserStore();

  console.log(svc.userStore.user.user);
});

const favorites = [
  {
    icon: "mdi-view-dashboard-outline",
    title: "Data Table",
    link: "/sample/dtable",
  },
  {
    icon: "mdi-bookmark-outline",
    title: "Form",
    link: "/sample/form",
  },
  {
    icon: "mdi-message-outline",
    title: "Messages",
    badge: "3",
  },
  {
    icon: "mdi-account-group-outline",
    title: "Team",
  },
  {
    icon: "mdi-calendar-outline",
    title: "Calendar",
  },
];

const applications = [
  {
    icon: "mdi-folder-outline",
    title: "Projects",
  },
  {
    icon: "mdi-chart-line",
    title: "Performance",
  },
  {
    icon: "mdi-cog-outline",
    title: "Settings",
  },
];

const appendItems = [
  {
    icon: "mdi-clock-outline",
    value: "recent",
  },
  {
    icon: "mdi-account-circle",
    value: "profile",
  },
  {
    icon: "mdi-logout",
    value: "logout",
  },
];

const onSubItem = (item) => {
  console.log("click subitem:", item);
  if (item.value === "profile") {
    router.push("/sample/profile");
  } else if (item.value === "logout") {
    alert("logout");
    svc.userStore.user.logout();
    router.push("/login");
  } else if (item.value === "recenter") {
  }
};

const onAddTask = () => {
  end_drawer.value = true;
};

const onClickSearchPCode = () => {
  console.log("onClickSearchPCode:", searchPCode.value);
};
</script>

<template>
  <v-app>
    <v-main>
      <v-layout>
        <v-navigation-drawer v-model="drawer" width="280">
          <div class="d-flex align-center justify-center pt-4">
            <router-link to="/dash">
              <v-avatar
                class="me-3"
                image="http://192.168.1.80/logo/logo.png"
                size="56"
              />
            </router-link>
            <span class="text-h6 font-weight-medium">CREAM A.I.</span>
          </div>

          <v-divider class="my-4" />

          <div class="px-4">
            <v-btn-toggle
              v-model="tab"
              border
              class="w-100"
              color="primary"
              divided
              rounded="lg"
            >
              <v-btn
                class="w-50 text-none"
                prepend-icon="mdi-account"
                text="Patient"
                value="patient"
                variant="flat"
              />

              <v-btn
                class="w-50 text-none"
                prepend-icon="mdi-apps"
                text="Apps"
                value="apps"
                variant="flat"
              />
            </v-btn-toggle>
          </div>

          <div class="px-2">
            <v-window v-model="tab">
              <v-window-item value="patient">
                <v-list color="surface-variant" nav variant="text">
                  <v-list-item rounded="lg" class="mb-2" border>
                    <v-text-field
                      v-model="searchPCode"
                      :loading="loading"
                      append-inner-icon="mdi-magnify"
                      density="compact"
                      label="Search"
                      variant="solo"
                      hide-details
                      single-line
                      @keyup.enter="onClickSearchPCode"
                      @click:append-inner="onClickSearchPCode"
                    ></v-text-field>
                  </v-list-item>
                  <v-list-item
                    v-for="(item, i) in favorites"
                    :key="i"
                    border
                    class="mb-2"
                    :prepend-icon="item.icon"
                    rounded="lg"
                    :title="item.title"
                    :value="item.title"
                    :href="item.link"
                  >
                    <template v-if="item.badge" #append>
                      <v-badge
                        color="text-medium-emphasis"
                        :content="item.badge"
                        inline
                      />
                    </template>
                  </v-list-item>
                </v-list>
              </v-window-item>

              <v-window-item value="apps">
                <v-list nav variant="text">
                  <v-list-item
                    v-for="(item, i) in applications"
                    :key="i"
                    border
                    class="mb-2"
                    :prepend-icon="item.icon"
                    rounded="lg"
                    :title="item.title"
                    :value="item.title"
                  />
                </v-list>
              </v-window-item>
            </v-window>
          </div>

          <template #append>
            <div class="pa-2 d-flex justify-center ga-2">
              <v-btn
                v-for="(item, i) in appendItems"
                :key="i"
                color="medium-emphasis"
                :icon="item.icon"
                size="large"
                @click="onSubItem(item)"
                variant="text"
              />
            </div>
          </template>
        </v-navigation-drawer>

        <v-main>
          <div
            class="d-flex align-center justify-space-between pa-6 flex-wrap ga-4"
          >
            <div class="d-flex align-center mb-2 mb-sm-0 flex-1-0">
              <v-app-bar-nav-icon
                v-if="$vuetify.display.smAndDown"
                @click="drawer = !drawer"
              />

              <span class="text-h6">Welcome back, John!</span>

              <v-icon class="ms-2">mdi-hand-wave</v-icon>
            </div>

            <div class="d-flex align-center ga-4 flex-1-1 justify-end">
              <v-text-field
                bg-color="surface-light"
                color="white"
                density="compact"
                hide-details
                :max-width="$vuetify.display.mdAndUp ? 340 : undefined"
                placeholder="Search"
                prepend-inner-icon="mdi-magnify"
                rounded="lg"
                variant="outlined"
              >
                <template v-if="$vuetify.display.xs" #append-inner>
                  <v-btn
                    color="primary"
                    density="compact"
                    icon="mdi-plus"
                    variant="tonal"
                  />
                </template>

                <template v-else #append>
                  <v-btn
                    color="primary"
                    prepend-icon="mdi-plus"
                    rounded="lg"
                    slim
                    text="Add"
                    variant="flat"
                    @click="onAddTask"
                  />
                </template>
              </v-text-field>
            </div>
          </div>

          <div class="pa-4">
            <v-sheet
              border="md"
              class="mt-n4"
              color=""
              min-height="800"
              rounded="lg"
              width="100%"
            >
              <slot />
            </v-sheet>
          </div>
        </v-main>

        <v-navigation-drawer
          v-model="end_drawer"
          location="end"
          temporary
          :width="$vuetify.display.mdAndUp ? 420 : 280"
        >
          <v-card-item title="New Address">
            <template #append>
              <v-btn
                density="compact"
                icon="$close"
                variant="text"
                @click="end_drawer = false"
              />
            </template>
          </v-card-item>

          <div class="pa-4">
            <v-sheet border="dashed md" height="565" rounded="lg" width="100%">
              <NewTaskSheet />
            </v-sheet>
          </div>
        </v-navigation-drawer>
      </v-layout>
    </v-main>
  </v-app>
</template>
