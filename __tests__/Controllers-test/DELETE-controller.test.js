import { jest } from "@jest/globals";
import { posts } from "../../Database/DB.js";
import { deletePost } from "../../src/controllers/DELETE-controller.js";

describe("deletePost", () => {
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

  it("should delete a post", () => {
    // Arrange
    req.params.id = "2";
    const expectedResult = posts.filter((post) => post.id != req.params.id);
    const expectedStatus = 200;

    // Act
    deletePost(req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(expectedStatus);
    expect(res.json).toHaveBeenCalledWith(expectedResult);
  });

  it("should fail if the post does not exist", () => {
    // Arrange
    req.params.id = "5";
    const numberOfErrors = 1;
    const expectedErrorMessage = `A post with the id of 5 was not found`;
    const expectedStatus = 404;

    // Act
    deletePost(req, res, next);

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
