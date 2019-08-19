import Vue from "vue";

import DynamicMarkdown from "~/components/DynamicMarkdown.vue";
import loadDynamicMarkdown from "~/library/dynamic-markdown.js";

Vue.component("DynamicMarkdown", DynamicMarkdown);

export default ({ app }) => {
  app.loadMarkdown = loadDynamicMarkdown;
};
