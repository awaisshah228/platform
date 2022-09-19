import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hook";
import { useSelector } from "react-redux";

const PrivatePage = ({ children }) => {
  let navigate = useNavigate();
  const LoggedIn = useAppSelector((state) => state.auth.access_token);
  
  useEffect(() => {
    if (LoggedIn) {
      return navigate("/");
    }
  },[LoggedIn]);

  // const firstLogin = localStorage.getItem('firstLogin')
  return <>{children}</>;
};

export default PrivatePage;
