<template>
  <div>
    <section id="home-wrapper" class="h-screen" aria-labelledby="main">
      <header>
        <img
          v-if="data.heroImage"
          :src="$withBase(data.heroImage)"
          :alt="data.heroAlt || 'hero'"
        />

        <h1
          v-if="data.heroText"
          class="pt-5 mb-5 text-1xl flex text-center justify-center"
        >
          <router-link to="/blog" class="text-gray-700 heroText">
            {{ data.heroText || $title }}</router-link
          >
        </h1>

        <p>
          {{ data.tagline || $description }}
        </p>

        <p v-if="data.actionText && data.actionLink" class="action">
          <NavLink
            class="action-button text-bg bg-accent hover:bg-accenthover hover:text-bg"
            :item="actionLink"
          />
        </p>
      </header>

      <div v-if="data.features && data.features.length" class="features">
        <div
          v-for="(feature, index) in data.features"
          :key="index"
          class="feature p-4"
        >
          <h2>{{ feature.title }}</h2>
          <p>{{ feature.details }}</p>
        </div>
      </div>

      <Content class="theme-default-content custom" />
      <section class="flex justify-center">
        <canvas id="canvas"></canvas>
      </section>
    </section>
    <footer>
      <div class="bg-main-background text-primary p-10 flex justify-center">
        Copyright © {{ new Date().getFullYear() }} Adam Harpur
      </div>
    </footer>
  </div>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue';
import BlogPage from '@theme/pages/blog/BlogPage.vue';
import SimplexNoise from 'simplex-noise';

export default {
  components: { NavLink },

  computed: {
    data() {
      return this.$page.frontmatter;
    },

    actionLink() {
      return {
        link: this.data.actionLink,
        text: this.data.actionText,
      };
    },
  },
  mounted() {},
};
</script>

<style scoped>
#home-wrapper {
  background-image: url('../../img/dot-grid.png');
}
</style>
