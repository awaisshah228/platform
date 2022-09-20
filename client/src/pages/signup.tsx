import React from 'react'
import PageSignUp from '../containers/PageSignup'
import RedirectHome from '../routers/RedirectHome'

const Signup = () => {
  return (
    <RedirectHome>
      <PageSignUp />
    </RedirectHome>
    
  )
}

export default Signup