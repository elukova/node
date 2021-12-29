const fs = require("fs");
const lstatSync = require("fs");
const readline = require("readline");
const path = require("path");
const inquirer = require("inquirer");

// const executionDir = process.cwd();

inquirer
  .prompt([
    {
      name: "dirPath",
      type: "input",
      message: "Enter the path to the directory: ",
    },
  ])
  .then((dir) => {
    const dirPath = path.resolve(__dirname, dir.dirPath);
    // const isDirectory = (name) => fs.lstatSync(name).isDirectory();
    // subDirList = fs.readdirSync(dirPath).filter(isDirectory);
    inquirer
      .prompt([
        {
          name: "folder",
          type: "list",
          message: "Select a folder: ",
          choices: fs.readdirSync(dirPath),
        },
      ])
      .then((folder) => {
        const folderPath = path.join(dirPath, folder.folder);
        const isFile = (name) => fs.lstatSync(name).isFile();
        const fileList = fs.readdirSync(folderPath).filter(isFile);
        inquirer
          .prompt([
            {
              name: "fileName",
              type: "list",
              message: "Enter path to the file: ",
              choices: fileList,
            },
            {
              name: "searchString",
              type: "input",
              message: "Enter the search string: ",
            },
          ])
          .then((fileNstring) => {
            const fullPath = path.join(folderPath, fileNstring.fileName);
            const tailLength = fileNstring.searchString.length - 1;
            let lineTail = ``;
            const searchString = new RegExp(
              `${fileNstring.searchString}`,
              `ig`
            );
            let searchResult = [];
            const writeStream = fs.createWriteStream(`./result.txt`);
            const readStream = fs.createReadStream(fullPath, "utf8");
            const rl = readline.createInterface({
              input: readStream,
              terminal: true,
            });
            rl.on("line", (line) => {
              checkLine = lineTail + line;
              searchResult.push(Array.from(checkLine.matchAll(searchString)));
              writeStream.write(
                Array.from(checkLine.matchAll(searchString)) + "\n"
              );
              lineTail = line.slice(-tailLength);
            });
            console.log(searchResult);
          });
      });
  });
