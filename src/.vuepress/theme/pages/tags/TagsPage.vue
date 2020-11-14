<template>
  <section>
    <Navbar v-if="$route.params.tag" />
    <router-link v-if="$route.params.tag" to="/tags"></router-link>
    <div v-if="!$route.params.tag" class="flex justify-center mx-auto pt-8">
      <nav>
        <a
          v-for="tag in Object.keys(tags)"
          :key="tag"
          class="tag py-3 px-4 text-gray-700 font-medium mr-3"
          :class="selectedTag === tag ? 'tag-selected ' : ''"
          @click="onTagSelect(tag)"
        >
          {{ tag }} <span>{{ tags[tag].length }}</span>
        </a>
      </nav>
    </div>
    <section class="main m-10">
      <BlogPage :posts-to-render="selectedPosts" />
    </section>
  </section>
</template>

<script>
import Navbar from '@theme/components/Navbar.vue';
import BlogPage from '@theme/pages/blog/BlogPage.vue';
export default {
  components: {
    BlogPage,
    Navbar,
  },
  data() {
    return {
      selectedTag: '',
    };
  },
  computed: {
    tags() {
      const allTags = {};
      this.postsTags.forEach(({ post, tags }) => {
        for (const tag of tags) {
          if (!Object.keys(allTags).includes(tag)) {
            allTags[tag] = [];
          }
          allTags[tag].push(post);
        }
      });
      return allTags;
    },
    selectedPosts() {
      return this.tags[this.selectedTag];
    },
    postsTags() {
      return this.$site.pages
        .filter(
          ({ path, frontmatter }) =>
            path.startsWith('/blog/') && !frontmatter.blog_index
        )
        .map((post) => ({
          post,
          tags: post.frontmatter.tags
            ? post.frontmatter.tags.map((tag) => `${tag}`.toLowerCase())
            : [],
        }));
    },
  },
  watch: {
    $route({ params: { tag } }) {
      if (tag) {
        this.selectedTag = tag;
      }
    },
  },
  mounted() {
    if (this.$route.params.tag) {
      this.selectedTag = this.$route.params.tag;
    }
  },
  methods: {
    onTagSelect(tag) {
      this.selectedTag = tag;
    },
  },
};
</script>

<style lang="stylus">
section {
  color: #444;
}
// overrides
.theme-dark {
  a:hover,
  .nav-links a.router-link-active {
    color: #dddddd;
  }
  .tag {
    color: #dddddd;
  }
  .tag:hover {
    background-color: #051b2c;
  }
}

a:hover,
.nav-links a.router-link-active {
  color: #c7ad88;
}
.tag {
  border-style: solid;
  border-width: 3px;
  border-color: var(--border-colors);
}
.tag-selected {
  box-shadow: 5px 5px var(--font-color);
}
</style>
