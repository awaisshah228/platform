import { v4 as uuidv4 } from 'uuid';
import {recoverPersonalSignature, personalSign} from '@metamask/eth-sig-util'
import {bufferToHex} from 'ethereumjs-util';



const isValidMessageHash=(signature: string, address: string, nonce : string): boolean=> {
    let message= getArbitraryCode(address,nonce)
    const msgBufferHex = bufferToHex(Buffer.from(message, 'utf8'));
    const recoveredAddress = recoverPersonalSignature({
      data: msgBufferHex,
      signature
    });
    console.log(recoveredAddress,address)
    

    return recoveredAddress.toLowerCase() === address.toLowerCase();
  }

const getArbitraryCode = (address: string, nonce: string): string => {
  return `Welcome to BlogFore!
    Click to sign in and accept the Terms of Service:
    
    This request will not trigger a blockchain transaction or cost any gas fees.
    
    Your authentication status will reset after some time
    
    Wallet address:
    ${address}
    
    Nonce:
    ${nonce}`;
};

const generateNonce=(): string=> {
    return uuidv4();
  }
export {generateNonce,getArbitraryCode,isValidMessageHash}


// const startBlock = xx;
// const endBlock = xx;
// const allEvents = [];

// for(let i = startBlock; i < endBlock; i += 5000) {
//   const _startBlock = i;
//   const _endBlock = Math.min(endBlock, i + 4999);
//   const events = await BNBTokenContract.queryFilter(filter, _startBlock, _endBlock);
//   allEvents = [...allEvents, ...events]
// }


