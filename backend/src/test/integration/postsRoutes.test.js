import request from "supertest";
import app from "../../app.js";
import mongoose from "mongoose";

describe("Integration Test - POST /posts", () => {
    beforeAll(async () => {
  await mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
});
  it("should return 401 if no token is provided", async () => {
    const res = await request(app).post("/posts").send({
      title: "Unauthorized post",
      content: "Should not work without token",
    });

    expect(res.statusCode).toBe(401);
  });
  
afterAll(async () => {
  await mongoose.connection.close();
});
});
