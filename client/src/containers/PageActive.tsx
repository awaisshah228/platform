import React, { FC } from "react";
import LayoutPage from "../components/LayoutPage/LayoutPage";
import Input from "../components/Input/Input";
import ButtonPrimary from "../components/Button/ButtonPrimary";
import NcLink from "../components/NcLink/NcLink";
import { Helmet } from "react-helmet";
import { response } from "express";

export interface PageForgotPassProps {
  className?: string;
  [x: string]: any
}

const PageActive: FC<PageForgotPassProps> = (props) => {
  console.log(props)
  return (
    <div
      className={`nc-PageForgotPass ${props.className}`}
      data-nc-id="PageForgotPass"
    >
      <Helmet>
        <title>Page Active || Blog Magazine React Template</title>
      </Helmet>
      <LayoutPage
        subHeading= {
          props?.resp.err ? "Token is expired or  not valid": "Your Account is Activated"
        }
        headingEmoji={ props?.resp.err ? "❌": "✔"}
        heading="Account Activation"
      >
        <div className="max-w-md mx-auto space-y-6">

        {/* {
          props.resp.err[0].message ? <>Token not valid</>: <>Your Account activated succesfully</>
        } */}
            {/* {err && 
        <div>{err}</div>
            } */}
          {/* FORM */}
          {/* <div>
            <h1> You</h1>
          </div> */}

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Go back for {` `}
            <NcLink to="/login">Sign in</NcLink>
            {` / `}
            {/* <NcLink to="/signup">Sign up</NcLink> */}
          </span>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageActive;
