<script>
import Vue from "vue";

export default {
  // eslint-disable-next-line
  props: {
    renderFunction: {
      type: String,

      default() {
        return "return function render() {};";
      }
    },
    staticRenderFunctions: {
      type: String,

      default() {
        return "return [];";
      }
    },
    componentList: {
      type: Array,

      default() {
        return [];
      }
    }
  },

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

    getComponentNameAndPath(component) {
      let componentPath = component;
      let componentName = component;

      if (typeof component !== "string") {
        [componentName, componentPath] = Object.entries(component).reduce(
          (accum, value) => accum.concat(value),
          []
        );
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
