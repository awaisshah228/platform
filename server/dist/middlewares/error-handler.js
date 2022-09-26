"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const custom_errors_1 = require("../errors/custom-errors");
const errorHandler = (err, req, res, next) => {
    // console.log("hi")
    if (err instanceof custom_errors_1.CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }
    // const tokenExpire: any=JSON.stringify(err)
    // console.log(tokenExpire.name)
    if (err.name == 'TokenExpiredError') {
        return res.status(401).send({
            errors: [err],
        });
    }
    console.log(err);
    if (err.code === 11000) {
        let message = Object.values(err.keyValue)[0] + " already exists.";
        return res.status(400).send({ errors: [{ message }] });
    }
    if (err) {
        return res.status(400).send({
            errors: [err],
        });
    }
    res.status(400).send({
        errors: ["something went wrong "],
    });
};
exports.errorHandler = errorHandler;
