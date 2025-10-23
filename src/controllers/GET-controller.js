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

export const getPost = () => {}
