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

    <footer>
      <div class="bg-main-background text-primary p-10 flex justify-center">
        Copyright © {{ new Date().getFullYear() }} Adam Harpur
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
    let canvas;
    let ctx;
    let w, h;
    let m;
    let simplex;
    let mx, my;
    let now;

    function setup() {
      canvas = document.querySelector("#canvas");
      ctx = canvas.getContext("2d");

      reset();
      window.addEventListener("resize", reset);
      canvas.addEventListener("mousemove", mousemove);
      console.log(`Referrer: ${document.referrer}`);
    }

    function reset() {
      simplex = new SimplexNoise();
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      m = Math.min(w, h);
      mx = w / 2;
      my = h / 2;
    }

    function mousemove(event) {
      mx = event.clientX + 1;
      my = event.clientY + 1;
    }

    function draw(timestamp) {
      now = timestamp;
      requestAnimationFrame(draw);
      ctx.fillStyle = "#f3f7f9";
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "black";
      for (let i = 1; i < m / 2 - 40; i += 80) {
        drawCircle(i);
      }
    }

    function drawCircle(r) {
      ctx.beginPath();
      let point, x, y;
      let deltaAngle = (Math.PI * 2) / 400;
      for (let angle = 0; angle < Math.PI * 2; angle += deltaAngle) {
        point = calcPoint(angle, r);
        x = point[0];
        y = point[1];
        ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }

    function calcPoint(angle, r) {
      let noiseFactor = (mx / w) * 50;
      let zoom = (my / h) * 200;
      let x = Math.cos(angle) * r + w / 2;
      let y = Math.sin(angle) * r + h / 2;
      let n = simplex.noise3D(x / zoom, y / zoom, now / 2000) * noiseFactor;
      x = Math.cos(angle) * (r + n) + w / 2;
      y = Math.sin(angle) * (r + n) + h / 2;
      return [x, y];
    }

    setup();
    draw();
  },
};
</script>

<style lang="stylus">
#canvas {
  max-height : 550px;
}
</style>
