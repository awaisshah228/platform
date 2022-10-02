import React, { FC } from "react";
import LayoutPage from "../components/LayoutPage/LayoutPage";
import Input from "../components/Input/Input";
import ButtonPrimary from "../components/Button/ButtonPrimary";
import NcLink from "../components/NcLink/NcLink";
import { Helmet} from 'react-helmet-async';

import LoginForm from "../components/Form/LoginSmsForm";
import PrivatePage from "../routers/PrivatePage";

export interface PageForgotPassProps {
  className?: string;
}

const PageLoginSMS: FC<PageForgotPassProps> = ({ className = "" }) => {
  return (

    <PrivatePage>
      <div
      className={`nc-PageForgotPass ${className}`}
      data-nc-id="PageForgotPass"
    >
      <Helmet>
        <title>Forgot Password || Blog Magazine React Template</title>
      </Helmet>
      <LayoutPage
        subHeading="We will sent reset password instruction to your email"
        headingEmoji="🔐"
        heading="Forgot password"
      >
        <div className="max-w-md mx-auto space-y-6">
          
          <LoginForm />

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Go back for {` `}
            <NcLink to="/login">Sign in</NcLink>
            {` / `}
            <NcLink to="/signup">Sign up</NcLink>
          </span>
        </div>
      </LayoutPage>
    </div>
    </PrivatePage>


    
  );
};

export default PageLoginSMS;
