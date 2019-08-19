import { resolve } from "path";
import { getDirectory } from "../library/file-utils";

export default async ({ app, store }) => {
  const projects = {};
  const projectNames = await getDirectory(
    resolve(process.cwd(), "contents/projects")
  );

  for (const projectName of projectNames) {
    try {
      const {
        default: project
      } = await import(`~/contents/projects/${projectName}/project.yaml`);

      projects[projectName] = project;
    } catch (e) {
      projects[projectName] = {
        __error: e.message
      };
      console.error(
        "Unable to load project YAML file for project " + projectName
      );
    }
  }

  store.commit("app/setProjects", projects);
};
