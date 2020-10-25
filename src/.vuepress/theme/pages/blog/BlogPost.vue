<template>
  <div>
    <div class="w-full px-24 py-2">
      <span class="text-3xl font-bold">
        <router-link :to="post.path" class="text-primary pb-1">{{
          post.title
        }}</router-link>
      </span>
      <div class="mb-4 opacity-75 pt-1">
        <span>{{ formateDate(post.frontmatter.date) }}</span>
        <span>&middot;</span>
        <span>{{ post.readingTime.text }}</span>
        <span class="px-6 py-4">
          <span
            v-for="tag in post.frontmatter.tags"
            :key="tag"
            class="inline-block` rounded-full px-3 py-1 text-sm font-semibold text-primary mr-2"
            >#{{ tag }}</span
          >
        </span>
      </div>
      <div class="text-lg p-5 mb-4">{{ post.frontmatter.description }}</div>
    </div>
    <div class="flex justify-end">
      <router-link :to="post.path" class="border rounded p-1 font-bold"
        >Read More</router-link
      >
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    post: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    formateDate(date) {
      return moment(date).format("MMM Do YYYY");
    },
  },
};
</script>

<style lang="scss" scoped></style>
