<script>
import Vue from "vue";

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
