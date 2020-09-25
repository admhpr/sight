<template>
  <main class="home" aria-labelledby="main-title">
    <header
      v-if="data.blogPageTitle"
      class="hero text-primary bg-background-primary"
    >
      <h1 id="main-title">Blog</h1>

      <p class="description opacity-75">
        {{ data.tagline || $description || "Welcome To My Blogs" }}
      </p>
    </header>

    <Content class="theme-default-content custom" />

    <div>
      <div class="flex-grow">
        <div
          v-for="post in posts"
          :key="post"
          class="mb-12 bg-background-content p-4 rounded-lg shadow-lg"
        >
          <BlogPost :post="post" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import NavLink from "@theme/components/NavLink.vue";
import BlogPost from "@theme/components/BlogPost.vue";

export default {
  components: { BlogPost },

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

    posts() {
      return this.$site.pages
        .filter((x) => x.path.startsWith("/blog/") && !x.frontmatter.blog_index)

        .sort(
          (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
        );
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
