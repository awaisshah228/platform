import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../../Form/FormikControl";
import ButtonPrimary from "../../Button/ButtonPrimary";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import {
  createCategory,
  deleteCategories,
  updateCategories,
} from "../../../app/category/categoryActions";
import { ICategory } from "../../../utils/types";
import { PencilAltIcon, TrashIcon,XIcon } from "@heroicons/react/solid";
function CategoryForm() {
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState<ICategory | null>(null);
  const categories = useAppSelector((state) => state.category);
  const [initialValues, setInitialValues] = useState({name:''});

  useEffect(() => {
    if (edit) {setInitialValues({name:edit.name})}
    else{
      setInitialValues({name:''})
    };
  }, [edit, categories]);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure to delete this category?")) {
      dispatch(deleteCategories({ id }));
    }
  };
  // const initialValues = {
  //   name,
  // };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
  });

  const onSubmit = ({ name }) => {
   
    if(edit){
      if(edit.name === name) return;
      const data = {...edit, name}
      dispatch(updateCategories(data))
    }else{
      dispatch(createCategory({name}))
    }
    setEdit(null)
  };

  return (
    <div className="category w-full">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {(formik) => {
          return (
            <Form className="grid grid-cols-1 gap-6 justify-center items-center">
              
              <FormikControl
                control="input"
                type="text"
                label="Category"
                name="name"
                // value={name}
                // onChange={e => setName(e.target.value)}

              />
              <div className="flex items-center gap-6">
              <ButtonPrimary type="submit" disabled={!formik.isValid}>
                {edit ? "Update" : "Create"}  
              </ButtonPrimary>
              {
            edit &&<div className="flex bg-green-400 px-3 py-1 rounded-md"  onClick={() => {setEdit(null)}} style={{cursor: 'pointer'}}>
            <p className="text-sm"> Switch to Create</p>
           
            <XIcon className="h-5 w-5"
            
            /></div> 
          }
              </div>
             

              
            </Form>
          );
        }}
      </Formik>
 
      <div className="flex flex-col m-5 gap-4 w-full">
        {categories.map((category, key) => (
          <div className="flex justify-between" key={category.id}>
            <p className="text-xl">{category.name}</p>
            <div className="flex">
              <PencilAltIcon
                className="h-5 w-5"
                onClick={() => setEdit(category)}
              />
              <TrashIcon
                className="h-5 w-5"
                onClick={() => handleDelete(category.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryForm;
