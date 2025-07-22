<template>
  <v-container>
    <h1 class="text-h4 mb-4">Posts List</h1>
    <v-data-table :headers="headers" :items="posts" :loading="loading" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Posts</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ props }">
              <v-btn color="primary" dark class="mb-2" v-bind="props">
                New Post
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="editedItem.title" label="Title"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea v-model="editedItem.body" label="Body"></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="save">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon size="small" class="me-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon size="small" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePostStore } from '@/stores/postStore'

const postStore = usePostStore()

const dialog = ref(false)
const dialogDelete = ref(false)

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Title', key: 'title' },
  { title: 'Body', key: 'body' },
  { title: 'Actions', key: 'actions', sortable: false },
]

const editedIndex = ref(-1)
const editedItem = ref({
  id: null,
  title: '',
  body: '',
})
const defaultItem = {
  id: null,
  title: '',
  body: '',
}

const formTitle = computed(() => {
  return editedIndex.value === -1 ? 'New Post' : 'Edit Post'
})

const posts = computed(() => postStore.posts)
const loading = computed(() => postStore.loading)

onMounted(async () => {
  await postStore.fetchPosts()
})

function editItem(item) {
  editedIndex.value = posts.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  dialog.value = true
}

function deleteItem(item) {
  editedIndex.value = posts.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  dialogDelete.value = true
}

function deleteItemConfirm() {
  postStore.deletePost(editedItem.value.id)
  closeDelete()
}

function close() {
  dialog.value = false
  editedIndex.value = -1
  editedItem.value = Object.assign({}, defaultItem)
}

function closeDelete() {
  dialogDelete.value = false
  editedIndex.value = -1
  editedItem.value = Object.assign({}, defaultItem)
}

function save() {
  if (editedIndex.value > -1) {
    postStore.updatePost(editedItem.value)
  } else {
    postStore.savePost(editedItem.value)
  }
  close()
}
</script>