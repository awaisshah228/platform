import express from 'express'
import commentCtrl from '../controllers/commentCtrl'
import { requireAuth } from './../middlewares/require-auth';
import { body, check, oneOf } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";


const router = express.Router()

router.post('/', requireAuth,
[
     body("content").notEmpty().withMessage("You must supply a name"),
     body("blog_id").notEmpty().withMessage("You must supply a blog id"),
     body("blog_user_id").notEmpty().withMessage("You must supply a blog user id"),
],
validateRequest,

commentCtrl.createComment)

router.get('/comments/blog/:id', commentCtrl.getComments)

router.post('/reply_comment', requireAuth, commentCtrl.replyComment)

router.patch('/comment/:id', requireAuth, commentCtrl.updateComment)

router.delete('/comment/:id', requireAuth, commentCtrl.deleteComment)


export default router;