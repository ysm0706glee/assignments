// # Self Assignment #2 - Node File System

// > Write a `Node.js` `tree` application to list files and folders for the given path on file system.
// > The application should take an argument to directory to analyze and `--depth, -d` flag with directories depth number.
// > The result is a tree structured data output similar to **Tree Function** exercise. Try to reuse code from previous course exercise.
// > File system calls should be asyncronous.
// > F.e. when a script is called with `./node` as an argument, output can be

// ```bash
// tree ./node -d 2
// node
// ├── cluster
// │   └── index.js
// ├── domain
// │   ├── error.js
// │   ├── flow.js
// │   └── run.js
// ├── errors
// │   ├── counter.js
// │   └── try-catch.js
// └── worker
//     └── index.js

// 4 directories, 7 files
// ```

const path = require("path");
const fs = require("fs");
const tree = require("./assignment1.js");

const listFiles = (dir) => {
  const result = {};

  fs.readdir(path.join(__dirname, dir), (err, files) => {
    if (err) {
    } else if (files.length) {
      console.log("files: ", files);
      files.forEach((file) => {
        console.log("file: ", file);
        listFiles(file);
      });
    }
  });
};

listFiles("../takuma");
