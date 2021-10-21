// SPDX-License-Identifier: WTFPL
pragma solidity ^0.8.4;

contract Hello {
    function sayHello(string calldata name) public pure returns (string memory) {
        return name;
    }
}