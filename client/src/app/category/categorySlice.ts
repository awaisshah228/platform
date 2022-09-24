import { createSlice } from "@reduxjs/toolkit";
import { ICategory } from '../../utils/types'
import { createCategory, deleteCategories, getCategories, updateCategories } from "./categoryActions";


const initialState: ICategory[] =[];

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    // resetAccessToken(state,action){
    //   state.access_token=action.payload.access_token
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.fulfilled, (state, action) => {
         state.push(action.payload.newCategory    )
      })
    builder
      .addCase(getCategories.fulfilled, (state, action) => {
         return action.payload.categories;
      })
    builder
      .addCase(deleteCategories.fulfilled, (state, action) => {
        return state.filter(category => category.id !== action.payload.category.id)
      })
    builder
      .addCase(updateCategories.fulfilled, (state, action) => {
        const toUpdate = state.find((item) => item.id === action.payload.category.id)
        console.log(toUpdate)
        if(toUpdate){
          toUpdate.name=action.payload.category.name;
          toUpdate.updatedAt=action.payload.category.updatedAt;
        }

      })
  },
});

export const {} = categorySlice.actions;

export default categorySlice.reducer;
