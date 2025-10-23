import { posts } from '../../Database/DB.js'

export const createPost = (req, res, next) => {
   const title = req.body.title

   if (!title) {
      const error = new Error(`Please include a title`)
      error.status = 400
      return next(error)
   } else {
      const newPost = { id: posts.length + 1, title: title }
      posts.push(newPost)
      res.status(201).json(posts)
   }
}
