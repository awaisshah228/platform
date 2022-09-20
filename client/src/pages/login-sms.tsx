import React from "react";
import PageLoginSMS from "../containers/PageLoginSMS";
import PrivatePage from "../routers/PrivatePage";
import RedirectHome from "../routers/RedirectHome";
const LoginSMS = () => {
  return (
    <RedirectHome>
      {" "}
      <PageLoginSMS />
    </RedirectHome>
  );
};

export default LoginSMS;
