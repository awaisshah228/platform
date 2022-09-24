import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import ButtonPrimary from "../Button/ButtonPrimary";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import PrivatePage from "../../routers/PrivatePage";
import Preview from "./Preview";
import TextError from "./TextError";

import Avatar from "../Avatar/Avatar";
import { editProfile } from "./../../app/auth/authActions";
function EditProfile() {
  const dispatch = useAppDispatch();
  const options = [
    { key: "Email", value: "emailmoc" },
    { key: "Telephone", value: "telephonemoc" },
  ];
  const user = useAppSelector((state) => state.auth.user);
  const [initialValues, setinitialValues] = useState({
    name: "",
    account: "",
    file: "",
  });

  const [Image, setImage] = useState("");

  const FILE_SIZE = 160 * 1024;
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];

  const populateData = async () => {
    try {
      setinitialValues({
        name: user.name,
        account: user.account,

        file: "",
      });
      setImage(user.avatar);
    } catch (error) {}
  };
  useEffect(() => {
    populateData();
  }, [user]);

  

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    account: Yup.string()
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
  });

  const onSubmit = async ({ name, account, file }) => {
    dispatch(editProfile({ name, account, file }));
  };

  return (
    <PrivatePage>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {(formik) => {
          return (
            <Form className="flex flex-col gap-6 md:p-10">
              <div className="flex justify-center flex-col items-center">
                <label
                  htmlFor="file"
                  className="bg-slate-500 hover:cursor-pointer rounded-full  text-white"
                >
                  {formik.values.file ? (
                    <Preview file={formik.values.file} />
                  ) : (
                    // <UserIcon className="h-24 w-24" />
                    <Avatar imgUrl={Image} sizeClass="h-20 w-20" radius="30" />
                  )}
                </label>
                <input
                  id="file"
                  type="file"
                  //   name="file"
                  placeholder="file"
                  className="hidden"
                  onChange={(e) => {
                    console.log(e.target.files[0]);
                    // console.log(typeof e.target.files[0])
                    formik.setFieldValue("file", e.target.files[0]);
                  }}
                />
                <ErrorMessage component={TextError} name="file" />
              </div>

              <FormikControl
                control="input"
                type="text"
                label="Full Name"
                name="name"
                className=""
                value={formik.values.name}
              />

              {/* <FormikControl
              control="password"
              // type='password'
              label="Password"
              name="password"
              className="block"
            />
            <FormikControl
              control="password"
              // type='password'
              label="Confirm Password"
              name="confirmPassword"
              className="block"
            /> */}
              <FormikControl
                control="input"
                type="text"
                label="Email/Phone"
                name="account"
                className="md:col-start-1 md:col-end-3"
              />

              <ButtonPrimary
                type="submit"
                disabled={!formik.isValid}
                className="md:col-span-2"
              >
                Continue
              </ButtonPrimary>
            </Form>
          );
        }}
      </Formik>
    </PrivatePage>
  );
}

export default EditProfile;
