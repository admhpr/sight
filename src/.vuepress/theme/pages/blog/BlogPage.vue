<template>
  <main aria-labelledby="main-title">
    <header v-if="frontmatter.blogPageTitle" class="hero text-primary">
      <h1 id="main-title">Blog</h1>

      <p class="description opacity-75">
        {{ frontmatter.tagline || $description || "Welcome To My Blogs" }}
      </p>
    </header>

    <Content class="theme-default-content custom" />

    <BlogPostContainer
      :posts="posts"
      :posts-per-page="postsPerPage"
      @page-selected="onPageSelected"
    />
  </main>
</template>

<script>
import NavLink from "@theme/components/NavLink.vue";
import BlogPostContainer from "@theme/pages/blog/BlogPostContainer.vue";

function* chunk(arr, chunkSize) {
  for (let i = 0; i < arr.length; i += chunkSize) {
    yield arr.slice(i, i + chunkSize);
  }
}
const POSTS_PER_PAGE = 1;
export default {
  components: { BlogPostContainer },
  props: {
    postsToRender: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedPage: 0,
    };
  },
  computed: {
    postsPerPage() {
      return Math.ceil(this.basePosts.length / POSTS_PER_PAGE);
    },
    frontmatter() {
      return this.$page.frontmatter;
    },

    actionLink() {
      return {
        link: this.frontmatter.actionLink,
        text: this.frontmatter.actionText,
      };
    },

    sortedPosts() {
      return this.$site.pages
        .filter((x) => x.path.startsWith("/blog/") && !x.frontmatter.blog_index)

        .sort(
          (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
        );
    },
    basePosts() {
      return this.postsToRender.length ? this.postsToRender : this.sortedPosts;
    },
    posts() {
      return [...chunk(this.basePosts, POSTS_PER_PAGE)][this.selectedPage];
    },
  },
  methods: {
    onPageSelected(pageIndex) {
      this.selectedPage = pageIndex;
    },
  },
};
</script>

<style lang="stylus">
.home {
  padding: $navbarHeight 2rem 0;
  max-width: 960px;
  margin: 0px auto;
  display: block;

  .hero {
    text-align: center;

    img {
      max-width: 100%;
      max-height: 280px;
      display: block;
      margin: 3rem auto 1.5rem;
    }

    h1 {
      font-size: 3rem;
    }

    h1, .description, .action {
      margin: 1.8rem auto;
    }

    .description {
      max-width: 35rem;
      font-size: 1.6rem;
      line-height: 1.3;
    }
  }

  .footer {
    padding: 2.5rem;
    border-top: 1px solid var(--border-color);
    text-align: center;
  }
}

@media (max-width: $MQMobileNarrow) {
  .home {
    padding-left: 1.5rem;
    padding-right: 1.5rem;

    .hero {
      img {
        max-height: 210px;
        margin: 2rem auto 1.2rem;
      }

      h1 {
        font-size: 2rem;
      }

      h1, .description, .action {
        margin: 1.2rem auto;
      }

      .description {
        font-size: 1.2rem;
      }
    }
  }
}
</style>
