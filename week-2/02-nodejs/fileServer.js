/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module
  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files
  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt
    - For any other route not defined in the server return 404
    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
let filePath = path.join(__dirname, "files");
const PORT = 3000;
app.get("/files", (req, res) => {
  fs.readdir(filePath, (err, files) => {
    if (files) {
      console.log(files);
      res.status(200).json({ files });
    }
    if (err.code === "ENOENT") {
      res.status(404).send("No file Found!");
    }
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error!");
    }
  });
});
app.get("/file/:filename", (req, res) => {
  let filePath = path.join(__dirname, "files", req.params.filename);
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (data) {
      console.log(data);
      res.status(200).send(data);
    }
    if (err.code == "ENOENT") {
      console.log(err);
      res.status(404).send("File Not found!");
    } else {
      console.log(error);
      res.status(500).send("Internal Server Error!");
    }
  });
});

app.listen(PORT, () => {
  console.log(`server has started and is listening at Port ${PORT}`);
});
module.exports = app;
