import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteAPI, getAPI, patchAPI, postAPI, putAPI } from "../../utils/fetchData";
import { toast } from "react-toastify";

export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (value: any, { rejectWithValue }) => {
    try {
      console.log(value);
      let form_data = new FormData();

      for (let key in value) {
        form_data.append(key, value[key]);
      }
      const res = await postAPI("blog", form_data);
      toast(res.data?.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return res.data;

      //

      // return value;
    } catch (error) {
      console.log(error);
      //       // return custom error message from API if any
      if (error.response && error.response.data.errors) {
        console.log(error.response.data.errors);
        toast.error(error.response.data.errors[0].message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return rejectWithValue(error.response.data.errors);
      } else {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return rejectWithValue(error.message);
      }
    }
  }
);
export const getTrendingBlogs = createAsyncThunk(
  "blogs/getTrendingBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAPI("blog/trending");
      toast(res.data?.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return res.data;

      //

      // return value;
    } catch (error) {
      console.log(error);
      //       // return custom error message from API if any
      if (error.response && error.response.data.errors) {
        console.log(error.response.data.errors);
        toast.error(error.response.data.errors[0].message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return rejectWithValue(error.response.data.errors);
      } else {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return rejectWithValue(error.message);
      }
    }
  }
);
export const getLatestBlogs = createAsyncThunk(
  "blogs/getLatestBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAPI("blog/latest");
      toast(res.data?.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return res.data;

      //

      // return value;
    } catch (error) {
      console.log(error);
      //       // return custom error message from API if any
      if (error.response && error.response.data.errors) {
        console.log(error.response.data.errors);
        toast.error(error.response.data.errors[0].message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return rejectWithValue(error.response.data.errors);
      } else {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return rejectWithValue(error.message);
      }
    }
  }
);
export const getHomeBlogs = createAsyncThunk(
  "blogs/getHomeBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAPI("blog/home");
      toast(res.data?.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return res.data;

      //

      // return value;
    } catch (error) {
      console.log(error);
      //       // return custom error message from API if any
      if (error.response && error.response.data.errors) {
        console.log(error.response.data.errors);
        toast.error(error.response.data.errors[0].message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return rejectWithValue(error.response.data.errors);
      } else {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return rejectWithValue(error.message);
      }
    }
  }
);


export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async (value: any, { rejectWithValue }) => {
    try {
      console.log(value);
      let form_data = new FormData();

      for (let key in value) {
        form_data.append(key, value[key]);
      }
      const res = await putAPI(`blog/${value.id}`, form_data);
      toast(res.data?.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return res.data;

      //

      // return value;
    } catch (error) {
      console.log(error);
      //       // return custom error message from API if any
      if (error.response && error.response.data.errors) {
        console.log(error.response.data.errors);
        toast.error(error.response.data.errors[0].message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return rejectWithValue(error.response.data.errors);
      } else {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return rejectWithValue(error.message);
      }
    }
  }
);
export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (value: any, { rejectWithValue }) => {
    try {
     
      const res = await deleteAPI(`blog/${value.id}`);
      toast(res.data?.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return res.data;

      //

      // return value;
    } catch (error) {
      console.log(error);
      //       // return custom error message from API if any
      if (error.response && error.response.data.errors) {
        console.log(error.response.data.errors);
        toast.error(error.response.data.errors[0].message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return rejectWithValue(error.response.data.errors);
      } else {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return rejectWithValue(error.message);
      }
    }
  }
);

// export const updateBlog = (blog: IBlog, token: string) => 
// async (dispatch: Dispatch<IAlertType>) => {
//   const result = await checkTokenExp(token, dispatch)
//   const access_token = result ? result : token
//   let url;
//   try {
//     dispatch({ type: ALERT, payload: { loading: true } })
    
//     if(typeof(blog.thumbnail) !== 'string'){
//       const photo = await imageUpload(blog.thumbnail)
//       url = photo.url
//     }else{
//       url = blog.thumbnail
//     }
    
//     const newBlog = {...blog, thumbnail: url}

//     const res = await putAPI(`blog/${newBlog._id}`, newBlog, access_token)

//     dispatch({ type: ALERT, payload: { success: res.data.msg } })
//   } catch (err: any) {
//     dispatch({ type: ALERT, payload: {errors: err.response.data.msg} })
//   }
// }


// export const deleteBlog = (blog: IBlog, token: string) => 
// async (dispatch: Dispatch<IAlertType | IDeleteBlogsUserType>) => {
//   const result = await checkTokenExp(token, dispatch)
//   const access_token = result ? result : token
//   try {
//     dispatch({
//       type: DELETE_BLOGS_USER_ID,
//       payload: blog
//     })

//     await deleteAPI(`blog/${blog._id}`, access_token)

//   } catch (err: any) {
//     dispatch({ type: ALERT, payload: {errors: err.response.data.msg} })
//   }
// }

// export const likePost = ({post, auth, socket}) => async (dispatch) => {
//   const newPost = {...post, likes: [...post.likes, auth.user]}
//   dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost})

//   socket.emit('likePost', newPost)

//   try {
//       await patchDataAPI(`post/${post._id}/like`, null, auth.token)
      
//       // Notify
//       const msg = {
//           id: auth.user._id,
//           text: 'like your post.',
//           recipients: [post.user._id],
//           url: `/post/${post._id}`,
//           content: post.content, 
//           image: post.images[0].url
//       }

//       dispatch(createNotify({msg, auth, socket}))

//   } catch (err) {
//       dispatch({
//           type: GLOBALTYPES.ALERT,
//           payload: {error: err.response.data.msg}
//       })
//   }
// }

// export const unLikePost = ({post, auth, socket}) => async (dispatch) => {
//   const newPost = {...post, likes: post.likes.filter(like => like._id !== auth.user._id)}
//   dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost})

//   socket.emit('unLikePost', newPost)

//   try {
//       await patchDataAPI(`post/${post._id}/unlike`, null, auth.token)

//       // Notify
//       const msg = {
//           id: auth.user._id,
//           text: 'like your post.',
//           recipients: [post.user._id],
//           url: `/post/${post._id}`,
//       }
//       dispatch(removeNotify({msg, auth, socket}))

//   } catch (err) {
//       dispatch({
//           type: GLOBALTYPES.ALERT,
//           payload: {error: err.response.data.msg}
//       })
//   }
// }
