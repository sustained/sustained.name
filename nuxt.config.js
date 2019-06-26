import path from "path";

import hljs from "highlight.js";

import pkg from "./package";

const md = require("markdown-it")({
  html: true,
  linkify: true,
  typographer: false,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          "</code></pre>"
        );
      } catch (__) {}
    }

    return ""; // use external default escaping
  }
});

export default {
  mode: "universal",

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,

    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],

    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: "#fff" },

  /*
  ** Global CSS
  */
  css: ["~assets/scss/sustained.scss"],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [{ src: "~/plugins/after_each.js", mode: "client" }],

  /*
  ** Nuxt.js modules
  */
  modules: ["nuxt-purgecss"],

  /*
  ** Fonts
  */
  webfontloader: {
    google: {
      families: ["Lato:400,700"] // Loads Lato font with weights 400 and 700
    }
  },

  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,

    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }

      config.module.rules.push({
        test: /\.md$/,
        loader: "frontmatter-markdown-loader",
        include: path.resolve(__dirname, "contents"),
        options: {
          vue: {
            root: "dynamicMarkdown"
          },

          markdown: body => {
            return md.render(body);
          }
        }
      });
    },

    postcss: {
      plugins: {
        tailwindcss: path.resolve(__dirname, "./tailwind.config.js"),

        cssnano: {
          preset: "default",
          discardComments: { removeAll: true },
          zIndex: false
        }
      },

      // Change the postcss-preset-env settings
      preset: {
        stage: 0, // enable all (experimental) polyfills

        autoprefixer: {
          cascade: false,
          grid: true
        }
      }
    }
  }
};
