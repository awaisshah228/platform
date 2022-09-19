import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAPI, postAPI } from "../../utils/fetchData";
import { toast } from "react-toastify";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email: account, password }: any, { rejectWithValue }) => {
    try {
      const res = await postAPI("auth/login", { account, password }, "");
      // localStorage.setItem('access_token',res.data.access_token)
      console.log(res.data);
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

export const register = createAsyncThunk(
  "auth/register",
  async ({ name, account, password }: any, { rejectWithValue }) => {
    try {
      const res = await postAPI(
        "auth/register",
        { name, account, password },
        ""
      );

      toast("Please Check Your Email for Account activation", {
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
      // return custom error message from API if any
      // console.log(error.response.data.errors)
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
// export const refreshToken = createAsyncThunk(
//   'auth/refreshToken',
//   async ({ firstName, email, password }: any, { rejectWithValue }) => {
//     try {

//     } catch (error) {
//         // return custom error message from API if any
//        // console.log(error.response.data.errors)
//        if (error.response && error.response.data.errors) {
//         return rejectWithValue(error.response.data.errors)
//       } else {
//         return rejectWithValue(error.message)
//       }
//     }
//   }
// )
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await getAPI("auth/logout");
      return { msg: "Logged out", user: {}, access_token: "" };
    } catch (error) {
      // return custom error message from API if any
      // console.log(error.response.data.errors)
      if (error.response && error.response.data.errors) {
        return rejectWithValue(error.response.data.errors);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (id_token: string, { rejectWithValue }) => {
    try {
      const res = await postAPI("auth/google_login", { id_token }, "");
      // localStorage.setItem('access_token',res.data.access_token)
      console.log(res.data);
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
export const facebookLogin = createAsyncThunk(
  "auth/facebookLogin",
  async ({ accessToken, userID }: any, { rejectWithValue }) => {
    try {
      const res = await postAPI(
        "auth/facebook_login",
        { accessToken, userID },
        ""
      );
      // localStorage.setItem('access_token',res.data.access_token)
      console.log(res.data);
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
export const smsLogin = createAsyncThunk(
  "auth/smsLogin",
  async (phone: string, { rejectWithValue }) => {
    try {
      const res = await postAPI(
        "auth/login_sms",
        { phone},
        ""
      );
      // localStorage.setItem('access_token',res.data.access_token)
      console.log(res.data);
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



// export const loginSMS = (phone: string) =>
// async (dispatch: Dispatch<IAuthType | IAlertType>) => {
//   const check = validPhone(phone)
//   if(!check)
//     return dispatch({
//       type: ALERT,
//       payload: { errors: 'Phone number format is incorrect.' }
//     });

//   try {
//     dispatch({ type: ALERT, payload: { loading: true } })

//     const res = await postAPI('login_sms', { phone })

//     if(!res.data.valid)
//       verifySMS(phone, dispatch)

//   } catch (err: any) {
//     dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
//   }
// }

// export const verifySMS = async (
//   phone: string, dispatch: Dispatch<IAuthType | IAlertType>
// ) => {
//     const code = prompt('Enter your code')
//     if(!code) return;

//     try {
//       dispatch({ type: ALERT, payload: { loading: true } })

//       const res = await postAPI('sms_verify', { phone, code })

//       dispatch({ type: AUTH,payload: res.data })

//       dispatch({ type: ALERT, payload: { success: res.data.msg } })
//       localStorage.setItem('logged', 'devat-channel')
//     } catch (err: any) {
//       dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
//       setTimeout(() => {
//         verifySMS(phone, dispatch)
//       }, 100);
//     }

// }

// export const forgotPassword = (account: string) =>
// async (dispatch: Dispatch<IAuthType | IAlertType>) => {
//   try {
//     dispatch({ type: ALERT, payload: { loading: true } })

//     const res = await postAPI('forgot_password', { account })

//     dispatch({ type: ALERT, payload: { success: res.data.msg } })
//   } catch (err: any) {
//     dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
//   }
// }
