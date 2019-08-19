<template>
  <div>
    <button @click="login">Log In</button>
  </div>
</template>

<script>
import Auth from "~/library/auth";

export default {
  head: {
    title: "Log In",

    meta: [
      {
        hid: "description",
        name: "description",
        content: "Log in to sustained.name."
      }
    ]
  },

  layout: "default",

  methods: {
    login() {
      Auth.login();
    }
  }
};
</script>

<style>
</style>
