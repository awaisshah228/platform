import bookmarkReducer from "./bookmarks/bookmarksSlice";
import postLikesReducer from "./postLikes/postLikes";
import authReducer from './auth/authSlice'
import commentLikesReducer from "./commentLikes/commentLikes";
import darkmodeReducer from "./darkmode/darkmode";
// import pagesReducer from "./pages/pages";
import mediaRunningReducer from "./mediaRunning/mediaRunning";
import categoryReducer from './category/categorySlice'
import blogReducer from './blogs/blogSlice'

const rootReducers = {
  auth : authReducer,
  bookmark: bookmarkReducer,
  blogs: blogReducer,
  postLike: postLikesReducer,
  darkmode: darkmodeReducer,
  commentLikes: commentLikesReducer,
  mediaRunning: mediaRunningReducer,
  category: categoryReducer
};

export default rootReducers;
