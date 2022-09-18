import React, { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useAppDispatch } from "../../app/hook";
import { googleLogin } from "../../app/auth/authActions";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'


const FacebookLoginForm = ({ item }) => {
  const dispatch = useAppDispatch();
  const responseFacebook = (response) => {
    console.log(response);
  };

 

  return (
   
    <FacebookLogin
      appId="622252749605587"
      autoLoad={true}
      fields="name,email,picture"
      callback={responseFacebook}
      render={renderProps => (
        <a
        onClick={renderProps.onClick}
        href={item.href}
        className=" flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
      >
        <img
          className="flex-shrink-0"
          src={item.icon}
          alt={item.name}
        />
        <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
          {item.name}
        </h3>
      </a>
        
      )}
      
    />
          
  );
};

export default FacebookLoginForm;
