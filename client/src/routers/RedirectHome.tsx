import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hook";
import { useSelector } from "react-redux";
import { useLocation } from 'react-router';

const RedirectHome = ({ children }) => {
  let navigate = useNavigate();
  const LoggedIn = useAppSelector((state) => state.auth.access_token);

  const location=useLocation()

  console.log(location)
  
  useEffect(() => {
    let url = location.search.replace('?', '/')
    console.log(url)
    if (LoggedIn && LoggedIn!='') {
      if(location.search){
        return navigate(url);
      }
      return navigate("/");
    }
  },[LoggedIn]);
  

  // const firstLogin = localStorage.getItem('firstLogin')
  return <>{children}</>;
};

export default RedirectHome;
