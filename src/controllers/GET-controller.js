import { posts } from '../../Database/DB.js'

export const getAllPosts = (req, res, next) => {
   const limit = req.query.limit

   if (!limit) res.status(200).json(posts)

   if (!isNaN(limit) && limit > 0) {
      res.status(200).json(posts.slice(0, limit))
   } else {
      if (isNaN(limit) || limit < 1) {
         const error = new Error('the request is invalid')
         error.status = 400
         return next(error)
      }
   }
}

export const getPost = (req, res, next) => {
   const id = req.params.id
   const thePost = posts.find((post) => post.id == id)

   if (!thePost || isNaN(id)) {
      const error = new Error(
         `A post with the id of ${isNaN(id) ? 'NaN' : id} was not found`
      )
      error.status = 404
      return next(error)
   } else {
      res.status(200).json(thePost)
   }
}
