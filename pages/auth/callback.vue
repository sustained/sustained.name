<template>
  <div>
    <p>Auth callback.</p>
  </div>
</template>

<script>
import Auth from "~/library/auth";

export default {
  head: {
    title: "Callback - Auth"
  },

  layout: "default",

  created() {
    Auth.handleAuthentication();
  }
};
</script>

<style>
</style>
