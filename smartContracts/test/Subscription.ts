import { expect } from "chai";
import { ethers } from "hardhat";



describe('Subscription',function(){

    async function deploySubs() {
        // const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
        // const ONE_GWEI = 1_000_000_000;
    
        // const lockedAmount = ONE_GWEI;
        // const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;
    
        // // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();
    
        const Subscription = await ethers.getContractFactory("Subscription");
        const sub = await Subscription.deploy();
    
        return { sub, owner, otherAccount };
      }

})