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
import { smsLogin, smsVerify } from './../../app/auth/authActions';

function VerifyForm() {

const phone= useAppSelector(state=>state.auth?.phone)
  const dispatch=useAppDispatch()
  const initialValues = {
    code: "",
  };

  const validationSchema = Yup.object({
    code: Yup.number().test('len', 'Must be exactly 5 characters', val => val?.toString()?.length === 6).required("Required"),
    // password: Yup.string().required("Required"),
  });

  const onSubmit = (values) => {
    // console.log("Form data", values);
    const {code}=values
    dispatch(smsVerify({phone,code}))
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
            {/* <PhoneInput
              placeholder="Enter phone number"
              value={values.phone}
              onChange={(value) => {
                // console.log(typeof e.target.files[0])
                setFieldValue("phone", value);
              }}
            /> */}
             <FormikControl
              control="input"
              // control='chakraInput'
              type="number"
              label="Verify OTP"
              name="code"
              placeholder="000000"
              className="mt-1"
            />

            <ButtonPrimary type="submit" disabled={!isValid}>
              Verify
            </ButtonPrimary>
          </Form>
        );
      }}
    </Formik>
  );
}

export default VerifyForm;
