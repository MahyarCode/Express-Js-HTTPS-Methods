/*
To import package as EM6 ( not CommonJS ), you should add {"type": "module"} in package.json file.
then you can import your code as the following:
*/

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import posts from "./src/routes/posts.js";
import logger from "./src/middleware/logger.js";
import errorHandler from "./src/middleware/error.js";
import notFound from "./src/middleware/notFound.js";
// import { posts } from "../../Database/DB.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("*************************************");
console.log(__filename);
console.log(__dirname);
console.log("*************************************");

// const express = require("express");
// const posts = require("./routes/posts.js");
// const path = require("path")

const port = process.env.PORT || 8000;

const app = express();

// for POST request
// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger Middleware
app.use(logger);

// setup static folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/posts", posts);

// Error Handler // it must be written after "Routes", because it doesn't work if you write before it
app.use(errorHandler);
app.use(notFound);

app.listen(port, () => console.log(`Server is running on port ${port}`));
