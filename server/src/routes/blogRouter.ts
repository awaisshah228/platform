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

router.get('/trending', blogCtrl.getTrendingBlogs)
router.get('/latest', blogCtrl.getLatestBlogs)
router.get('/home', blogCtrl.getHomeBlogs)

router.get('/category/:id', blogCtrl.getBlogsByCategory)

router.get('/user/:id', blogCtrl.getBlogsByUser)

router.route('/:id')
  .get(blogCtrl.getBlog)
  .put(requireAuth,upload.single('thumbnail'),
  [ body("title").notEmpty().withMessage("You must supply a name").isLength({min:10,max:50}).withMessage("Provide title between 10 to 50 chracter"),
  body("content").notEmpty().withMessage("You must provide conent").isLength({min:500}).withMessage("Provide content more than 500"),
  body("category").notEmpty().withMessage("You must provide category id")
],
  validateRequest,
  blogCtrl.updateBlog)
  .delete(requireAuth, blogCtrl.deleteBlog)

router.get('/search/blogs', blogCtrl.searchBlogs)

router.patch('/:id/like', requireAuth, blogCtrl.likeBlog)

router.patch('/:id/unlike', requireAuth, blogCtrl.unLikeBlog)

router.patch('/saveBlog/:id', requireAuth, blogCtrl.saveBlog)

router.patch('/unSaveBlog/:id', requireAuth, blogCtrl.unSaveBlog)

router.get('/savePosts', requireAuth, blogCtrl.getSaveBlogs)


export default router;