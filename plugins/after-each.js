export default ({ app }) => {
  app.router.afterEach((to, from) => {
    document.querySelector("body").classList.remove("no-js");
  });
};
