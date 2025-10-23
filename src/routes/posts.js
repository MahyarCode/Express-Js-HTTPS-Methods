/*
To import package as EM6 ( not CommonJS ), you should add {"type": "module"} in package.json file.
then you can import your code as the following:
*/

import { log } from "console";
import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
} from "../controllers/postController.js";
import { posts } from "../../Database/DB.js";
import path from "path";
const router = express.Router();

// const express = require("express");
// const path = require("path");

//////////////////////////////////////////////////////////////////////////////////////////
// Get all posts + secure the query
// fot the complete code version => ./controllers/postController.js
router.get("/", getAllPosts);
/////////////////////////////////////////////////////////////////////////////////

// Get single post
// fot the complete code version => ./controllers/postController.js
router.get("/:id", getPost);

/////////////////////////////////////////////////////////////////////////////////
// Create new post
// fot the complete code version => ./controllers/postController.js
router.post("/", createPost);

/////////////////////////////////////////////////////////////////////////////////
// Update new post
// fot the complete code version => ./controllers/postController.js
router.put("/:id", updatePost);

/////////////////////////////////////////////////////////////////////////////////
// Delete post
// fot the complete code version => ./controllers/postController.js
router.delete("/:id", deletePost);

// exporting as "CommonJS"
// // module.exports = router;

// exporting as "EM6"
export default router;
