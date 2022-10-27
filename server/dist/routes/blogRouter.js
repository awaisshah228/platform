"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const blogCtrl_1 = __importDefault(require("../controllers/blogCtrl"));
const upload_file_1 = __importDefault(require("../middlewares/upload-file"));
const validate_request_1 = require("../middlewares/validate-request");
// import auth from '../middleware/auth'
const require_auth_1 = require("./../middlewares/require-auth");
const router = express_1.default.Router();
router.post('/', require_auth_1.requireAuth, upload_file_1.default.single('thumbnail'), [(0, express_validator_1.body)("title").notEmpty().withMessage("You must supply a name").isLength({ min: 10, max: 50 }).withMessage("Provide title between 10 to 50 chracter"),
    (0, express_validator_1.body)("content").notEmpty().withMessage("You must provide conent").isLength({ min: 500 }).withMessage("Provide content more than 500"),
    (0, express_validator_1.body)("category").notEmpty().withMessage("You must provide category")
], validate_request_1.validateRequest, blogCtrl_1.default.createBlog);
router.get('/trending', blogCtrl_1.default.getTrendingBlogs);
router.get('/latest', blogCtrl_1.default.getLatestBlogs);
router.get('/home', blogCtrl_1.default.getHomeBlogs);
router.get('/category/:id', blogCtrl_1.default.getBlogsByCategory);
router.get('/user/:id', blogCtrl_1.default.getBlogsByUser);
router.get('/search', blogCtrl_1.default.searchBlogs);
router.patch('/:id/like', require_auth_1.requireAuth, blogCtrl_1.default.likeBlog);
router.patch('/:id/unlike', require_auth_1.requireAuth, blogCtrl_1.default.unLikeBlog);
router.patch('/saveBlog/:id', require_auth_1.requireAuth, blogCtrl_1.default.saveBlog);
router.patch('/unSaveBlog/:id', require_auth_1.requireAuth, blogCtrl_1.default.unSaveBlog);
router.get('/savePosts', require_auth_1.requireAuth, blogCtrl_1.default.getSaveBlogs);
router.get('/heroPost', blogCtrl_1.default.getFeatureBlog);
router.route('/:id')
    .get(blogCtrl_1.default.getBlog)
    .put(require_auth_1.requireAuth, upload_file_1.default.single('thumbnail'), [(0, express_validator_1.body)("title").notEmpty().withMessage("You must supply a name").isLength({ min: 10, max: 50 }).withMessage("Provide title between 10 to 50 chracter"),
    (0, express_validator_1.body)("content").notEmpty().withMessage("You must provide conent").isLength({ min: 500 }).withMessage("Provide content more than 500"),
    (0, express_validator_1.body)("category").notEmpty().withMessage("You must provide category id")
], validate_request_1.validateRequest, blogCtrl_1.default.updateBlog)
    .delete(require_auth_1.requireAuth, blogCtrl_1.default.deleteBlog);
exports.default = router;
