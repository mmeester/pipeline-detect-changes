import fs from "fs";
import vm from "vm";
export var getProjectConfig = function(path) {
    var filePath;
    if (!path) {
        filePath = "./release.config.cjs";
    } else {
        filePath = "".concat(path, "/release.config.cjs");
    }
    var config = {
        releaseRules: []
    };
    var fileExists = fs.existsSync(filePath);
    if (fileExists) {
        var configFileContent = fs.readFileSync(filePath, "utf8");
        if (configFileContent) {
            // find all require statements and replace them with the content of the required file
            var requireRegex = /require\(['"](.*)['"]\)/g;
            var requireStatements = configFileContent.match(requireRegex);
            if (requireStatements) {
                requireStatements.forEach(function(requireStatement) {
                    if (!requireStatement) return;
                    var requireMatch = requireStatement.match(/require\(['"](.*)['"]\)/);
                    if (requireMatch && configFileContent) {
                        var requirePath = requireMatch[1];
                        var requireContent = fs.readFileSync(requirePath, "utf8");
                        configFileContent = configFileContent.replace(requireStatement, requireContent);
                    }
                });
            }
            // Create a sandbox object to capture the exports
            var sandbox = {
                module: {
                    exports: {}
                }
            };
            vm.createContext(sandbox);
            // Execute the script in the sandbox
            vm.runInContext(configFileContent, sandbox);
            var configExports = sandbox.module.exports.plugins.find(function(plugin) {
                return plugin[0] === "@semantic-release/commit-analyzer";
            });
            if (configExports[1].releaseRules) {
                config.releaseRules = configExports[1].releaseRules;
            }
        }
    }
    return config;
};
