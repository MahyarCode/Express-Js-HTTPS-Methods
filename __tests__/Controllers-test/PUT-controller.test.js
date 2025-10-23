import { jest } from "@jest/globals";
import { posts } from "../../Database/DB.js";
import { updatePost } from "../../src/controllers/PUT-controller.js";

describe("updatePost", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should add post to the Posts and return all data", () => {
    // Arrange
    req.params.id = "2";
    req.body.title = "the second post is updated";
    let foundObject = posts.find((obj) => obj.id == 2);
    foundObject.title = req.body.title;
    const expectedResult = posts;
    const expectedStatus = 200;

    // Act
    updatePost(req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(expectedStatus);
    expect(res.json).toHaveBeenCalledWith(expectedResult);
  });

  it("should fail if the id does not exist", () => {
    // Arrange
    req.params.id = "5";
    const foundObject = undefined;
    const numberOfErrors = 1;
    const expectedErrorMessage = `A post with the id of 5 was not found`;
    const expectedStatus = 404;

    // Act
    updatePost(req, res, next);

    // Assert
    expect(next).toHaveBeenCalledTimes(numberOfErrors);
    const errorArg = next.mock.calls[0][0];
    expect(errorArg).toBeInstanceOf(Error);
    expect(errorArg.message).toBe(expectedErrorMessage);
    expect(errorArg.status).toBe(expectedStatus);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("should fail if the no title exists", () => {
    // Arrange
    req.params.id = "3";
    req.body.title = null;
    const numberOfErrors = 1;
    const expectedErrorMessage = `please add title`;
    const expectedStatus = 400;

    // Act
    updatePost(req, res, next);

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
