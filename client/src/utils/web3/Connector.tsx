import "@rainbow-me/rainbowkit/styles.css";
import { createAuthenticationAdapter, RainbowKitAuthenticationProvider } from '@rainbow-me/rainbowkit';
import { SiweMessage } from 'siwe';
import { AuthenticationStatus } from "@rainbow-me/rainbowkit";

import React from "react";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  Chain,
} from "@rainbow-me/rainbowkit";
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";



// const authenticationAdapter = createAuthenticationAdapter({
//   getNonce: async () => {
//     // const response = await fetch('/api/nonce');
//     // return await response.text();
//     return (123).toString();
//   },
//   createMessage: ({ nonce, address, chainId }) => {
//     return new SiweMessage({
//       domain: window.location.host,
//       address,
//       statement: 'Sign in with Ethereum to the app.',
//       uri: window.location.origin,
//       version: '1',
//       chainId,
//       nonce,
//     });
//   },
//   getMessageBody: ({ message }) => {
//     return message.prepareMessage();
//   },
//   verify: async ({ message, signature }) => {
//     const verifyRes = await fetch('/api/verify', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ message, signature }),
//     });
//     return Boolean(verifyRes.ok);
//   },
//   signOut: async () => {
//     await fetch('/api/logout');
//   },
// });


// import { Chain, getDefaultWallets } from '@rainbow-me/rainbowkit';



export const { provider, chains } = configureChains(
  [chain.ropsten],
  [
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Token Generator",
  chains,
});

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
});

export function Web3ConnectorConfig({ children }) {
  
  return (
    <>
      <WagmiConfig client={wagmiClient}>
      {/* <RainbowKitAuthenticationProvider
        adapter={authenticationAdapter}
        status='unauthenticated'
      > */}
        <RainbowKitProvider
        
        theme={darkTheme({
          accentColor: "#FF9200",
          accentColorForeground: "white",
          borderRadius: "large",
          overlayBlur: "large",
          fontStack: "rounded",
        })}
        coolMode
        chains={chains}
        
      >
       
          {children}
        {/* </ContractContext.Provider> */}
      </RainbowKitProvider>
      {/* </RainbowKitAuthenticationProvider> */}
        
      </WagmiConfig>
     
      
    </>
  );
}