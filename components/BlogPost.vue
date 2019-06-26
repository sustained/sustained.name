<script>
import highlight from "highlight.js/lib/highlight";

import js from "highlight.js/lib/languages/javascript";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";

import "highlight.js/styles/zenburn.css";

import CodePen from "~/components/embeds/CodePen.vue";
import CodeHighlight from "~/components/embeds/CodeHighlight.vue";

highlight.registerLanguage("javascript", js);
highlight.registerLanguage("css", css);
highlight.registerLanguage("xml", xml);

export default {
  components: {
    CodePen,
    CodeHighlight
  },

  // eslint-disable-next-line
  props: ["renderFunction", "staticRenderFunctions", "componentList"],

  computed: {
    components() {
      return this.componentList.reduce((components, component) => {
        components[component] = () => import(`~/components/${component}.vue`);

        return components;
      }, {});
    }
  },

  created() {
    this.renderer = new Function(this.renderFunction)();
    this.$options.staticRenderFns = new Function(this.staticRenderFunctions)();
  },

  mounted() {
    // this.initialiseHighlighting();
  },

  methods: {
    initialiseHighlighting() {
      const codeBlocks = document.querySelectorAll("code");

      codeBlocks.forEach(code => {
        highlight.highlightBlock(code);
      });
    }
  },

  render(createElement) {
    return this.renderer
      ? this.renderer()
      : createElement("div", "Please wait...");
  }
};
</script>
