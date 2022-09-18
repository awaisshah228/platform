import LayoutPage from "../components/LayoutPage/LayoutPage";
import React, { FC } from "react";
import facebookSvg from "../images/Facebook.svg";
import twitterSvg from "../images/Twitter.svg";
import mobSvg from "../images/Mobile.svg";
import googleSvg from "../images/Google.svg";
import Input from "../components/Input/Input";
import ButtonPrimary from "../components/Button/ButtonPrimary";
import NcLink from "../components/NcLink/NcLink";
import { Helmet } from "react-helmet";
import * as Yup from 'yup'
import LoginForm from './../components/Form/LoginForm';
import GoogleLoginForm from "../components/Oauth/GoogleLoginForm";

export interface PageLoginProps {
  className?: string;
  // [x: string]: any
}

const loginSocials = [
  // {
  //   name: "Continue with Facebook",
  //   href: "#",
  //   icon: facebookSvg,
  //   component :({item})=> <GoogleLoginForm item={item}/>
  // },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
    component :({item})=> <GoogleLoginForm item={item}/>

  },
  // {
  //   name: "Continue with Mobile",
  //   href: "/login-sms",
  //   icon: mobSvg,
  //   component :({item})=> <GoogleLoginForm item={item}/>

  // },
];

const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {

 
   

  
  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
        <title>Login || Blog Magazine React Template</title>
      </Helmet>
      <LayoutPage
        subHeading="Welcome to our blog magazine Community"
        headingEmoji="🔑"
        heading="Login"
      >
        <div className="max-w-md mx-auto space-y-6">
        <div className="grid gap-3">
        
            {loginSocials.map((item, index) => (
            
            // <GoogleLoginForm item={item}  />
            <item.component item={item} key={index}/>
            

             
            ))}
          </div>
           
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          {/* FORM */}
          {/* <form className="grid grid-cols-1 gap-6" action="#" method="post">
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1"
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
                <NcLink to="/forgot-pass" className="text-sm">
                  Forgot password?
                </NcLink>
              </span>
              <Input type="password" className="mt-1" />
            </label>
            <ButtonPrimary type="submit">Continue</ButtonPrimary>
          </form> */}

          <LoginForm />

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user? {` `}
            <NcLink to="/signup">Create an account</NcLink>
          </span>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageLogin;
