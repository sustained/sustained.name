<template>
  <div class="section-resume">
    <header class="main">
      <logo/>

      <navigation/>
    </header>

    <main class="main">
      <div>
        <nuxt/>
      </div>
    </main>

    <footer/>
  </div>
</template>

<script>
import Logo from "~/components/layout/Logo.vue";
import Navigation from "~/components/layout/Navigation.vue";

export default {
  components: { Logo, Navigation }
};
</script>
