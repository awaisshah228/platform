import React,{useState} from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import ButtonPrimary from "../Button/ButtonPrimary";
import {EyeIcon,EyeOffIcon} from '@heroicons/react/outline'
import NcLink from "../NcLink/NcLink";
import { useAppDispatch,useAppSelector } from "../../app/hook";
import { login } from "../../app/auth/authActions";
import { useNavigate } from "react-router-dom";
import  PrivatePage from '../../routers/PrivatePage'

function LoginForm() {

  const dispatch= useAppDispatch()
  const navigate= useNavigate()

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = (values) => {
    // console.log("Form data", values);
    dispatch(login(values)).then(res=>{
      navigate('/')
    })
    
    // console.log("done")

  };

  return (
    <PrivatePage>
      <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form className="grid grid-cols-1 gap-6">
            <FormikControl
              control="input"
              // control='chakraInput'
              type="email"
              label="Email"
              name="email"
              placeholder="example@example.com"
              className="mt-1"
            />
            <FormikControl
              control="password"
              // type='password'
              // type={typePass ? "text" : "password"}
              label="Password"
              name="password"
            />
            <NcLink to="/forgot-pass" className="text-sm">
                  Forgot password?
                </NcLink>
            {/* <small onClick={() => setTypePass(!typePass)} className=' flex mr-3 text-neutral-800 dark:text-neutral-200'>
              {typePass ? <EyeOffIcon className="h-6 w-6 "/> : <EyeIcon className="h-6 w-6"/>}
            </small> */}
            
            <ButtonPrimary type="submit" disabled={!formik.isValid}>
              Continue
            </ButtonPrimary>
          </Form>
        );
      }}
    </Formik>
    </PrivatePage>
    
  );
}

export default LoginForm;

