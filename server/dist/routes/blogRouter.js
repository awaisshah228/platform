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
// router.get('/home/blogs', blogCtrl.getHomeBlogs)
// router.get('/blogs/category/:id', blogCtrl.getBlogsByCategory)
// router.get('/blogs/user/:id', blogCtrl.getBlogsByUser)
// router.route('/blog/:id')
//   .get(blogCtrl.getBlog)
//   .put(auth, blogCtrl.updateBlog)
//   .delete(auth, blogCtrl.deleteBlog)
// router.get('/search/blogs', blogCtrl.searchBlogs)
exports.default = router;
