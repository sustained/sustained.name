<template>
  <div>
    <h1>Tags</h1>

    <pre>{{ tags }}</pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: []
    };
  },

  async created() {
    try {
      const tags = await import("static/json/tags.json");

      this.tags = tags.default;
    } catch (e) {
      console.error("Unable to load JSON. :(", e.message);
    }
  },

  layout: "blog"
};
</script>
