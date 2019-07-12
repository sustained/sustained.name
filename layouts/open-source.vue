<template>
  <div class="section-open-source">
    <Header />

    <main class="main">
      <div>
        <nuxt />
      </div>
    </main>

    <footer />
  </div>
</template>

<script>
import Header from "~/components/layout/Header.vue";

export default {
  components: { Header }
};
</script>
