/* eslint-disable */
/// <reference path="custom.d.ts" />
import fs from "fs";
import { exec } from "child_process";
/* eslint-disable import/no-extraneous-dependencies */
// import sgf from "staged-git-files";
import Mustache from "mustache";
import * as Template from "./aux/iconScriptTemplates";

const REG_EX_ICON_FILE = new RegExp(/\.svg$/);

const assetsIndexFile = "modules/assets/index.ts";
const tokensIconsDefaultFile = "modules/tokens/icons/icons.default.ts";

// interface SGFFiles {
//   filename: string;
//   status: "Added" | "Modified" | "Renamed";
// }

const removeExtension = (input: string) => /(.*(?=\.svg))/.exec(input) || [];

const camelToKebab = (input: string) => {
  return input.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
};

const kebabToCamel = (input: string, upperFirstLetter = true) => {
  const [inputWithoutExtenstion] = removeExtension(input);
  let [firstLetter, ...rest] = inputWithoutExtenstion
    .replace(/-([a-z])/g, function(g) {
      return g[1].toUpperCase();
    })
    .split("");
  if (upperFirstLetter) {
    firstLetter = firstLetter.toUpperCase();
  }

  return `${firstLetter}${rest.join("")}`;
};

// const shouldRunScript = async () => {
//   const stagedFiles: SGFFiles[] = await sgf();

//   return stagedFiles.some(value => REG_EX_ICON_FILE.test(value.filename));
// };

const getIcons = () => {
  const icons = fs.readdirSync("modules/assets/icons");

  return icons.map(value => ({
    original: value,
    kebabCase: removeExtension(value.toLowerCase())[0],
    camelCase: kebabToCamel(value)
  }));
};

const writeFileWithValue = (values: any) => (
  filePath: string,
  template: string
) => {
  const fileContent = Mustache.render(template, values);
  fs.writeFileSync(filePath, fileContent);
};

const actualScript = async () => {
  // if (!(await shouldRunScript())) {
  //   process.exit(0);
  // }

  const writeFile = writeFileWithValue({ icons: getIcons() });
  writeFile(assetsIndexFile, Template.assetsIndex);
  writeFile(tokensIconsDefaultFile, Template.tokensIconsDefault);

  setTimeout(() => {
    exec(
      `npx prettier ${assetsIndexFile} ${tokensIconsDefaultFile} --write`,
      (err, stdout, stderr) => {
        if (err) {
          console.log(err);
          process.exit(1);
        }
        console.log(stdout);
        exec("cd modules/assets && yarn prepare", (err, stdout, stderr) => {
          if (err) {
            console.log(err);
            process.exit(1);
          }
          console.log(stdout);
        });
      }
    );
  }, 2000);
};

actualScript();
