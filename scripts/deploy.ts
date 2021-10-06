import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ethers } from 'hardhat';
import * as fs from "fs";

async function deploy() {
    const [ deployer ]: SignerWithAddress[] = await ethers.getSigners();
    
    const data = fs.readFileSync("../contracts/Greeter.bytecode");
    const tx = {
        data,
    }

    const txReceipt = await (await deployer.sendTransaction(tx)).wait();
    console.log(txReceipt.contractAddress);
}