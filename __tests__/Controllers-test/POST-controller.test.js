import { jest } from '@jest/globals'
import { posts } from '../../Database/DB.js'
import { createPost } from '../../src/controllers/POST-controller.js'

describe('createPost', () => {
   let req
   let res
   let next

   beforeEach(() => {
      req = { body: {} }
      res = {
         status: jest.fn().mockReturnThis(),
         json: jest.fn(),
      }
      next = jest.fn()
   })

   it('should add post to the Posts and return all data', () => {
      // Arrange
      req.body.title = 'Mock Request'
      const mockRequest = { id: posts.length + 1, title: req.body.title }
      const expectedStatus = 201
      // const result = posts.push(mockRequest);
      // const expectedResult = result;
      const expectedResult = [...posts, mockRequest]

      // Act
      createPost(req, res, next)

      // Assert
      expect(res.status).toHaveBeenCalledWith(expectedStatus)
      expect(res.json).toHaveBeenCalledWith(expectedResult)
   })

   it('should fail when no title is defined', () => {
      // Arrange
      req.body.title = null
      const mockRequest = { id: posts.length + 1, title: req.body.title }
      const numberOfErrors = 1
      const expectedErrorMessage = `Please include a title`
      const expectedStatus = 400

      // Act
      createPost(req, res, next)

      // Assert
      expect(next).toHaveBeenCalledTimes(numberOfErrors)
      const errorArg = next.mock.calls[0][0]
      expect(errorArg).toBeInstanceOf(Error)
      expect(errorArg.message).toBe(expectedErrorMessage)
      expect(errorArg.status).toBe(expectedStatus)
      expect(res.status).not.toHaveBeenCalled()
      expect(res.json).not.toHaveBeenCalled()
   })
})
