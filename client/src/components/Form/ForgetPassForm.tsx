import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import ButtonPrimary from "../Button/ButtonPrimary";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import NcLink from "../NcLink/NcLink";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useAppSelector, useAppDispatch } from "../../app/hook";
import { smsLogin,forgotPass } from '../../app/auth/authActions';
import { useNavigate } from "react-router-dom";


function ForgetPassForm() {

  const dispatch=useAppDispatch()
  const navigate=useNavigate()
  const initialValues = {
    account: "",
    // password: "",
  };

  const validationSchema = Yup.object({
    account: Yup.string()
      // .email("Enter a valid email")
      .required("Email/Phone Number is required")
      .test("test-name", "Enter Valid Phone/Email", function (value) {
        const emailRegex =
          /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        const phoneRegex = /^(\+|00)[0-9]{1,3}[0-9]{4,14}(?:x.+)?$/; // Change this regex based on requirement
        let isValidEmail = emailRegex.test(value);
        let isValidPhone = phoneRegex.test(value);
        if (!isValidEmail && !isValidPhone) {
          return false;
        }
        return true;
      }), 
    // password: Yup.string().required("Required"),
  });

  const onSubmit = (values) => {
    // console.log("Form data", values);
    const {account}=values
    dispatch(forgotPass({account}))
    // navigate('/verify')
    
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, isSubmitting, isValid }) => {
        return (
          <Form className="grid grid-cols-1 gap-6">
            <FormikControl 
             control="input"
             type="text"
             label="Email/Phone"
             name="account"/>

            <ButtonPrimary type="submit" disabled={!isValid}>
              Get Reset Link
            </ButtonPrimary>
          </Form>
        );
      }}
    </Formik>
  );
}

export default ForgetPassForm;
