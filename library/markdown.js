import { highlight, getLanguage } from "highlight.js";

import markdownIt from "markdown-it";
import emojiIt from "markdown-it-emoji";
import taskIt from "markdown-it-task-lists";
import anchorIt from "markdown-it-anchor";
import tocIt from "markdown-it-toc-done-right";

import twemoji from "twemoji";

const mdInstance = markdownIt({
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

mdInstance
  .use(emojiIt)
  .use(taskIt, { label: true })
  .use(anchorIt, {
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: "§"
  })
  .use(tocIt);

mdInstance.renderer.rules.emoji = function(token, idx) {
  return twemoji.parse(token[idx].content);
};

export default mdInstance;
