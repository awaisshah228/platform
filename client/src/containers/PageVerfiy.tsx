import React, { FC } from "react";
import LayoutPage from "../components/LayoutPage/LayoutPage";
import Input from "../components/Input/Input";
import ButtonPrimary from "../components/Button/ButtonPrimary";
import NcLink from "../components/NcLink/NcLink";
import { Helmet} from 'react-helmet-async';

import VerifyForm from "../components/Form/VerifyForm";

export interface PageForgotPassProps {
  className?: string;
  [x: string]: any
}

const PageVerify: FC<PageForgotPassProps> = (props) => {
  
  return (
    <div
      className={`nc-PageForgotPass ${props.className}`}
      data-nc-id="PageForgotPass"
    >
      <Helmet>
        <title>Page Active || Blog Magazine React Template</title>
      </Helmet>
      <LayoutPage
        subHeading="We have sent OTP to Your number Please  Verify"
        headingEmoji="🔐"
        heading="Phone Verification"
      >
        <div className="max-w-md mx-auto space-y-6">
          <VerifyForm />

       

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

export default PageVerify;
