import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { assert } from "console";
import { CloneFactory, CloneFactoryFactory, Logic, LogicFactory, TestProxy, TestProxyFactory } from "../typechain";

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Modifier clones", function () {
    let contract: Logic;
    let cloner: CloneFactory;

    before(async () => {
        let [deployer, creator, admin]: SignerWithAddress[] = await ethers.getSigners();
        // console.log(deployer.address, creator.address, admin.address);
        // let logic: Logic = await (await new LogicFactory(deployer).deploy()).deployed();
        // let proxy: TestProxy = await (await new TestProxyFactory(deployer).deploy(logic.address, admin.address, Buffer.from(""))).deployed();
        // contract = await new LogicFactory(deployer).attach(proxy.address);
        contract = await new LogicFactory(deployer).attach("0xb7ac8bB7B88CcE33F97f8d91F835827F846cdbBA");

        // cloner = await (await new CloneFactoryFactory(deployer).deploy()).deployed();
    });

    it("deploy the clone", async function () {
        let [deployer, creator]: SignerWithAddress[] = await ethers.getSigners();
        console.log((await ethers.getSigners()))
        let data = `0x363d608037635c60da1b3d523d60203d6004601c73${contract.address.split("x")[1].toLowerCase()}5afa3d82803e903d91603657fd5b9050808036608082515af43d82803e903d91604d57fd5bf3`
        console.log(data);
        const tx = await creator.sendTransaction({
            data: data
        });
        const cloneCreation = await tx.wait();
        console.log(cloneCreation, tx.data);
        console.log("clone created", cloneCreation.contractAddress);
        const code = await deployer.provider?.getCode(cloneCreation.contractAddress);
        console.log(code);
        let cloneLogic: Logic = await new LogicFactory(deployer).attach(cloneCreation.contractAddress);
        await (await cloneLogic.writeValue(1000)).wait();
        // assert(value.eq(100));
    });

    xit("deploy the clone using factory", async function () {
        let [deployer, creator]: SignerWithAddress[] = await ethers.getSigners();
        const salt = ethers.utils.keccak256(Buffer.from((Math.random()*1000000).toFixed(0).toString()));
        console.log("salt", salt);
        const cloneCreation = await (await cloner.connect(creator).cloneDeterministic(contract.address, salt)).wait();
        if(cloneCreation.events && deployer.provider) {
            console.log(cloneCreation.events[0].args?.clone);
            const code = await deployer.provider.getCode(cloneCreation.events[0].args?.clone);
            console.log(code);
        }
        expect(true);
    });
});