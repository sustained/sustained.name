import { highlight, getLanguage } from "highlight.js";
import markdownIt from "markdown-it";

export default markdownIt({
  html: true,
  linkify: true,
  typographer: false,
  highlight: (str, lang) => {
    if (lang && getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          highlight(lang, str, true).value +
          "</code></pre>"
        );
      } catch (__) {}
    }

    return "";
  }
});
