/*
  NOTE: Neither categories nor articles define their own paths, the paths
  are created dynamically in the Vuex store based on the names/titles.

  NOTE: Tags are created dynamically based on the tags articles define.
*/

/*
  Presumably categories will map with interests e.g. programming, gaming,
  reading etc. whereas tags will be more fine-grained e.g. (programming)
  languages, (gaming) genres, (book) authors, ...
*/
export const categories = [
  { name: "Miscellaneous" },
  { name: "Music Composition" },
  { name: "Programming" },
  { name: "Games" },
  { name: "Books" },
  { name: "Shows & Films" },
  { name: "Language Learning" }
];

export const articles = [
  {
    title: "Hello Blog World!",
    category: "miscellaneous",
    tags: ["test", "ing"]
  }
];

export function normalise(title) {
  return title
    .toLowerCase()
    .replace(/[^\w]+/g, "-")
    .replace(/-$/, "")
    .replace(/--/g, "");
}
