import { resolve } from "path";
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
// import markdown from "markdown-it";

// const md = markdown({ html: true });

const BLOG_CONTENTS_PATH = resolve(
  __dirname,
  "..",
  "contents",
  "blog",
  "posts"
);

const tagList = [];
const articleList = [];
const categoryList = [];

function extractTags(tags, article) {
  tags.forEach(tagName => {
    const existingTag = tagList.find(tag => tag.name === tagName);

    if (existingTag) {
      existingTag.articleCount++;
      existingTag.articles.push(article);
    } else {
      tagList.push({
        path: `/blog/tags/${tagName}`,
        name: tagName,
        articles: [article],
        articleCount: 1
      });
    }
  });
}

readdirSync(BLOG_CONTENTS_PATH).forEach(categoryName => {
  categoryList.push({
    name: categoryName,
    path: `/blog/${categoryName}`,
    articles: []
  });

  const articles = readdirSync(resolve(BLOG_CONTENTS_PATH, categoryName));

  articles.forEach(articleName => {
    const fileContents = readFileSync(
      resolve(BLOG_CONTENTS_PATH, categoryName, articleName),
      "utf8"
    );

    articleList.push({
      path: `/blog/${categoryName}/${articleName.replace(/.md$/, "")}`
    });

    const frontMatter = matter(fileContents);

    if (Array.isArray(frontMatter.data.tags)) {
      console.log("extracting tags");
      console.log(
        extractTags(frontMatter.data.tags, articleName.replace(/.md$/, ""))
      );
    } else {
      console.log("no tags");
    }
  });
});

export const tags = tagList;

export const articles = articleList;

export const categories = categoryList;
