import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import ButtonPrimary from "../Button/ButtonPrimary";
import { useAppDispatch } from "../../app/hook";
import { register } from "../../app/auth/authActions";
import PrivatePage from "../../routers/PrivatePage";
import { changePass } from "../../app/auth/authActions";
import LayoutPage from "../LayoutPage/LayoutPage";
function ResetPass() {
  const dispatch = useAppDispatch();

  const initialValues = {
    
    password: "",
    confirmPassword: "",
   
  };

  const validationSchema = Yup.object({
   
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Required"),
  });

  const onSubmit = ({password}) => {
    // console.log("Form data", values);
    
    dispatch(changePass({password}));
  };

  return (
    // <PrivatePage>
       <LayoutPage
        subHeading="We have sent OTP to Your number Please  Verify"
        headingEmoji="🔐"
        heading="Phone Verification"
      >
        <div className="max-w-md mx-auto space-y-6">
        <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form className="grid grid-cols-1 gap-6">
          
            <FormikControl
              control="password"
              // type='password'
              label="Password"
              name="password"
            />
            <FormikControl
              control="password"
              // type='password'
              label="Confirm Password"
              name="confirmPassword"
            />

            <ButtonPrimary type="submit" disabled={!formik.isValid}>
              Continue
            </ButtonPrimary>
          </Form>
        );
      }}
    </Formik>
        </div>
        
      </LayoutPage>
      
    // </PrivatePage>
  );
}

export default ResetPass;
