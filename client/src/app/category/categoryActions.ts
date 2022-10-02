import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteAPI, getAPI, patchAPI, postAPI } from "../../utils/fetchData";
import { toast } from "react-toastify";

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async ({ name }: any, { rejectWithValue }) => {
    try {
      const res = await postAPI("category", { name});
      // localStorage.setItem('access_token',res.data.access_token)
      toast(res.data?.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      //

      return res.data;
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
export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAPI("category");
      // localStorage.setItem('access_token',res.data.access_token)
      toast(res.data?.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      //
      // console.log(res.data.categories)

      return res.data;
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
export const updateCategories = createAsyncThunk(
  "category/updateCategories",
  async ({name,id}: any, { rejectWithValue }) => {
    try {
      const res = await patchAPI(`category/${id}`,{name});
      // localStorage.setItem('access_token',res.data.access_token)
      toast(res.data?.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      //

      return res.data;
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
export const deleteCategories = createAsyncThunk(
  "category/deleteCategories",
  async ({id}: any, { rejectWithValue }) => {
    try {
      const res = await deleteAPI(`category/${id}`,);
      // localStorage.setItem('access_token',res.data.access_token)
      toast(res.data?.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      //

      return res.data;
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



// export const updateCategory = (data: ICategory, token: string) => 
// async(dispatch: Dispatch<IAlertType | ICategoryType>) => {
//   const result = await checkTokenExp(token, dispatch)
//   const access_token = result ? result : token
//   try {

//     dispatch({ type: UPDATE_CATEGORY, payload: data })

//     await patchAPI(`category/${data._id}`, { 
//       name: data.name 
//     }, access_token)

//   } catch (err: any) {
//     dispatch({ type: ALERT, payload: { errors: err.response.data.msg }})
//   }
// }

// export const deleteCategory = (id: string, token: string) => 
// async(dispatch: Dispatch<IAlertType | ICategoryType>) => {
//   const result = await checkTokenExp(token, dispatch)
//   const access_token = result ? result : token
//   try {
    
//     dispatch({ type: DELETE_CATEGORY, payload: id })
//     await deleteAPI(`category/${id}`, access_token)

//   } catch (err: any) {
//     dispatch({ type: ALERT, payload: { errors: err.response.data.msg }})
//   }
// }

