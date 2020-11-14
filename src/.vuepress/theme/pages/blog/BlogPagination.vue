<template>
  <div
    class="container md:mb-8 pt-8 px-4 mx-auto flex justify-center select-none"
  >
    <a
      class="block border px-4 py-2 rounded-l hover:bg-gray-200 text-gray-600"
      rel="prev"
      @click="pageNumberSelected(selectedPageIndex - 1)"
      >&larr;</a
    >
    <span
      v-for="(pageNumber, index) in pageNumbers"
      :key="pageNumber"
      :class="index === selectedPageIndex ? 'selected' : ''"
    >
      <a
        v-if="index < selectedPageIndex + 2 && index > selectedPageIndex - 1"
        class="block border px-4 py-2 hover:bg-gray-200"
        @click="pageNumberSelected(index)"
        >{{ index + 1 }}</a
      >
    </span>
    <span
      v-if="postsPerPage > 2 && selectedPageIndex < postsPerPage - 2"
      class="border px-4 py-2 cursor-not-allowed text-gray-400"
      >&hellip;</span
    >

    <a
      v-if="postsPerPage > 2 && selectedPageIndex < postsPerPage - 3"
      class="block border px-4 py-2 hover:bg-gray-200 text-gray-600"
      @click="pageNumberSelected(postsPerPage - 2)"
      >{{ postsPerPage - 1 }}</a
    >

    <a
      v-if="postsPerPage > 2 && selectedPageIndex < postsPerPage - 2"
      class="block border px-4 py-2 hover:bg-gray-200 text-gray-600"
      @click="pageNumberSelected(postsPerPage - 1)"
      >{{ postsPerPage }}</a
    >

    <a
      class="block border px-4 py-2 rounded-r hover:bg-gray-200 text-gray-600"
      rel="next"
      @click="pageNumberSelected(selectedPageIndex + 1)"
      >&rarr;</a
    >
  </div>
</template>

<script>
export default {
  props: {
    postsPerPage: { type: Number, default: 0 },
  },
  data() {
    return {
      selectedPageIndex: 0,
    };
  },
  computed: {
    pageNumbers() {
      return new Array(this.postsPerPage);
    },
  },
  methods: {
    pageNumberSelected(index) {
      if (index >= 0 && index < this.postsPerPage) {
        this.selectedPageIndex = index;
        this.$emit('page-selected', index);
      }
    },
  },
};
</script>

<style scoped>
.selected {
  border-bottom: 5px var(--accent-color) solid;
}
</style>
