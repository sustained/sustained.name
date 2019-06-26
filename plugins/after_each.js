export default ({ app }) => {
  app.router.afterEach((to, from) => {
    const section = to.path.substr(1).split("/")[0] || "home";
    app.store.commit("app/setSection", section);
  });
};
