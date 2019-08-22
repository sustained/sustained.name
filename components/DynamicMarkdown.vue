<script>
import Vue from "vue";

export default {
  props: {
    /*
      The render function provided by frontmatter-markdown-loader.
    */
    renderFunction: {
      type: String,

      default() {
        return "return function render() {};";
      }
    },

    /*
      The static render functions provided by frontmatter-markdown-loader.
    */
    staticRenderFunctions: {
      type: String,

      default() {
        return "return [];";
      }
    },

    /*
      A list of components to load.
    */
    componentList: {
      type: Array,

      default() {
        return [];
      }
    },

    /*
      The frontmatter attributes which will be merge into data and
      accessible via e.g. {{ attributeName }} in markdown files.
    */
    attributes: {
      type: Object,

      default() {
        return {};
      }
    },

    /*
      Custom attributes to merge into the frontmatter attributes.

      Example:

        Vue component:

          <DynamicMarkdown v-bind="entity" :custom-attributes="{ foo: 'bar' }" />

        Markdown file:

          {{ foo }}
    */
    customAttributes: {
      type: Object,

      default() {
        return {};
      }
    }
  },

  /*
    Merge in YAML frontmatter attributes so they can be used in
    the markdown if desired.
  */
  data() {
    const data = {};

    for (const [key, value] of Object.entries(this.attributes)) {
      data[key] = value;
    }

    for (const [key, value] of Object.entries(this.customAttributes)) {
      data[key] = value;
    }

    return data;
  },

  beforeDestroy() {
    this.unregisterComponents();
  },

  created() {
    this.registerComponents();

    this.renderer = new Function(this.renderFunction).bind()();
    this.$options.staticRenderFns = new Function(this.staticRenderFunctions)();
  },

  methods: {
    /*
      HACK: We define global components temporarily so that we can access a
            component as <Foo /> in the markdown since there is no good  way
            to dynamically set components so only alternative would be e.g.
            <Component is="components.Foo" /> which is awful in its own right.
    */
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
