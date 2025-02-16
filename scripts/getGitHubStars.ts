import { exec } from "child_process";
import fs from "fs";
import yaml from "js-yaml";

const PROJECTS_PATH = "./public/data/yaml/projects.yaml";

const getGitHubStars = (repo: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    let command: string;

    if (process.env.SHELL) {
      // bash
      // https://gist.github.com/jasonrudolph/6057563?permalink_comment_id=4150026#gistcomment-4150026
      command = `curl -s https://api.github.com/repos/${repo} | grep stargazers_count | cut -d : -f 2 | tr -d " " | tr -d ","`;
    } else if (process.env.ComSpec || process.env.PSModulePath) {
      // cmd
      command = `curl -s https://api.github.com/repos/${repo} | findstr "stargazers_count" | for /f "tokens=2 delims=:" %A in ('findstr "stargazers_count"') do @echo %A`;
    } else {
      return reject(new Error("Unknown shell environment"));
    }

    exec(command, (err, stdout) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(parseInt(stdout.trim().replace(",", "")));
    });
  });
};

const updateProjectsYaml = async () => {
  const projectsYaml = fs.readFileSync(PROJECTS_PATH, "utf8");
  const projects = yaml.load(projectsYaml) as any[];

  for (const project of projects) {
    if (project.links?.github) {
      const repoPath = project.links.github.split("/").slice(-2).join("/");
      console.log(`Fetching stars for ${project.name} (${repoPath})`);
      try {
        const oldStars = project.githubStats.stars;
        project.githubStats.stars = await getGitHubStars(repoPath);
        if (project.githubStats.stars !== oldStars) {
          console.log(
            `Updated stars for ${project.name}: ${oldStars} -> ${project.githubStats.stars}`
          );
        }
      } catch (error) {
        console.error(`Failed to get stars for ${project.name}:`, error);
      }
    }
  }

  const updatedYaml = yaml.dump(projects, { quotingType: '"' });
  fs.writeFileSync(PROJECTS_PATH, updatedYaml, "utf8");
  console.log("Updated projects.yaml successfully!");
};

updateProjectsYaml().catch(console.error);
