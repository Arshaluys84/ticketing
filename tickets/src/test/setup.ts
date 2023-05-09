import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest"
import jwt from "jsonwebtoken"
import { createId } from "./helpers/createId";

declare global {
  var signin: () => string[];
}
jest.mock("../nats-wrapper.ts")
let mongo: any;
beforeAll(async () => {
  jest.clearAllMocks()
  process.env.JWT_KEY = "asdfg"  

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = () =>{
  
  const payload = {
    email:"test@test.com",
    id: createId()
  }
  
  const newJwt = jwt.sign(payload,process.env.JWT_KEY!)

  
  const session = {
    jwt: newJwt
  }
  const strJwt = JSON.stringify(session)

  const base64 = Buffer.from(strJwt).toString("base64")
  

 
  return [`session=${base64}`]
}