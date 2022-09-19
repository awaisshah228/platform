import express from 'express'
import userCtrl from '../controllers/userCtrl'
import { body, oneOf } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import { requireAuth } from "../middlewares/require-auth";

const router = express.Router()

// router.patch('/', auth, userCtrl.updateUser)

// router.patch('/reset_password', requireAuth, userCtrl.resetPassword)

// router.get('/:id', userCtrl.getUser)


export default router;