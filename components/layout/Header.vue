<template>
  <header class="main">
    <a id="nav-expand" class="currentColour" href="#" @click="toggleNavigation">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
      </svg>
    </a>

    <logo />

    <transition name="slide">
      <navigation v-show="isNavVisible" @navigate="onNavigate" />
    </transition>
  </header>
</template>

<script>
import Logo from "~/components/layout/Logo.vue";
import Navigation from "~/components/layout/Navigation.vue";

export default {
  components: { Logo, Navigation },

  computed: {
    isNavVisible() {
      return this.$store.state.app.isNavVisible;
    },

    isMiniNav() {
      return document.documentElement.clientWidth < 580;
    }
  },

  created() {
    if (process.client) {
      // eslint-disable-next-line
      window.addEventListener("resize", this.onResize, { passive: true });
    }
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },

  methods: {
    onNavigate() {
      if (this.isMiniNav) {
        this.$store.commit("app/setNavVisible", false);
      }
    },

    toggleNavigation() {
      this.$store.commit("app/toggleNavVisible");
    },

    onResize(event) {
      if (this.isNavVisible === false) {
        if (document.documentElement.clientWidth >= 580) {
          this.$store.commit("app/setNavVisible", true);
        }
      }
    }
  }
};
</script>

<style>
svg {
  fill: currentColor;
}

.slide-enter-active {
  transition-duration: 0.5s;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  transition-duration: 0.5s;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to,
.slide-leave {
  max-height: 200px;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  overflow: hidden;
  max-height: 0;
}
</style>
