"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const require_auth_1 = require("../middlewares/require-auth");
// import express from 'express'
// import categoryCtrl from '../controllers/categoryCtrl'
// import auth from '../middleware/auth'
const admin_auth_1 = require("./../middlewares/admin-auth");
const categoryCtrl_1 = __importDefault(require("../controllers/categoryCtrl"));
const router = express_1.default.Router();
router.route('/')
    .get(categoryCtrl_1.default.getCategories)
    .post(require_auth_1.requireAuth, admin_auth_1.adminAuth, categoryCtrl_1.default.createCategory);
// .post(categoryCtrl.createCategory)
router.route('/:id')
    .patch(require_auth_1.requireAuth, admin_auth_1.adminAuth, categoryCtrl_1.default.updateCategory)
    .delete(require_auth_1.requireAuth, admin_auth_1.adminAuth, categoryCtrl_1.default.deleteCategory);
exports.default = router;
