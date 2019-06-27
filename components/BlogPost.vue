<script>
import Vue from "vue";

export default {
  // eslint-disable-next-line
  props: ["renderFunction", "staticRenderFunctions", "componentList"],

  beforeDestroy() {
    this.unregisterComponents();
  },

  created() {
    this.registerComponents();
    this.renderer = new Function(this.renderFunction)();
    this.$options.staticRenderFns = new Function(this.staticRenderFunctions)();
  },

  methods: {
    registerComponents() {
      this.componentList.forEach(component => {
        const [name, path] = this.getComponentNameAndPath(component);

        Vue.component(name, () => import(`~/components/${path}.vue`));
      });
    },

    unregisterComponents() {
      this.componentList.forEach(component => {
        const [name] = this.getComponentNameAndPath(component);

        delete Vue.options.components[name];
      });
    },

    getComponentNameAndPath(componentName) {
      let componentPath = componentName;

      if (typeof componentName !== "string") {
        [componentName, componentPath] = Object.entries(componentName).flat();
      }

      return [componentName, componentPath];
    }
  },

  render(createElement) {
    return this.renderer
      ? this.renderer()
      : createElement("div", "Please wait...");
  }
};
</script>
