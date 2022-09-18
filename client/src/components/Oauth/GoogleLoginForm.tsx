import React, { useEffect } from 'react'
import { GoogleLogin } from 'react-google-login';
import {gapi} from 'gapi-script'
import { useAppDispatch } from '../../app/hook';
import { googleLogin } from '../../app/auth/authActions';


const GoogleLoginForm = ({item}) => {
  const dispatch=useAppDispatch()
  const onSuccess = (googleUser) => {
    const id_token = googleUser.getAuthResponse().id_token
    dispatch(googleLogin(id_token))
    // dispatch(googleUser.)
    
    console.log(googleUser);
    
  }
  
  const onFailure = (err: any) => {
    console.log(err);
  }


  useEffect(() => {
    
    gapi.load("client:auth2",()=>{
      gapi.auth2.init({ clientId:`${process.env.REACT_APP_MAIL_CLIENT_ID}`})
    })
   
  },[])
  
  return (
    <GoogleLogin 
    clientId={`${process.env.REACT_APP_MAIL_CLIENT_ID}`}
    // clientId='777787745107-o9br1g6ftg2iht4e3f0hfokkb9ce296a.apps.googleusercontent.com'
    // cookiePolicy={'single_host_origin'}
    onSuccess={onSuccess}
    onFailure={onFailure}
    icon={false}
    className='google-button'
    >
      {/* {children}
       */}
        <a
                // key={index}
                href={item.href}
                className=" flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
                // className='flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 '
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
    </GoogleLogin>
    // <GoogleLogin 
    // client_id={`${process.env.REACT_APP_MAIL_CLIENT_ID}`}
    // cookiepolicy='single_host_origin'
    // onSuccess={onSuccess}
    // onFailure={onFailure}/>
  )
}

export default GoogleLoginForm