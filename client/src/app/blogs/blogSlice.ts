import { createSlice } from "@reduxjs/toolkit";
import { IBlog, ICategory } from '../../utils/types'


const initialState: IBlog[] =[];

const categorySlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    // resetAccessToken(state,action){
    //   state.access_token=action.payload.access_token
    // }
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(createCategory.fulfilled, (state, action) => {
    //      state.push(action.payload.newCategory    )
    //   })
   
  
},
});

export const {} = categorySlice.actions;

export default categorySlice.reducer;
