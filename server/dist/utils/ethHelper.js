"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidMessageHash = exports.getArbitraryCode = exports.generateNonce = void 0;
const uuid_1 = require("uuid");
const eth_sig_util_1 = require("@metamask/eth-sig-util");
const ethereumjs_util_1 = require("ethereumjs-util");
const isValidMessageHash = (signature, address, nonce) => {
    let message = getArbitraryCode(address, nonce);
    const msgBufferHex = (0, ethereumjs_util_1.bufferToHex)(Buffer.from(message, 'utf8'));
    const recoveredAddress = (0, eth_sig_util_1.recoverPersonalSignature)({
        data: msgBufferHex,
        signature
    });
    console.log(recoveredAddress, address);
    return recoveredAddress.toLowerCase() === address.toLowerCase();
};
exports.isValidMessageHash = isValidMessageHash;
const getArbitraryCode = (address, nonce) => {
    return `Welcome to BlogFore!
    Click to sign in and accept the Terms of Service:
    
    This request will not trigger a blockchain transaction or cost any gas fees.
    
    Your authentication status will reset after some time
    
    Wallet address:
    ${address}
    
    Nonce:
    ${nonce}`;
};
exports.getArbitraryCode = getArbitraryCode;
const generateNonce = () => {
    return (0, uuid_1.v4)();
};
exports.generateNonce = generateNonce;
