import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { CloneFactory, CloneFactoryFactory, Logic, LogicFactory, TestProxy, TestProxyFactory } from "../typechain";

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Modifier clones", async function () {
    let contract: Logic;
    let cloner: CloneFactory;

    let [deployer, creator, admin]: SignerWithAddress[] = await ethers.getSigners();
    before(async () => {
        let logic: Logic = await (await new LogicFactory(deployer).deploy()).deployed();
        let proxy: TestProxy = await (await new TestProxyFactory(deployer).deploy(logic.address, admin.address, Buffer.from(""))).deployed();
        contract = await new LogicFactory(deployer).attach(proxy.address);

        cloner = await (await new CloneFactoryFactory(deployer).deploy()).deployed();
    });

    it("deploy the clone", async function () {
        const salt = Math.random()*1000000;
        const cloneCreation = await (await cloner.connect(creator).cloneDeterministic(contract.address, salt.toString())).wait();
        console.log(cloneCreation.events);
    });
});