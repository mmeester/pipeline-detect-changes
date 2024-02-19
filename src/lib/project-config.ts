import fs from "fs";
import vm from "vm";

import { ProjectConfig } from "../types/config.js";

export const getProjectConfig = (path?: string): ProjectConfig => {
  let filePath: string;
  if (!path) {
    filePath = "./release.config.cjs";
  } else {
    filePath = `${path}/release.config.cjs`;
  }

  const config = { releaseRules: [] };

  const fileExists = fs.existsSync(filePath);

  if (fileExists) {
    let configFileContent: string | undefined = fs.readFileSync(
      filePath,
      "utf8"
    );
    if (configFileContent) {
      // find all require statements and replace them with the content of the required file
      const requireRegex = /require\(['"](.*)['"]\)/g;

      const requireStatements = configFileContent.match(requireRegex);
      if (requireStatements) {
        requireStatements.forEach((requireStatement) => {
          if (!requireStatement) return;

          const requireMatch = requireStatement.match(
            /require\(['"](.*)['"]\)/
          );

          if (requireMatch && configFileContent) {
            const requirePath = requireMatch[1];
            const requireContent = fs.readFileSync(requirePath, "utf8");

            configFileContent = configFileContent.replace(
              requireStatement,
              requireContent
            );
          }
        });
      }

      // Create a sandbox object to capture the exports
      const sandbox: { module: { exports?: any } } = { module: { exports: {} } };
      vm.createContext(sandbox);

      // Execute the script in the sandbox
      vm.runInContext(configFileContent, sandbox);

      const configExports = sandbox.module.exports.plugins.find(
        (plugin: any) => plugin[0] === "@semantic-release/commit-analyzer"
      );

      if (configExports[1].releaseRules) {
        config.releaseRules = configExports[1].releaseRules;
      }
    }
  }
  return config;
};
