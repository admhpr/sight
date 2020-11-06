<template>
  <section aria-labelledby="main-title">
    <header>
      <img
        v-if="data.heroImage"
        :src="$withBase(data.heroImage)"
        :alt="data.heroAlt || 'hero'"
      />

      <h1
        v-if="data.heroText"
        class="mb-5 text-2xl flex text-center justify-center"
      >
        {{ data.heroText || $title }}
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
    <canvas id="canvas"></canvas>

    <footer>
      <div class="bg-main-background text-primary p-10 flex justify-center">
        MIT Licensed | Copyright © 2019-present Adam Harpur
      </div>
    </footer>
  </section>
</template>

<script>
import NavLink from "@theme/components/NavLink.vue";
import BlogPage from "@theme/pages/blog/BlogPage.vue";
import SimplexNoise from "simplex-noise";

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
  mounted() {
    window.requestAnimFrame = (function () {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 1000 / 60);
        }
      );
    })();

    var canvas, ctx;
    var width, height;
    var freq = 0.09;
    var offsetX = 10;
    var perlin;
    var xstart = Math.random() * 10;
    var ystart = Math.random() * 10;

    function setup() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas = document.getElementById("canvas");
      ctx = canvas.getContext("2d");
      perlin = new SimplexNoise();
      canvas.width = width;
      canvas.height = height;

      draw();
    }

    function draw() {
      requestAnimFrame(draw);

      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "rgba(100, 10, 90, 0.9)";

      xstart = 0.02;
      ystart -= 0.01;

      ctx.save();
      ctx.translate(width / 2, height / 2);
      let ynoise = ystart;
      for (var x = -(width / 2) / offsetX; x < width / 2 / offsetX; x++) {
        ynoise += 0.05;
        let xnoise = xstart;
        for (var y = -10; y < 10; y++) {
          xnoise += 0.5;
          var size = perlin.noise2D(xnoise, ynoise);
          var pointX = perlin.noise2D(x * freq, y * freq) + x;
          var pointY = perlin.noise2D(x * freq, y * freq) + y;

          ctx.fillRect(pointX * offsetX, pointY * 50, size * 40, size * 1);
        }
      }
      ctx.restore();
    }
    setup();
  },
};
</script>

<style lang="stylus"></style>
