import { jest } from "@jest/globals";
import { posts } from "../../Database/DB.js";
import { getAllPosts, getPost } from "../../src/controllers/GET-controller.js";

describe("getPost", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = { params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should return a post when the ID exists", () => {
    // Arrange
    req.params.id = "2";
    const expectedResult = { id: 2, title: "post two" };
    const expectedStatus = 200;

    // Act
    getPost(req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(expectedStatus);
    expect(res.json).toHaveBeenCalledWith(expectedResult);
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next with an error when the post does not exist", () => {
    // Arrange
    req.params.id = "99";
    const numberOfErrors = 1;
    const expectedErrorMessage = "A post with the id of 99 was not found";
    const expectedStatus = 404;

    // Act
    getPost(req, res, next);

    // Assert
    expect(next).toHaveBeenCalledTimes(numberOfErrors);
    const errorArg = next.mock.calls[0][0]; // it is placed here instead of the "Arrange" section; because it should be defined after the "next" argument is executed.
    expect(errorArg).toBeInstanceOf(Error);
    expect(errorArg.message).toBe(expectedErrorMessage);
    expect(errorArg.status).toBe(expectedStatus);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("should handle invalid ID input gracefully (non-numeric)", () => {
    // Arrange
    req.params.id = "abc";
    const numberOfErrors = 1;
    const errorMessage = "A post with the id of NaN was not found";
    const errorStatus = 404;
    // Act
    getPost(req, res, next);

    //Assert
    // parseInt("abc") => NaN, so no match found
    expect(next).toHaveBeenCalledTimes(numberOfErrors);
    const errorArg = next.mock.calls[0][0]; // it is placed here instead of the "Arrange" section; because it should be defined after the "next" argument is executed.
    expect(errorArg.message).toBe(errorMessage);
    expect(errorArg.status).toBe(errorStatus);
  });

  it("should not mutate the posts array", () => {
    // Arrange
    req.params.id = "1";
    const expectedStatus = 200;
    const expectedResult = posts[0];

    // Act
    getPost(req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(expectedStatus);
    expect(res.json).toHaveBeenCalledWith(expectedResult);
  });
});

describe("getAllPosts", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = { query: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should return all posts when no limit is specified", () => {
    // Arrange
    const expectedStatus = 200;

    // Act
    getAllPosts(req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(expectedStatus);
    expect(res.json).toHaveBeenCalledWith(posts);
  });

  it("should return only the limited number of posts when a valid positive limit is given", () => {
    // Arrange
    req.query.limit = "2";
    const expectedStatus = 200;
    const expectedResult = posts.slice(0, 2);

    // Act
    getAllPosts(req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(expectedStatus);
    expect(res.json).toHaveBeenCalledWith(expectedResult);
  });

  it("should return all posts when the limit is not a number", () => {
    // Arrange
    req.query.limit = "abc";
    const numberOfErrors = 1;
    const expectedErrorMessage = `the request is invalid`;
    const expectedStatus = 400;

    // Act
    getAllPosts(req, res, next);

    // Assert
    // Assert
    expect(next).toHaveBeenCalledTimes(numberOfErrors);
    const errorArg = next.mock.calls[0][0];
    expect(errorArg).toBeInstanceOf(Error);
    expect(errorArg.message).toBe(expectedErrorMessage);
    expect(errorArg.status).toBe(expectedStatus);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("should return all posts when the limit is zero or negative", () => {
    // Arrange
    req.query.limit = "-1";
    const numberOfErrors = 1;
    const expectedErrorMessage = `the request is invalid`;
    const expectedStatus = 400;

    // Act
    getAllPosts(req, res, next);

    // Assert
    // Assert
    expect(next).toHaveBeenCalledTimes(numberOfErrors);
    const errorArg = next.mock.calls[0][0];
    expect(errorArg).toBeInstanceOf(Error);
    expect(errorArg.message).toBe(expectedErrorMessage);
    expect(errorArg.status).toBe(expectedStatus);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
