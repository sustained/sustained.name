<template>
  <div class="border-gray-900 border mb-6 rounded-lg shadow-xl">
    <div>
      <ul
        class="bg-blue-800 flex items-center justify-between h-full px-4 py-2 rounded-t-lg"
        style="margin: -1px -1px 0 -1px;  "
      >
        <li class="list-none">
          <strong>Language:</strong>
          {{ languageTitle }}
        </li>

        <li class="requires-js list-none">
          <button class="mr-4" @click.prevent="toggleRendered">Highlight</button>
          <button class="mr-4" @click="copyToClipboard">Copy</button>

          <button class="mr-4" @click="void 0;">Enlarge</button>
          <button @click="void 0;">Shrink</button>
        </li>
      </ul>
    </div>

    <code class="hljs rounded-b-lg">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <pre v-if="showRendered" v-html="rendered"></pre>
      <pre v-else>{{ code }}</pre>
    </code>

    <textarea
      ref="clipboardCopy"
      v-model="code"
      style="display: none; position: absolute; left: -9999px;"
    ></textarea>
  </div>
</template>

<script>
// import "highlight.js/styles/solarized-dark.css";
import "highlight.js/styles/monokai-sublime.css";
// import "highlight.js/styles/zenburn.css";
// import "highlight.js/styles/agate.css";
// import "highlight.js/styles/androidstudio.css";
// import "highlight.js/styles/dracula.css";
// monokai-sublime, zenburn, agate, androidstudio, dracula

import { highlight } from "highlight.js";

const languageMap = {
  css: "CSS",
  js: "JavaScript",
  html: "HTML"
};

export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ["code", "lang"],

  data() {
    return {
      rendered: "",
      showRendered: false
    };
  },

  computed: {
    languageTitle() {
      if (languageMap[this.lang]) return languageMap[this.lang];
      return "Unknown";
    }
  },

  created() {
    this.rendered = highlight(this.lang, this.code, true).value;
    this.showRendered = true;
  },

  methods: {
    copyToClipboard() {
      const el = this.$refs.clipboardCopy;
      el.style.display = "block";
      el.select();
      const copied = document.execCommand("copy");
      el.style.display = "none";
      console.log("copied: " + copied);
    },

    toggleRendered() {
      this.showRendered = !this.showRendered;
    }
  }
};
</script>
