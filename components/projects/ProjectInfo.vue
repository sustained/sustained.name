<template>
  <article class="text-white">
    <div id="technologies">
      <transition
        name="bounce"
        mode="out-in"
        enter-active-class="bounceInLeft"
        leave-active-class="bounceOutRight"
      >
        <p :key="technologyIndex">{{ currentTechnology }}</p>
      </transition>
    </div>
  </article>
</template>

<script>
/*
  TODO: Information to display: name, description, type, status, keywords,
        license, repository, languages, technologies, screenshots.
*/
export default {
  props: {
    technologies: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  data() {
    return {
      interval: null,
      technologyIndex: 0
    };
  },

  computed: {
    currentTechnology() {
      return this.technologies[this.technologyIndex];
    }
  },

  mounted() {
    setInterval(() => {
      if (++this.technologyIndex >= this.technologies.length) {
        this.technologyIndex = 0;
      }
    }, 3000);
  },

  beforeDestroy() {
    clearInterval(this.interval);
  },

  methods: {
    isCurrentTechnology(index) {
      return index === this.technologyIndex;
    }
  }
};
</script>

<style>
#technologies {
  height: 100px;
}
#technologies p {
  animation-duration: 0.25s;
}

html,
body,
div#app {
  overflow-x: hidden;
}
</style>
