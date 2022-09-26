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
Object.defineProperty(exports, "__esModule", { value: true });
const categoryModel_1 = require("../models/categoryModel");
const blogModel_1 = require("../models/blogModel");
const bad_request_error_1 = require("./../errors/bad-request-error");
const categoryCtrl = {
    createCategory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const name = req.body.name.toLowerCase();
        const newCategory = new categoryModel_1.Category({ name });
        yield newCategory.save();
        res.json({ newCategory });
    }),
    getCategories: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const categories = yield categoryModel_1.Category.find().sort("-createdAt");
        res.json({ categories });
    }),
    updateCategory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const category = yield categoryModel_1.Category.findOneAndUpdate({
            _id: req.params.id,
        }, { name: req.body.name.toLowerCase() }, { new: true });
        res.json({ msg: "Update Success!", category });
    }),
    deleteCategory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const blog = yield blogModel_1.Blog.findOne({ category: req.params.id });
        if (blog)
            throw new bad_request_error_1.BadRequestError("Can not delete! In this category also exist blogs.");
        const category = yield categoryModel_1.Category.findByIdAndDelete(req.params.id);
        if (!category)
            throw new bad_request_error_1.BadRequestError("Category does not exists.");
        res.json({ msg: "Delete Success!", category });
    }),
};
exports.default = categoryCtrl;
