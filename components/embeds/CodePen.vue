<template>
  <div>
    <no-ssr>
      <iframe
        height="265"
        style="width: 100%;"
        scrolling="no"
        title="ydVqEW"
        src="//codepen.io/sustained/embed/ydVqEW/?height=265&theme-id=dark&default-tab=css,result"
        frameborder="no"
        allowtransparency="true"
        allowfullscreen="true"
      >
        See the Pen
        <a href="https://codepen.io/sustained/pen/ydVqEW/">ydVqEW</a> by sustained
        (
        <a href="https://codepen.io/sustained">@sustained</a>) on
        <a href="https://codepen.io">CodePen</a>.
      </iframe>
      <!-- <p
        class="codepen"
        data-height="265"
        :data-theme-id="theme"
        :data-default-tab="tabList"
        :data-user="user"
        :data-slug-hash="id"
        :data-preview="preview"
        :data-pen-title="title"
      >
        <span>
          See the Pen <a :href="penURL">ydVqEW</a>

          by {{ user }} (<a :href="userURL">@{{ user }}</a>)

          on <a href="https://codepen.io">CodePen</a>.
        </span>
      </p>-->
    </no-ssr>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },

    title: {
      type: String,
      default: () => null
    },

    user: {
      type: String,
      default: () => "sustained"
    },

    tabs: {
      type: Array,
      default: () => ["js", "result"]
    },

    theme: {
      type: String,
      default: () => "dark",
      validator: prop => ["light", "dark"].includes(prop)
    },

    preview: {
      type: Boolean,
      default: () => false
    }
  },

  computed: {
    tabList() {
      return this.tabs.join(",");
    },

    codepenURL() {
      return "https://codepen.io/";
    },

    userURL() {
      return this.codepenURL + `${this.user}/`;
    },

    penURL() {
      return this.userURL + `pen/${this.id}/`;
    }
  },

  mounted() {
    // if ( ! this.title)
    //   this.title = this.id;

    if (!document.querySelector("script#codepen-embed")) {
      this.addEmbedCode();
    }
  },

  methods: {
    addEmbedCode() {
      const script = document.createElement("script");

      script.id = "codepen-embed";
      script.src = "https://static.codepen.io/assets/embed/ei.js";
      script.async = true;

      document.head.appendChild(script);
    }
  }
};
</script>

<style scoped>
.codepen {
  height: 265px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid;
  margin: 1em 0;
  padding: 1em;
}
</style>
