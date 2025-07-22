import { defineStore } from "pinia";

export const usePostStore = defineStore("post", {
  state: () => ({
    posts: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchPosts() {
      this.loading = true;
      try {
        this.posts = await $fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=10"
        );
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    async savePost(post) {
      try {
        const newPost = await $fetch(
          "https://jsonplaceholder.typicode.com/posts",
          {
            method: "POST",
            body: post,
          }
        );
        this.posts.push(newPost);
      } catch (error) {
        this.error = error.message;
      }
    },
    async updatePost(post) {
      try {
        const updatedPost = await $fetch(
          `https://jsonplaceholder.typicode.com/posts/${post.id}`,
          {
            method: "PUT",
            body: post,
          }
        );
        const index = this.posts.findIndex((p) => p.id === updatedPost.id);
        if (index !== -1) {
          this.posts[index] = updatedPost;
        }
      } catch (error) {
        this.error = error.message;
      }
    },
    async deletePost(id) {
      try {
        await $fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
          method: "DELETE",
        });
        this.posts = this.posts.filter((post) => post.id !== id);
      } catch (error) {
        this.error = error.message;
      }
    },
  },
});
