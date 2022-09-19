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
import { smsLogin } from './../../app/auth/authActions';

function LoginForm() {

  const dispatch=useAppDispatch()
  const initialValues = {
    phone: "",
    // password: "",
  };

  const validationSchema = Yup.object({
    phone: Yup.string().required("Required"),
    // password: Yup.string().required("Required"),
  });

  const onSubmit = (values) => {
    // console.log("Form data", values);
    const {phone}=values
    dispatch(smsLogin(phone))
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
            <PhoneInput
              placeholder="Enter phone number"
              value={values.phone}
              onChange={(value) => {
                // console.log(typeof e.target.files[0])
                setFieldValue("phone", value);
              }}
            />

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
