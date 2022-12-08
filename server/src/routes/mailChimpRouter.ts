import express from 'express';
import subscribed from '../controllers/mailChimpCtrl';
const router= express.Router();


router.post('/',subscribed.subscribeNews)



export default router;