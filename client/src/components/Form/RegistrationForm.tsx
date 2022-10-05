import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import ButtonPrimary from "../Button/ButtonPrimary";
import { useAppDispatch } from "../../app/hook";
import { register } from "../../app/auth/authActions";
import PrivatePage from "../../routers/PrivatePage";
function RegistrationForm() {
  const dispatch = useAppDispatch();
  const options = [
    { key: "Email", value: "emailmoc" },
    { key: "Telephone", value: "telephonemoc" },
  ];
  const initialValues = {
    name: "",
    account: "",
    password: "",
    confirmPassword: "",
    // modeOfContact: '',
    // phone: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
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
      }), // email: Yup.string()
    //   .email('Invalid email format')
    //   .required('Required'),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Required"),
  });

  const onSubmit = (values) => {
    console.log("Form data", values);
    
    dispatch(register(values));
  };

  return (
    // <PrivatePage>
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
              type="text"
              label="Name"
              name="name"
            />
            <FormikControl
              control="input"
              type="text"
              label="Email/Phone"
              name="account"
            />
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
    // </PrivatePage>
  );
}

export default RegistrationForm;
