import express from "express";
import userCtrl from "../controllers/userCtrl";
import { body, check, oneOf } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import { requireAuth } from "../middlewares/require-auth";




// import express from 'express'
// import categoryCtrl from '../controllers/categoryCtrl'
// import auth from '../middleware/auth'
import { adminAuth } from './../middlewares/admin-auth';
import categoryCtrl from "../controllers/categoryCtrl";

const router = express.Router()

router.route('/')
  .get(categoryCtrl.getCategories)
  .post(requireAuth,adminAuth, categoryCtrl.createCategory)
  // .post(categoryCtrl.createCategory)

router.route('/:id')
  .patch(requireAuth,adminAuth, categoryCtrl.updateCategory)
  .delete(requireAuth,adminAuth, categoryCtrl.deleteCategory)

export default router;