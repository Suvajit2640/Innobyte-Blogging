import { createPost } from "../../controllers/createPost.js";
import { jest } from '@jest/globals';
describe("Unit Test - Create Post Controller", () => {
  it("should throw error if no title is provided", async () => {
    const req = {
      userId: "testUser",
      body: { content: "Only content, no title" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await createPost(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
