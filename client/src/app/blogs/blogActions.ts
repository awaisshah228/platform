import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteAPI, getAPI, patchAPI, postAPI } from "../../utils/fetchData";
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
