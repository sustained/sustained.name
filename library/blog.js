import { join, resolve } from "path";
import { readdirSync, readFileSync, existsSync, readFile } from "fs";
import matter from "gray-matter";

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

function toTitle(string) {
  return string
    .replace(/-/g, " ")
    .split(" ")
    .map(word => word.substr(0, 1).toUpperCase() + word.substr(1))
    .join(" ");
}

function toSlug(string) {
  return string
    .toLowerCase()
    .replace(/[^\w]+/g, "-")
    .replace(/-$/, "")
    .replace(/[-]{2,}/g, "-");
}

function loadFrontMatter(path, defaultValue = {}) {
  path = join(BLOG_CONTENTS_PATH, path);

  if (existsSync(path)) {
    const fileContents = readFileSync(path);
    return matter(fileContents).data;
  }

  return defaultValue;
}

function extractTags(tags, article) {
  if (!Array.isArray(tags)) {
    return;
  }

  tags.forEach(tagName => {
    const existingTag = tagList.find(tag => tag.name === tagName);

    if (existingTag) {
      existingTag.articles.push(article);
      existingTag.articleCount++;
    } else {
      tagList.push({
        path: `/blog/tags/${tagName}`,
        slug: toSlug(tagName),
        name: tagName,
        articles: [article],
        articleCount: 1
      });
    }
  });
}

function createCategory(categoryDirName) {
  const metadata = loadFrontMatter(resolve(categoryDirName, "_meta.md"));

  const slug = metadata.slug ? metadata.slug : toSlug(categoryDirName);

  const name = metadata.name ? metadata.name : toTitle(categoryDirName);

  return {
    name,
    slug,
    path: `/blog/${slug}`,
    articles: [],
    articleCount: 0
  };
}

function createArticle(categoryDirName, articleFileName, categorySlug) {
  const metadata = loadFrontMatter(join(categoryDirName, articleFileName));
  const cleanFileName = articleFileName.replace(/.md$/, "");

  let slug = categorySlug + "/";
  slug += metadata.slug ? metadata.slug : toSlug(cleanFileName);

  const tags = metadata.tags ? metadata.tags : [];
  const title = metadata.title ? metadata.title : toTitle(cleanFileName);
  const excerpt = metadata.excerpt ? metadata.excerpt : "No excerpt available.";

  const article = {
    title,
    excerpt,
    categorySlug,
    slug: `${slug}`,
    path: `/blog/${slug}`
  };

  if (tags.length) {
    extractTags(tags, article);
  }

  article.tags = tags;

  return article;
}

readdirSync(BLOG_CONTENTS_PATH).forEach(categoryDirName => {
  const category = createCategory(categoryDirName);
  const articles = readdirSync(resolve(BLOG_CONTENTS_PATH, categoryDirName));

  articles.forEach(articleFileName => {
    if (articleFileName !== "_meta.md") {
      const article = createArticle(
        categoryDirName,
        articleFileName,
        category.slug
      );

      articleList.push(article);

      category.articles.push(article);
      category.articleCount++;
    }
  });

  categoryList.push(category);
});

export const tags = tagList;

export const articles = articleList;

export const categories = categoryList;
