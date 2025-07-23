<script setup>
  import { ref, shallowRef } from 'vue'

  const file = ref()
  const isFocused = shallowRef(false)
  const undo = shallowRef(false)
  const previous = shallowRef('')
  const isLoading = shallowRef(false)
  const message = shallowRef('')

  const actions = [
    {
      title: 'AI chat',
      icon: 'mdi-forum-outline',
      onClick: () => message.value = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      title: 'Link in bio',
      icon: 'mdi-link-variant',
      onClick: () => message.value = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      title: 'Stock analysis',
      icon: 'mdi-chart-timeline-variant',
      onClick: () => message.value = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
  ]

  async function onClickEnhance () {
    isLoading.value = true
    previous.value = message.value

    await new Promise(resolve => setTimeout(resolve, 2000))

    message.value = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!'

    undo.value = true
    isLoading.value = false
  }

  function onClickUndo () {
    message.value = previous.value
    undo.value = false
  }

  definePageMeta({
    layout: "dash",
    middleware: "auth",
  });
</script>

<template>
  <v-container class="pa-md-12 bg-surface-light" fluid>
    <h3 class="text-h5 font-weight-bold text-center mb-4">
      Hi John, what do you want to make?
    </h3>

    <v-hover>
      <template #default="{ props: hoverProps, isHovering }">
        <v-card
          v-bind="hoverProps"
          :border="`thin ${isHovering || isFocused ? 'primary opacity-75' : ''}`"
          class="mx-auto mb-4"
          flat
          max-width="736"
          rounded="lg"
        >
          <v-responsive class="overflow-y-auto pt-2" max-height="300">
            <v-textarea
              v-model="message"
              v-model:focused="isFocused"
              auto-grow
              bg-color="transparent"
              density="compact"
              flat
              hide-details
              no-resize
              placeholder="Describe an app or site you want to create..."
              rows="3"
              single-line
              variant="solo"
            />
          </v-responsive>

          <div class="d-flex align-center pa-1 ga-1">
            <v-btn
              v-tooltip:bottom="{
                text: 'Attach a file',
                disabled: $vuetify.display.smAndDown,
              }"
              icon="mdi-paperclip"
              rounded="lg"
              size="x-small"
              variant="text"
              @click="file?.click()"
            />

            <v-spacer />

            <v-btn
              v-if="undo"
              v-tooltip:bottom="{
                text: 'Undo',
                disabled: $vuetify.display.smAndDown,
              }"
              color="medium-emphasis"
              :disabled="!message"
              icon="mdi-restore"
              rounded="lg"
              size="x-small"
              variant="text"
              @click="onClickUndo"
            />

            <div
              v-tooltip:bottom="{
                text: 'Improve prompt',
                disabled: $vuetify.display.smAndDown,
              }"
            >
              <v-btn
                color="medium-emphasis"
                :disabled="!message"
                icon="mdi-pencil-outline"
                :loading="isLoading"
                rounded="lg"
                size="x-small"
                variant="text"
                @click="onClickEnhance"
              />
            </div>

            <v-btn
              class="text-none"
              color="primary"
              :disabled="!message"
              flat
              height="32"
              prepend-icon="mdi-send-outline"
              size="small"
              text="Start building"
            />
          </div>
        </v-card>
      </template>
    </v-hover>

    <div class="d-flex justify-center flex-wrap ga-2">
      <v-chip
        v-for="(action, i) in actions"
        :key="i"
        color="medium-emphasis"
        :prepend-icon="action.icon"
        :text="action.title"
        @click="action.onClick"
      />
    </div>

    <input ref="file" class="d-none" type="file">

  </v-container>
</template>