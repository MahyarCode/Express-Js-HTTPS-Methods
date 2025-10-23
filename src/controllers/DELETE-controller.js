import { posts } from '../../Database/DB.js'

export const deletePost = (req, res, next) => {
   const id = req.params.id
   const thePost = posts.find((post) => post.id == id)

   if (!thePost) {
      const error = new Error(`A post with the id of ${id} was not found`)
      error.status = 404
      return next(error)
   } else {
      res.status(200).json(posts.filter((post) => post !== thePost))
   }
}
