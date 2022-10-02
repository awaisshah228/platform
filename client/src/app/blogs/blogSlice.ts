import { createSlice } from "@reduxjs/toolkit";
import { IBlog, ICategory } from '../../utils/types'
import { getHomeBlogs, getLatestBlogs, getTrendingBlogs } from "./blogActions";


interface blogs{
  trendingBlogs?:IBlog[]
  latestBlogs?:IBlog[]
  homeBlogs?:IBlog[]
}

const initialState: blogs={
  trendingBlogs:[],
  latestBlogs:[],
  homeBlogs:[]
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
    builder
      .addCase(getLatestBlogs.fulfilled, (state, action) => {
        state.latestBlogs=action.payload
      })
    builder
      .addCase(getHomeBlogs.fulfilled, (state, action) => {
        state.homeBlogs=action.payload
      })
   
  
},
});

export const {} = categorySlice.actions;

export default categorySlice.reducer;
