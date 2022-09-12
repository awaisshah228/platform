import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
// import sendEmail from '../'

declare global {
  let signin: () => Promise<string[]>;
}
jest.mock('../utils/sendMail')
jest.mock('../utils/sendSMS')

// const envs=async()=>{
//   process.env.JWT_KEY = 'asdfasdf';
//   process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
//   process.env.TWILIO_ACCOUNT_SID=';lk;'
// }

let mongo: any;
beforeAll(() => {
  process.env.JWT_KEY = 'asdfasdf';
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    process.env.TWILIO_ACCOUNT_SID=';lk;'
    // console.log(process.env.TWILIO_ACCOUNT_SID)
  // await envs();
 
 
});
beforeAll(async () => {
  // await envs();
 

  mongo = await MongoMemoryServer.create();
  const mongoUri =  mongo.getUri();

  await mongoose.connect(mongoUri, {});
});



beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

// global.signin = async () => {
//   const email = 'test@test.com';
//   const password = 'password';

//   const response = await request(app)
//     .post('/api/users/signup')
//     .send({
//       email,
//       password,
//     })
//     .expect(201);

//   const cookie = response.get('Set-Cookie');

//   return cookie;
// };