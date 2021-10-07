// SPDX-License-Identifier: MIT
pragma solidity 0.8.2;

import "hardhat/console.sol";

contract Logic {
    uint256 val;

    event ValUpdated(uint256 val);
    constructor() {
        val = 100;
    }
    function readValue() public view returns(uint256) {
        console.log("call received");
        return val;
    }

    function writeValue(uint256 _param) public {
        console.log("write received");
        val = _param;
        emit ValUpdated(_param);
    }

    fallback() external {
        console.log("Logic called");
        console.logBytes(msg.data);
    }
}