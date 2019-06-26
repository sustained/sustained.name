<template>
  <code ref="code">
    <slot/>
  </code>
</template>

<script>
import highlight from "highlight.js/lib/highlight";

// import js from "highlight.js/lib/languages/javascript";
// import xml from "highlight.js/lib/languages/xml";
// import css from "highlight.js/lib/languages/css";

// import "highlight.js/styles/zenburn.css";

// highlight.registerLanguage("javascript", js);
// highlight.registerLanguage("css", css);
// highlight.registerLanguage("xml", xml);

export default {
  props: {
    lang: {
      type: String,
      required: true,
      validator(prop) {
        return ["javascript", "xml", "css"].includes(prop);
      }
    }
  },

  created() {
    this.loadLanguage().then(this.registerLanguage);
  },

  mounted() {
    this.initialiseHighlighting();
  },

  methods: {
    loadLanguage() {
      return import(`highlight.js/lib/languages/${this.language}`);
    },

    registerLanguage(language) {
      highlight.registerLanguage(this.language, language.default);
    },

    initialiseHighlighting() {
      const code = this.$refs.code;

      highlight.highlightBlock(code);
    }
  }
};
</script>
