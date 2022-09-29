import express from 'express'
import imageCtrl from '../controllers/imageCtrl'
import upload from '../middlewares/upload-file'
import { requireAuth } from '../middlewares/require-auth'

const router= express.Router()

router.post('/',
requireAuth,
upload.single('image'),
imageCtrl.uploadImage)

export default router;