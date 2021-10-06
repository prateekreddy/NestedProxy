// SPDX-License-Identifier: MIT
pragma solidity 0.8.2;

//solhint-disable max-line-length
//solhint-disable no-inline-assembly

contract CloneFactory {
    event CloneCreated(address clone);
    // 635c60da1b3d523d60a03d60203d73059ffafdc6ef594230de44f824e2bd0a51ca5ded5afa3d82803e903d91603057fd5b905080369080378080368080515af43d82803e903d91604b57fd5bf3
    function clone(address implementation) public returns (address result) {
        assembly {
            let ptr := mload(0x40)
            mstore(ptr, 0x635c60da1b3d523d60a03d60203d730000000000000000000000000000000000)
            mstore(add(ptr, 0xf), shl(0x60, implementation))
            mstore(add(ptr, 0x23), 0x5afa3d82803e903d91603057fd5b905080369080378080368080515af43d8280)
            mstore(add(ptr, 0x43), 0x3e903d91604b57fd5bf300000000000000000000000000000000000000000000)
            result := create(0, ptr, 0x4d)
        }
        emit CloneCreated(result);
    }

    function cloneDeterministic(address implementation, bytes32 salt) public returns (address instance) {
        assembly {
            let ptr := mload(0x40)
            mstore(ptr, 0x635c60da1b3d523d60a03d60203d730000000000000000000000000000000000)
            mstore(add(ptr, 0xf), shl(0x60, implementation))
            mstore(add(ptr, 0x23), 0x5afa3d82803e903d91603057fd5b905080369080378080368080515af43d8280)
            mstore(add(ptr, 0x43), 0x3e903d91604b57fd5bf300000000000000000000000000000000000000000000)
            instance := create2(0, ptr, 0x4d, salt)
        }
        require(instance != address(0), "ERC1167: create2 failed");
        emit CloneCreated(instance);
    }
}