import Vue from "vue";

import DynamicMarkdown from "~/components/DynamicMarkdown.vue";
import loadDynamicMarkdown from "~/library/dynamic-markdown.js";

Vue.component("DynamicMarkdown", DynamicMarkdown);

export default async ({ app, store }) => {
  const sources = <%= serialize(options.sources) %>;
  const toLoad = <%= serialize(options.toLoad) %>;

  /*
    TODO: Is there some way we can make it easier than it currently is?

    It's not TOO too bad but it's still quite a lot of boilerplate for whenever
    you want to use it.

    Then again this is always going to be on a a dynamic page  i.e. a page with a
    route parameter, so like it's not TOO much repetition, but...

    Minimum Required HTML Example:

      <DynamicMarkdown v-bind="project" />

    Minimum Required JS Example:

      async asyncData({ app, store, params, error }) {
        const project = store.getters["dynamic-markdown/projects"](params.project);

        if (!project) {
          return error({ statusCode: 404, message: "That project does not exist!" });
        }

        return { project: await app.loadMarkdown(`projects/${params.project}/content.md`) };
      }
  */
  app.loadMarkdown = loadDynamicMarkdown;

  /*
      TODO: Extract to generateStore.
  */
  const initialState = {};
  const getters = {};

  for (const [name, files] of Object.entries(toLoad)) {
    getters[name] = (state) => {
      return (name2) => state.projects[name2] || null;
    }

    for (const file of files) {
      const { default: state } = await import("static/json/" + file + ".json");

      initialState[file] = state;
    }


    /*
      TODO: Add utility functions for pluralising and singular-ising and we also
            need something for upper-case-ing words and such. Perhaps we can see
            if lodash provides them, otherwise make our own... or find npm packages.

      TODO: Generate some useful relationship-related getters dynamically.
    */
    // for (const relationship of source.relationships) {
    //   getters["get" + name.substr(0, 1).toUpperCase() + name.substr(1) + "By" + relationship.substr(0, 1).toUpperCase() + relationship.substr(1)] = (state) => {}
    // }
  }

  const storeModule = {
    namespaced: true,
    state: Object.assign({}, initialState),
    getters: getters
  };

  /*
    TODO: I think preserveState was causing some very very odd issues so I disabled
          it but I am not 100% sure so that probably needs to be looked into.
  */
  store.registerModule("dynamic-markdown", storeModule, {
    preserveState: false
  });
};

function generateStore() {

}
