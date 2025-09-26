import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  afterEach,
  beforeEach,
  jest,
} from "@jest/globals";
import request from "supertest";
import app from "../server.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { Sweet } from "../database/model/SweetModel.js";
import { User } from "../database/model/UserModel.js";

let mongoServer;
let agent; // Agent will handle cookies automatically

// Increase timeout for async db operations
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

// Create an authenticated agent before each test in this file
beforeEach(async () => {
  agent = request.agent(app);
  await agent.post("/api/auth/register").send({
    name: "SweetTester",
    email: "sweet@tester.com",
    password: "password123",
  });
  await agent.post("/api/auth/login").send({
    email: "sweet@tester.com",
    password: "password123",
  });
});

afterEach(async () => {
  await Sweet.deleteMany({});
  await User.deleteMany({});
});

//-- TEST SUITES --//

describe("Sweet API Endpoints", () => {
  const sweetData = {
    name: "Kaju Katli",
    description: "A classic diamond-shaped sweet made from cashews.",
    price: 850,
    image_link: "image.url/kaju.jpg",
    quantity: 50,
    category: "Classic Indian",
  };

  describe("POST /api/sweets", () => {
    it("✅ should create a new sweet successfully", async () => {
      const response = await agent.post("/api/sweets").send(sweetData);

      expect(response.statusCode).toBe(201);
      expect(response.body.message).toBe("Sweet added Successfully");
      expect(response.body.sweet_detail.name).toBe("Kaju Katli");
    });

    it("❌ should return 400 if the sweet already exists", async () => {
      await Sweet.create(sweetData); // Create the sweet first
      const response = await agent.post("/api/sweets").send(sweetData); // Try to create it again

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe("This Sweet already exist");
    });

    it("❌ should return 404 if required fields are missing", async () => {
      const { name, ...incompleteData } = sweetData; // Remove 'name' field
      const response = await agent.post("/api/sweets").send(incompleteData);

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe("Please fill all the details");
    });
  });

  describe("GET /api/sweets", () => {
    it("✅ should get a list of all sweets", async () => {
      await Sweet.create(sweetData);
      const response = await agent.get("/api/sweets");

      expect(response.statusCode).toBe(201); // Controller uses 201, though 200 is standard
      expect(response.body.all_sweet.length).toBe(1);
      expect(response.body.all_sweet[0].name).toBe("Kaju Katli");
    });
  });

  describe("GET /api/sweets/:search", () => {
    it("✅ should return sweets matching the search query", async () => {
      await Sweet.create(sweetData);
      const response = await agent.get("/api/sweets/Kaju");

      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].name).toBe("Kaju Katli");
    });

    it("❌ should return 404 if no sweets match the search query", async () => {
      const response = await agent.get("/api/sweets/NonExistent");
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual([]);
    });
  });

  describe("PUT /api/sweets/:id", () => {
    it("✅ should update an existing sweet successfully", async () => {
      const sweet = await Sweet.create(sweetData);
      const updatedData = { ...sweetData, price: 900, quantity: 45 };

      const response = await agent
        .put(`/api/sweets/${sweet._id}`)
        .send(updatedData);

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("Sweet updated successfully");

      const updatedSweet = await Sweet.findById(sweet._id);
      expect(updatedSweet.price).toBe(900);
      expect(updatedSweet.quantity).toBe(45);
    });
  });

  describe("DELETE /api/sweets/:id", () => {
    it("✅ should delete a sweet successfully", async () => {
      const sweet = await Sweet.create(sweetData);
      const response = await agent.delete(`/api/sweets/${sweet._id}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("Sweet deleted successfully");

      const deletedSweet = await Sweet.findById(sweet._id);
      expect(deletedSweet).toBeNull();
    });

    it("❌ should return 404 if sweet to delete is not found", async () => {
      const invalidId = new mongoose.Types.ObjectId();
      const response = await agent.delete(`/api/sweets/${invalidId}`);

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe("Sweet not found");
    });
  });

  describe("POST /api/sweets/:id/purchase", () => {
    it("✅ should decrement a sweet's quantity on purchase", async () => {
      const sweet = await Sweet.create(sweetData); // quantity is 50
      const response = await agent.post(`/api/sweets/${sweet._id}/purchase`);

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("Purchase successfully");

      const purchasedSweet = await Sweet.findById(sweet._id);
      expect(purchasedSweet.quantity).toBe(49);
    });

    it("❌ should return 400 if sweet is out of stock", async () => {
      const outOfStockSweet = { ...sweetData, quantity: 0 };
      const sweet = await Sweet.create(outOfStockSweet);

      const response = await agent.post(`/api/sweets/${sweet._id}/purchase`);
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe("Not in stock");
    });
  });

  describe("POST /api/sweets/:id/restock", () => {
    it("✅ should update a sweet's quantity on restock", async () => {
      const sweet = await Sweet.create(sweetData);
      const response = await agent
        .post(`/api/sweets/${sweet._id}/restock`)
        .send({ new_quantity: 100 });

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("Restock the sweet successfully");

      const restockedSweet = await Sweet.findById(sweet._id);
      expect(restockedSweet.quantity).toBe(100);
    });
  });
});
