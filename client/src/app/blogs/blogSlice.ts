import { createSlice } from "@reduxjs/toolkit";
import { IBlog, ICategory } from '../../utils/types'
import { getTrendingBlogs } from "./blogActions";


interface blogs{
  trendingBlogs?:IBlog[]
  latestBlogs?:IBlog[]
}

const initialState: blogs={
  trendingBlogs:[],
  latestBlogs:[]
};

const categorySlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    // resetAccessToken(state,action){
    //   state.access_token=action.payload.access_token
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTrendingBlogs.fulfilled, (state, action) => {
        state.trendingBlogs=action.payload
      })
   
  
},
});

export const {} = categorySlice.actions;

export default categorySlice.reducer;
