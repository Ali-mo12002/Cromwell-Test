const request = require("supertest");
const app = require("./server"); 
const mongoose = require("mongoose");
require("dotenv").config();
const User = require('./server/models/User');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await User.deleteMany({}); 
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("POST /user/register", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/user/register").send({
      name: "Test User",
      email: "1234256@example.com",
      password: "test1234",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User registered successfully");
  });

  it("should return error for duplicate email", async () => {
    await request(app).post("/user/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "test1234",
    });
    const res = await request(app).post("/user/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "test1234",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("authentication / submission has failed");
  });
});

describe("POST /user/login", () => {
  it("should login a registered user", async () => {
    const res = await request(app).post("/user/login").send({
      email: "test@example.com",
      password: "test1234",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it("should return error for invalid credentials", async () => {
    const res = await request(app).post("/user/login").send({
      email: "wrong@example.com",
      password: "wrongpassword",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("authentication / submission has failed");
  });
});

describe("GET /user/profile", () => {
  it("should fetch user details with valid token", async () => {
    const loginRes = await request(app).post("/user/login").send({
      email: "test@example.com",
      password: "test1234",
    });
    
    const res = await request(app)
      .get("/user/profile")
      .set("Authorization", loginRes.body.token);

    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe("test@example.com");
  });

  it("should return error for missing token", async () => {
    const res = await request(app).get("/user/profile");
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Access denied");
  });
});
