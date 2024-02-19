#! /usr/bin/env node
// @ts-ignore
import yargs from "yargs/yargs";

// @ts-ignore
import { fields, parse } from "git-log-parser";
// @ts-ignore
import { array } from "get-stream";
// @ts-ignore
import { analyzeCommits } from "@semantic-release/commit-analyzer";

interface Commit {
  commit: {
    long: string;
    short: string;
  };
  tree: {
    long: string;
    short: string;
  };
  author: {
    name: string;
    email: string;
    date: Date;
  };
  committer: {
    name: string;
    email: string;
    date: Date;
  };
  subject: string;
  body: string;
  hash: string;
  message: string;
  gitTags: string;
  committerDate: Date;
}

Object.assign(fields, {
  hash: "H",
  message: "B",
  gitTags: "d",
  committerDate: { key: "ci", type: Date },
});

const getCommits = async (
  from: string,
  to: string = "HEAD",
  paths: string[] = ["--", "../commerce"]
) => {
  if (from) {
    const result: Commit[] = await array(
      parse({
        _: [`${from ? from + ".." : ""}${to}`, ...paths],
      })
    );

    return result.map((commit: Commit) => {
      const { message, gitTags, ...rest } = commit;
      if (typeof message === "string" && typeof gitTags === "string") {
        return {
          ...rest,
          message: message.trim(),
          gitTags: gitTags.trim(),
        };
      } else {
        throw new Error("Invalid commit data");
      }
    });
  }

  return [];
};

const argv = yargs(process.argv.slice(2))
  .scriptName("pipeline-detect-changes")
  .usage("$0 <cmd> [args]")
  .command(
    "detect",
    "Detect changes",
    (yargs) => {
      yargs
        .option("from", {
          describe: "The commit hash to start from",
          type: "string",
        })
        .option("to", {
          describe: "The commit hash to end at",
          default: "HEAD",
          type: "string",
        })
        .option("path", {
          describe: "The path to search for changes",
          type: "string",
        });
    },
    async (argv) => {
      // @ts-ignore
      const paths: string[] = argv.path ? ["--", argv.path] : [];
      const { from, to } = argv;
      const commits = await getCommits(from as string, to as string, paths);
      const result = await analyzeCommits({}, { commits, logger: console });

      if (result === null) {
        return process.exit(0);
      }

      return process.exit(1);
    }
  )
  .parse();
