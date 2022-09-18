import { createSlice } from '@reduxjs/toolkit'
import { login, register , logout } from './authActions'
import { IUser } from '../../utils/types'


// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null


export const AUTH = 'AUTH'

 interface IAuth {
  msg?: string
  access_token?: string
  user?:Partial<IUser>
}
//  interface IAuthType{
//   type: typeof AUTH
//   payload: IAuth
// }


const initialState: IAuth = {
  msg :'',
  access_token: '',
  
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.access_token=action.payload.access_token
        state.user= action.payload.user;
       
      })
      .addCase(register.fulfilled, (state, action) => {
       
      })
      .addCase(register.rejected, (state, action) => {
        
       
      })
      // .addCase(refreshToken.fulfilled, (state, action) => {
       
      // })
      .addCase(logout.fulfilled, (state, action) => {
          state.access_token=action.payload.access_token
          state.user=action.payload.user     
      })
      .addCase(logout.rejected, (state, action) => {
          state.access_token=''
          state.user={}    
      })
      // You can chain calls, or have separate `builder.addCase()` lines each time
      // .addCase(decrement, (state, action) => {})
      // You can match a range of action types
      // .addMatcher(
      //   isRejectedAction,
      //   // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
      //   (state, action) => {}
      // )
      // // and provide a default case if no other handlers matched
      // .addDefaultCase((state, action) => {})
  },
  // extraReducers: {
    // login user
    // [userLogin.pending]: (state) => {
    //   state.loading = true
    //   state.error = null
    // },
    // [userLogin.fulfilled]: (state, { payload }) => {
    //   state.loading = false
    //   state.userInfo = payload
    //   state.userToken = payload.userToken
    // },
    // [userLogin.rejected]: (state, { payload }) => {
    //   state.loading = false
    //   state.error = payload
    // },
    // // register user
    // [registerUser.pending]: (state) => {
    //   state.loading = true
    //   state.error = null
    // },
    // [registerUser.fulfilled]: (state, { payload }) => {
    //   state.loading = false
    //   state.success = true // registration successful
    // },
    // [registerUser.rejected]: (state, { payload }) => {
    //   state.loading = false
    //   state.error = payload
    // },
    // // get user details
    // [getUserDetails.pending]: (state) => {
    //   state.loading = true
    // },
    // [getUserDetails.fulfilled]: (state, { payload }) => {
    //   state.loading = false
    //   state.userInfo = payload
    // },
    // [getUserDetails.rejected]: (state, { payload }) => {
    //   state.loading = false
    // },
  // },
})

// export const authActions = authSlice.actions

export default authSlice.reducer