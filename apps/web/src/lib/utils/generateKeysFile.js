/* eslint-disable @typescript-eslint/no-var-requires */
const en = require("../../../messages/en.json");
const path = require("path");
const fs = require("fs");

const rootKeys = Object.keys(en);

const rootObjectsKeys = rootKeys.map((key) => {
  return `export const ${key}Keys = [${Object.keys(en[key])
    .map((k) => `"${k}"`)
    .join(",")}] as const;
export type ${key}Translations = Record<typeof ${key}Keys[number],string>`;
});

const fileContent = rootObjectsKeys.join("\n");

const fileName = "messagesKeys.ts";

const absolutePath = path.resolve(__dirname, `../../../messages/${fileName}`);

fs.writeFile(absolutePath, fileContent, (err) => {
  if (err) console.error(err);
  else {
    console.log("File written successfully\n");
  }
});
