import path from "path";
import pkg from "./package";
import markdown from "./library/markdown-it";
import { tags, articles, categories } from "./library/blog";

console.log("!!!", tags, articles, categories);

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
  plugins: [],

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
            return markdown.render(body);
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
  },

  /*
  generate: {
    routes: function () {
      let posts = axios.get('https://api.com/posts', {params: {size: 10}}).then((res) => {
        return res.data.posts.map((post) => {
          return '/feed/' + post.id
        })
      })
      let users = axios.get('https://api.com/users', {params: {size: 10}}).then((res) => {
        return res.data.content.map((user) => {
          return '/user/' + user.id
        })
      })
      return Promise.all([posts, users]).then(values => {
        return values.join().split(',');
      })
    }
  },
  */

  generate: {
    routes() {
      const tagRoutes = tags.map(tag => {
        return {
          route: tag.path,
          payload: tag
        };
      });

      const result = [...tagRoutes];
      console.log("so...", result);
      return result;
    }
  }
};
