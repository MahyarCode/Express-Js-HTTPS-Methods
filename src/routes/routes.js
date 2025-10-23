/*
To import package as EM6 ( not CommonJS ), you should add {"type": "module"} in package.json file.
then you can import your code as the following:
*/

import express from "express";
import { getAllPosts, getPost } from "../controllers/GET-controller.js";
import { createPost } from "../controllers/POST-controller.js";
import { updatePost } from "../controllers/PUT-controller.js";
import { deletePost } from "../controllers/DELETE-controller.js";

const router = express.Router();

router.get("/", getAllPosts);

router.get("/:id", getPost);

router.post("/", createPost);

router.put("/:id", updatePost);

router.delete("/:id", deletePost);

export default router;
