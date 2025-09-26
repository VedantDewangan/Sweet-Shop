import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  afterEach,
  beforeEach,
} from "@jest/globals";
import request from "supertest";
import app from "../server.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { User } from "../database/model/UserModel.js";

let mongoServer;

jest.setTimeout(60000);

//-- SETUP --//
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany({});
});

//-- TEST SUITES --//

describe("POST /api/auth/register", () => {
  it("✅ should register a new user successfully and return 201", async () => {
    const newUser = {
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    };
    const response = await request(app)
      .post("/api/auth/register")
      .send(newUser);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("Your Account is created Successfully");
    expect(response.body.user).toHaveProperty("email", newUser.email);
  });

  it("❌ should return 400 if email already exists", async () => {
    const existingUser = {
      name: "Existing User",
      email: "exists@example.com",
      password: "password123",
    };
    await User.create(existingUser);

    const response = await request(app)
      .post("/api/auth/register")
      .send(existingUser);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("This email already exist");
  });

  it("❌ should return 404 if required fields are missing", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({ name: "Test" });

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Please fill all the credentials");
  });

  it("❌ should return 400 if password is less than 8 characters", async () => {
    const newUser = {
      name: "Test User",
      email: "shortpass@example.com",
      password: "123",
    };
    const response = await request(app)
      .post("/api/auth/register")
      .send(newUser);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Password length atleast 8 characters");
  });

  it("❌ should return 400 for an invalid email format", async () => {
    const newUser = {
      name: "Test User",
      email: "invalid-email",
      password: "password123",
    };
    const response = await request(app)
      .post("/api/auth/register")
      .send(newUser);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Invalid email format");
  });
});

describe("POST /api/auth/login", () => {
  const userCredentials = {
    name: "Login User",
    email: "login@example.com",
    password: "password123",
  };

  beforeEach(async () => {
    // Register a user before each login test
    await request(app).post("/api/auth/register").send(userCredentials);
  });

  it("✅ should login an existing user successfully and set a cookie", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: userCredentials.email,
      password: userCredentials.password,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Login successful");
    expect(response.headers["set-cookie"]).toBeDefined();
    expect(response.headers["set-cookie"][0]).toContain("token=");
  });

  it("❌ should return 404 if user with email not found", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "nouser@example.com",
      password: "password123",
    });

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("User with this email not found");
  });

  it("❌ should return 401 for incorrect password", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: userCredentials.email,
      password: "wrongpassword",
    });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Incorrect password");
  });

  it("❌ should return 400 if email or password is not provided", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: userCredentials.email });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(
      "Please provide both email and password"
    );
  });
});
