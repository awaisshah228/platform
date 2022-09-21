import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import ButtonPrimary from "../Button/ButtonPrimary";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { register } from "../../app/auth/authActions";
import PrivatePage from "../../routers/PrivatePage";
import Preview from "./Preview";
import { UserIcon } from "@heroicons/react/solid";
import TextError from "./TextError";
import { getAPI } from "../../utils/fetchData";
function EditProfile() {
  const dispatch = useAppDispatch();
  const options = [
    { key: "Email", value: "emailmoc" },
    { key: "Telephone", value: "telephonemoc" },
  ];
  const userId=useAppSelector(state=>state.auth.user.id)
  const [initialValues, setinitialValues] = useState({name: "",
  account: "",
  password: "",
  confirmPassword: "",
  file: "",})
  
  const [Image, setImage] = useState('')
  

  const FILE_SIZE = 160 * 1024;
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];

  const populateData=async()=>{
    
      const res= await getAPI(`user/${userId}`)
      console.log(res)
      // setinitialValues(res)
      let profile=res.data
       setinitialValues({
        name: profile.name,
        account: profile.account,
        password: "",
        confirmPassword: "",
        file: '',
        // modeOfContact: '',
        // phone: ''
      } );
      setImage(profile.avatar)
      console.log(initialValues);
      

    
   
  }
  useEffect(() => {

    populateData()
    
     
  },[])
  

  // const initialValues = {
  //   name: "",
  //   account: "",
  //   password: "",
  //   confirmPassword: "",
  //   file: "",
  //   // modeOfContact: '',
  //   // phone: ''
  // };

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
                  <UserIcon className="h-24 w-24" />
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
          
            
            <FormikControl
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
            />
            <FormikControl
              control="input"
              type="text"
              label="Email/Phone"
              name="account"
              className='md:col-start-1 md:col-end-3'
            />

            <ButtonPrimary type="submit" disabled={!formik.isValid} className='md:col-span-2'>
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
