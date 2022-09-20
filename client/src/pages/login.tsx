import React from 'react'
import PageLogin from '../containers/PageLogin'
import RedirectHome from '../routers/RedirectHome'
const Login = () => {
  return (
    <RedirectHome>
       <PageLogin />
    </RedirectHome>
   
       
  )
}

export default Login