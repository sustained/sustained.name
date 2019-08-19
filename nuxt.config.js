import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join, resolve } from "path";
import pkg from "./package";
import markdown from "./library/markdown";
import { tags, articles, categories } from "./library/blog";

const IS_DEV = process.env.NODE_ENV.startsWith("dev");

const config = {
  mode: "universal",

  generate: {
    routes() {
      const tagRoutes = tags.map(tag => tag.path);
      const articleRoutes = articles.map(article => article.path);
      const categoryRoutes = categories.map(category => category.path);

      return ["404", ...tagRoutes, ...articleRoutes, ...categoryRoutes];
    }
  },

  hooks: {
    build: {
      before(builder) {
        try {
          const JSON_DIR = resolve(
            builder.nuxt.options.srcDir,
            "static",
            "json"
          );

          console.log("JSON directory is " + JSON_DIR);

          if (!existsSync(JSON_DIR)) mkdirSync(JSON_DIR);

          writeFileSync(join(JSON_DIR, "tags.json"), JSON.stringify(tags));

          writeFileSync(
            join(JSON_DIR, "articles.json"),
            JSON.stringify(articles)
          );

          writeFileSync(
            join(JSON_DIR, "categories.json"),
            JSON.stringify(categories)
          );

          console.log("Successfully wrote the blog JSON files.");
        } catch (e) {
          console.error(
            "A problem occured while writing the blog JSON files.",
            e
          );
        }
      }
    }
  },

  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: "en",
      dir: "ltr"
    },

    bodyAttrs: {
      // class: "no-js"
    },

    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],

    title: pkg.name,
    titleTemplate: "%s - sustained.name",

    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],

    script: [{ src: "node_modules/auth0-js/build/auth0.js" }]
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
  plugins: [
    "plugins/setup-store.js",
    "plugins/register-components.js",
    { src: "plugins/check-js.js", mode: "client" },
    { src: "plugins/after-each.js", mode: "client" }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: ["nuxt-purgecss", "nuxt-i18n", "@nuxtjs/dotenv"],

  /*
  ** Fonts
  */
  webfontloader: {
    google: {
      families: ["Lato:400,700"] // Loads Lato font with weights 400 and 700
    }
  },

  /*
  ** purgeCSS
  */
  purgeCSS: {
    enabled: ({ isDev, isClient }) => false,

    whitelist: [
      "nuxt-link-active",
      "nuxt-link-exact-active",
      "header-anchor",
      "emoji",
      "table-of-contents"
    ],
    whitelistPatternsChildren: [
      /^blog-article/,
      /^section-(home|blog|projects|portfolio|resume)/,
      /^hljs/
    ]
  },

  /*
  ** nuxt-i18n
  */
  i18n: {
    defaultLocale: "en",
    locales: [
      { code: "en", iso: "en-GB", file: "en-GB.js", name: "English" },
      { code: "sv", iso: "sv-SE", file: "sv-SE.js", name: "Svenska" },
      { code: "de", iso: "de-DE", file: "de-DE.js", name: "Deutsch" }
    ],
    lazy: true,
    langDir: "language/",
    vueI18nLoader: true,
    strategy: "prefix_except_default",
    vueI18n: {
      fallbackLocale: "en"
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
        include: resolve(__dirname, "contents"),
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
        tailwindcss: resolve(__dirname, "./tailwind.config.js")

        // cssnano: {
        //   preset: "default",
        //   discardComments: { removeAll: true },
        //   zIndex: false
        // }
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

if (IS_DEV) {
  config.server = {
    // Vue CLI doesn't mind but Nuxt requires 0.0.0.0 instead of localhost. ¯\_(ツ)_/¯
    host: "0.0.0.0",
    port: 8001,
    https: {
      ca: readFileSync("/ca/devilbox-ca.srl"),
      key: readFileSync("/ca/devilbox-ca.key"),
      cert: readFileSync("/ca/devilbox-ca.crt")
    }
  };
}

export default config;
