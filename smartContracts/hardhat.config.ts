import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
     hardhat: {
      // Required for real DNS record tests
      // initialDate: '2019-03-15T14:06:45.000+13:00',
      saveDeployments: true,
      tags: ['test', 'legacy', 'use_root'],
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    owner: {
      default: 1,
    },
  }
  
};

export default config;
