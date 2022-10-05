import { verifyMessage } from 'ethers/lib/utils'
import React, { useEffect, useState } from 'react'
import { useSignMessage } from 'wagmi'
import { getAPI, postAPI } from '../fetchData'
import { useAppDispatch } from '../../app/hook'
import { metaMaskLogin } from '../../app/auth/authActions'

const Login = ({address}) => {
  const dispatch=useAppDispatch()

  const [nonce, setnonce] = useState('')
  const [sig, setsig] = useState('')
    const { data, error, isLoading, signMessage } = useSignMessage({
        onSuccess(data, variables) {
          console.log('i amnonce ',nonce)

          // dispatch(metaMaskLogin({signature:data,nonce}))
          // setsig(data)
          console.log(data)
          setsig(data)
            // console.log(variables.message)
            // console.log(data)
        //   // Verify signature when sign message succeeds
        //   const address = verifyMessage(variables.message, data)
        // //   recoveredAddress.current = address
        // console.log(address)

        },
      })

    const getMessage=async(address)=>{

        try {

            const res= await postAPI('auth/nonce',{address})
            setnonce(res.data.nonce)
            console.log(nonce)
            // c
            signMessage({message:res.data.msg})
           
          //  console.log(res)
            
        } catch (error) {
            
        }

        

        // console.log(res)

    }

    useEffect(()=>{
         getMessage(address)
    },[])
    useEffect(()=>{
      if(sig && nonce){
        dispatch(metaMaskLogin({signature:sig,nonce}))
      }
        //  getMessage(address)
                 

    },[sig,nonce])
  return (
    <div>{address}</div>
  )
}

export default Login