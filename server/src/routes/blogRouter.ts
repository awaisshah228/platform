import express from 'express'
import { body } from 'express-validator';
import blogCtrl from '../controllers/blogCtrl'
import upload from '../middlewares/upload-file';
import { validateRequest } from '../middlewares/validate-request';
// import auth from '../middleware/auth'
import { requireAuth } from './../middlewares/require-auth';

const router = express.Router()


router.post('/', requireAuth,upload.single('thumbnail'),
 [ body("title").notEmpty().withMessage("You must supply a name").isLength({min:10,max:50}).withMessage("Provide title between 10 to 50 chracter"),
  body("content").notEmpty().withMessage("You must provide conent").isLength({min:500}).withMessage("Provide content more than 500"),
  body("category").notEmpty().withMessage("You must provide category")
],
  validateRequest,
blogCtrl.createBlog)

// router.get('/home/blogs', blogCtrl.getHomeBlogs)

// router.get('/blogs/category/:id', blogCtrl.getBlogsByCategory)

// router.get('/blogs/user/:id', blogCtrl.getBlogsByUser)

// router.route('/blog/:id')
//   .get(blogCtrl.getBlog)
//   .put(auth, blogCtrl.updateBlog)
//   .delete(auth, blogCtrl.deleteBlog)

// router.get('/search/blogs', blogCtrl.searchBlogs)


export default router;