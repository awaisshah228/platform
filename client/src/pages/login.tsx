import React from 'react'
import PageLogin from '../containers/PageLogin'
import PrivatePage from '../routers/PrivatePage'

const Login = () => {
  return (
    <PrivatePage>
        <PageLogin />
    </PrivatePage>
  )
}

export default Login