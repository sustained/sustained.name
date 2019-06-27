import { highlight, getLanguage } from "highlight.js";

import markdownIt from "markdown-it";
import emojiIt from "markdown-it-emoji";
import taskIt from "markdown-it-task-lists";
import anchorIt from "markdown-it-anchor";
import tocIt from "markdown-it-toc-done-right";

import twemoji from "twemoji";

import { unescapeAll, escapeHtml } from "markdown-it/lib/common/utils";

const mdInstance = markdownIt({
  html: true,
  linkify: true,
  typographer: false,
  highlight: (str, lang) => {
    if (lang && getLanguage(lang)) {
      try {
        return `
          <code-block
            lang="${lang}"
            code="${mdInstance.utils.escapeHtml(str)}" />`;
      } catch (e) {
        console.error(e);
      }
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

mdInstance.renderer.rules.fence = function(tokens, idx, options, env, slf) {
  const token = tokens[idx];
  const info = token.info ? unescapeAll(token.info).trim() : "";
  let langName = "";
  let highlighted;

  if (info) {
    langName = info.split(/\s+/g)[0];
  }

  if (options.highlight) {
    highlighted =
      options.highlight(token.content, langName) || escapeHtml(token.content);
  } else {
    highlighted = escapeHtml(token.content);
  }

  return highlighted + "\n";
};

export default mdInstance;
