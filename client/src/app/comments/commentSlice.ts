import { createSlice } from "@reduxjs/toolkit";
import { createComment } from './commentAction';


const initialState:any={
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    // resetAccessToken(state,action){
    //   state.access_token=action.payload.access_token
    // }
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(createComment.fulfilled, (state, action) => {
    //     state.trendingBlogs=action.payload
    //   })
    // builder
    //   .addCase(getTrendingBlogs.fulfilled, (state, action) => {
    //     state.trendingBlogs=action.payload
    //   })
    
   
  
},
});

// export const {} = commentSlice.actions;

export default commentSlice.reducer;
