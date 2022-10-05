import React from 'react'
import { useAccount, useSignMessage } from 'wagmi'
import { verifyMessage } from 'ethers/lib/utils'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ethers } from 'ethers';
import { CustomButton } from '../../utils/web3/CustomButton';


const MetaMaskLoginForm = () => {

    // const recoveredAddress = React.useRef<string>()
    // const { address, isConnecting, isDisconnected } = useAccount()
   


//   const { data, error, isLoading, signMessage } = useSignMessage({
//     onSuccess(data, variables) {
//       // Verify signature when sign message succeeds
//       const address = verifyMessage(variables.message, data)
//       console.log(address)
//       recoveredAddress.current = address
//     },
//   })
// console.log(address)

  const getMessage=async()=>{

  

  }
  return (
    <div
    className='flex justify-center w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]'
    >
        {/* <ConnectButton /> */}
        <CustomButton />
    </div>
  )
}

export default MetaMaskLoginForm