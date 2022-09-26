"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
jest.mock('../utils/sendMail');
jest.mock('../utils/sendSMS');
// const envs=async()=>{
//   process.env.JWT_KEY = 'asdfasdf';
//   process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
//   process.env.TWILIO_ACCOUNT_SID=';lk;'
// }
let mongo;
beforeAll(() => {
    process.env.JWT_KEY = 'asdfasdf';
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    process.env.TWILIO_ACCOUNT_SID = ';lk;';
    // console.log(process.env.TWILIO_ACCOUNT_SID)
    // await envs();
});
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    // await envs();
    mongo = yield mongodb_memory_server_1.MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    yield mongoose_1.default.connect(mongoUri, {});
}));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    const collections = yield mongoose_1.default.connection.db.collections();
    for (const collection of collections) {
        yield collection.deleteMany({});
    }
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    if (mongo) {
        yield mongo.stop();
    }
    yield mongoose_1.default.connection.close();
}));
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
