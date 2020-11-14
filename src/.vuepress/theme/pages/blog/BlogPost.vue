<template>
  <div>
    <div class="max-w-lg w-64 min-w-full w-auto px-12 py-2">
      <span class="text-2xl font-bold">
        <router-link :to="post.path" class="text-primary pb-1">{{
          post.title
        }}</router-link>
      </span>
      <div class="pt-1">
        <span>{{ formateDate(post.frontmatter.date) }}</span>
        <span>&middot;</span>
        <span>{{ post.readingTime.text }}</span>
      </div>
      <div class="mb-2">
        <span>
          <span
            v-for="tag in post.frontmatter.tags"
            :key="tag"
            class="rounded-full py-1 text-sm font-semibold text-primary mr-1"
            ><router-link :to="'/tags/' + lowerCase(tag)"
              >#{{ lowerCase(tag) }}
            </router-link></span
          >
        </span>
      </div>
      <hr />
      <div class="mt-2 text-lg">
        {{ post.frontmatter.description }}
      </div>
    </div>
    <div class="flex justify-end post-footer">
      <router-link
        :to="post.path"
        class="border text-gray-800 bg-white rounded p-1 font-bold"
        >Read More</router-link
      >
    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  props: {
    post: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    formateDate(date) {
      return moment(date).format('MMM Do YYYY');
    },
    lowerCase(str) {
      return `${str}`.toLowerCase();
    },
  },
};
</script>

<style scoped>
.post-footer {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23000000' fill-opacity='0.3' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
}
</style>
