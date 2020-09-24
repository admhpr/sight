<template>
  <div>
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
          class="inline-block bg-background-primary rounded-full px-3 py-1 text-sm font-semibold text-primary mr-2"
          >#{{ tag }}</span
        >
      </span>
    </div>
    <div class="text-lg mb-4">{{ post.frontmatter.description }}</div>
    <div class="mb-8">
      <router-link :to="post.path" class="font-bold uppercase"
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
