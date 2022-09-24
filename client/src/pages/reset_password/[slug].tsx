import React, { useEffect } from 'react'
import ResetPass from '../../components/Form/ResetPass'
import { useAppDispatch } from '../../app/hook'
import { resetAccessToken } from '../../app/auth/authSlice'
import { useParams } from 'react-router-dom';

const Index = () => {

  const dispacth=useAppDispatch()
  const {slug}=useParams()

  useEffect(() => {
    dispacth(resetAccessToken(slug))
  }, [])
  
  return (
    <div>
      <ResetPass />
    </div>
  )
}

export default Index