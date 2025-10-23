import { posts } from '../../Database/DB.js'

export const updatePost = (req, res, next) => {
   const id = req.params.id
   const title = req.body.title
   const thePost = posts.find((post) => post.id == id)

   if (!thePost) {
      const error = new Error(`A post with the id of ${id} was not found`)
      error.status = 404
      return next(error)
   } else if (!title) {
      const error = new Error(`please add title`)
      error.status = 400
      return next(error)
   } else {
      thePost.title = title
      res.status(200).json(posts)
   }
}
