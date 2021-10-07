
import "@nomiclabs/hardhat-waffle";
import '@nomiclabs/hardhat-ganache';
import 'hardhat-typechain';

import { task } from "hardhat/config";
import { HardhatUserConfig } from 'hardhat/types';

import { privateKeys, kovanPrivateKeys } from "./wallet/keys";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

function getHardhatPrivateKeys() {
    return privateKeys.map((key) => {
        const ONE_MILLION_ETH = '1000000000000000000000000';
        return {
            privateKey: key,
            balance: ONE_MILLION_ETH,
        };
    });
}

const config: HardhatUserConfig = {
    defaultNetwork: 'hardhat',
    networks: {
        hardhat: {
            forking: {
                url: 'https://eth-mainnet.alchemyapi.io/v2/snGskhAXMQaRLnJaxbcfOL7U5_bSZl_Y',
                blockNumber: 12869777,
            },
            blockGasLimit: 12500000,
            accounts: getHardhatPrivateKeys(),
            initialBaseFeePerGas: 1,
            gasPrice: 1,
        },
        localhost: {
            url: 'http://127.0.0.1:8545',
            timeout: 100000,
            accounts: { mnemonic: "myth like bonus scare over problem client lizard pioneer submit female collect" },
            loggingEnabled: process.env.LOGGING && process.env.LOGGING.toLowerCase() === 'true' ? true : false,
        },
        kovan: {
            chainId: 42,
            url: "https://eth-kovan.alchemyapi.io/v2/snGskhAXMQaRLnJaxbcfOL7U5_bSZl_Y",
            accounts: kovanPrivateKeys
        }
    },
    solidity: {
        version: '0.8.2',
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    mocha: {
        timeout: 20000000,
    },
};


export default config;
