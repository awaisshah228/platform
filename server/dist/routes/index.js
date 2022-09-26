"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const testRouter_1 = __importDefault(require("./testRouter"));
const authRouter_1 = __importDefault(require("./authRouter"));
const userRouter_1 = __importDefault(require("./userRouter"));
const categoryRouter_1 = __importDefault(require("./categoryRouter"));
const blogRouter_1 = __importDefault(require("./blogRouter"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Library API',
            version: '1.0.0',
            description: 'A simple Express Library API',
        },
        servers: [
            {
                url: 'http://localhost:8000/v1',
            },
        ],
    },
    apis: ['./src/routes/*.ts', './src/routes/*.js'],
};
const api = express_1.default.Router();
const specs = (0, swagger_jsdoc_1.default)(options);
api.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
api.use('/test', testRouter_1.default);
api.use('/auth', authRouter_1.default);
api.use('/user', userRouter_1.default);
api.use('/category', categoryRouter_1.default);
api.use('/blog', blogRouter_1.default);
exports.default = api;
