import React,{useState} from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import ButtonPrimary from "../Button/ButtonPrimary";
import {EyeIcon,EyeOffIcon} from '@heroicons/react/outline'
import NcLink from "../NcLink/NcLink";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'


function LoginForm() {

  const initialValues = {
    phone: "",
    password: "",
  };

  const validationSchema = Yup.object({
    phone: Yup.string().required("Required"),
    // password: Yup.string().required("Required"),
  });

  const onSubmit = (values) => {
    console.log("Form data", values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values,setFieldValue,isSubmitting,isValid }) => {
        return (
          <Form className="grid grid-cols-1 gap-6">

<PhoneInput
      placeholder="Enter phone number"
      value={values.phone}
      onChange={(value)=>{
        // console.log(typeof e.target.files[0])
        setFieldValue("phone",value)}}/>
            {/* <FormikControl
              control="input"
              // control='chakraInput'
              type="tel"
              label="Phone No."
              name="phone"
              placeholder="example@example.com"
              className="mt-1"
            /> */}
            {/* <FormikControl
              control="password"
              // type='password'
              // type={typePass ? "text" : "password"}
              label="Password"
              name="password"
            />
            <NcLink to="/forgot-pass" className="text-sm">
                  Forgot password?
                </NcLink> */}
            {/* <small onClick={() => setTypePass(!typePass)} className=' flex mr-3 text-neutral-800 dark:text-neutral-200'>
              {typePass ? <EyeOffIcon className="h-6 w-6 "/> : <EyeIcon className="h-6 w-6"/>}
            </small> */}
            
            <ButtonPrimary type="submit" disabled={!isValid}>
              Login
            </ButtonPrimary>
          </Form>
        );
      }}
    </Formik>
  );
}

export default LoginForm;

