/* eslint-disable import/no-extraneous-dependencies */
import fs from "fs";
import Mustache from "mustache";
import inquirer from "inquirer";
/* eslint-enable import/no-extraneous-dependencies */

const getAllPackagesName = () => {
  return fs.readdirSync("modules");
};

const getAllPackagesVersions = () => {
  const modules = getAllPackagesName();
  // eslint-disable-next-line
  const packages = {} as any;
  modules.forEach((packageName: string) => {
    if (fs.existsSync(`modules/${packageName}/package.json`)) {
      const packageJson = fs.readFileSync(
        `modules/${packageName}/package.json`
      );
      packages[packageName] = JSON.parse(packageJson.toString()).version;
    }
  });
  return packages;
};

const checkDependencyVersion = (packageName = "", dependencyName = "") => {
  const packageJson = fs
    .readFileSync(`${packageName && `modules/${packageName}/`}package.json`)
    .toString();
  return JSON.parse(packageJson).dependencies[dependencyName];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const processFiles = (values: any) => (fromPath: any) => {
  const to = fromPath
    .replace(".scaffold", "")
    .replace("pckName", values.packageNameCap);
  const fileFrom = fs.readFileSync(`./scaffold/${fromPath}`).toString();
  const finalFrom = Mustache.render(fileFrom, values);
  fs.writeFileSync(`modules/${values.packageName}/${to}`, finalFrom);
};

const ui = new inquirer.ui.BottomBar();

ui.log.write("-------------------------------");
ui.log.write("");
ui.log.write(">>>   New package creator   <<<");
ui.log.write("");

inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: "What's the package name? (don't add the @diana-ui)"
    },
    {
      type: "checkbox",
      name: "dianaPackagesInclude",
      default: ["types"],
      choices: getAllPackagesName(),
      message: "Which @diana-ui packages do you want to include ?"
    }
  ])
  .then(({ name, dianaPackagesInclude }) => {
    const packageName = name.toLowerCase();

    const allModulesVersions = getAllPackagesVersions();

    const values = {
      packageName,
      packageNameCap:
        packageName.charAt(0).toUpperCase() + packageName.slice(1),
      reactVersion: checkDependencyVersion("", "react"),
      ...allModulesVersions,
      dianaPackages: dianaPackagesInclude.map((moduleName: string) => ({
        name: `@diana-ui/${moduleName}`,
        version: allModulesVersions[moduleName]
      }))
    };
    const processScaffoldFiles = processFiles(values);

    const files = fs.readdirSync("./scaffold");

    fs.mkdirSync(`modules/${packageName}`, { recursive: true });

    files.forEach((value: string) => {
      processScaffoldFiles(value);
    });
  });
