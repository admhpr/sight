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
      v-if="amountOfPages > 2 && selectedPageIndex < amountOfPages - 2"
      class="border px-4 py-2 cursor-not-allowed text-gray-400"
      >&hellip;</span
    >

    <a
      v-if="amountOfPages > 2 && selectedPageIndex < amountOfPages - 3"
      class="block border px-4 py-2 hover:bg-gray-200 text-gray-600"
      @click="pageNumberSelected(amountOfPages - 2)"
      >{{ amountOfPages - 1 }}</a
    >

    <a
      v-if="amountOfPages > 2 && selectedPageIndex < amountOfPages - 2"
      class="block border px-4 py-2 hover:bg-gray-200 text-gray-600"
      @click="pageNumberSelected(amountOfPages - 1)"
      >{{ amountOfPages }}</a
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
    amountOfPages: { type: Number, default: 0 },
  },
  data() {
    return {
      selectedPageIndex: 0,
    };
  },
  computed: {
    pageNumbers() {
      return new Array(this.amountOfPages);
    },
  },
  methods: {
    pageNumberSelected(index) {
      if (index >= 0 && index <= this.amountOfPages) {
        this.selectedPageIndex = index;
        this.$emit("page-selected", index);
      }
    },
  },
};
</script>

<style scoped>
.selected {
  background-color: var(--accent-compliment);
}
</style>
