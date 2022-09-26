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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const errors_1 = require("./errors");
const middlewares_1 = require("./middlewares");
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const current_user_1 = __importDefault(require("./middlewares/current-user"));
// import helmet from 'helmet';
const app = (0, express_1.default)();
exports.app = app;
// const isDevelopment = process.env.Node === 'development'
//   app.use(
//     helmet({
//       crossOriginEmbedderPolicy: !isDevelopment,
//       contentSecurityPolicy: !isDevelopment,
//     })
//   )
// app.use(helmet());
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use((0, morgan_1.default)('combined'));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(current_user_1.default);
// app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/v1', routes_1.default);
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
// });
// export default app;
app.all('*', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.json({msg : "err"})
    throw new errors_1.NotFoundError();
}));
app.use(middlewares_1.errorHandler);
