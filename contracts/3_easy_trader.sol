// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol';
import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';
import "hardhat/console.sol";

struct LP {
    address a;
    address t0;
    address t1;
    uint112 r0;
    uint112 r1;
}

struct Pair {
    address t0;
    address t1;
}

contract EasyTrader is AccessControl, Pausable, Ownable {
    address[] connectors;

    bytes32 public constant CONNECTOR_ROLE = keccak256("CONNECTOR_ROLE");

    constructor(address[] memory _connectors) Pausable() {
        connectors = _connectors;
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function getConnectors() public view returns (address[] memory)  {
        return connectors;
    }

    function addConnector(address _connector) public whenNotPaused() onlyRole(CONNECTOR_ROLE) {
        require(_connector != address(0), "address cant be 0");
        connectors.push(_connector);
    }

    function deleteConnector(address _connector) public whenNotPaused() onlyRole(CONNECTOR_ROLE) {
        require(_connector != address(0), "address cant be 0");
        uint len = connectors.length;
        for (uint i = 0; i < len; i++) {
            if (connectors[i] == _connector) {
                delete connectors[i];
            }
        }
    }
    
    function getPossibleLPs(Pair[] calldata pairs, address factory) public view returns (LP[] memory) {
        LP[] memory lps = new LP[](pairs.length);
        for (uint i = 0; i < pairs.length; i++) {
            address pairAddress = IUniswapV2Factory(factory).getPair(pairs[i].t0, pairs[i].t1);
            if (pairAddress == address(0)) {
                continue;
            }
            (uint112 r0, uint112 r1,) = IUniswapV2Pair(pairAddress).getReserves();
            address t0 = IUniswapV2Pair(pairAddress).token0();
            address t1 = IUniswapV2Pair(pairAddress).token1();
            lps[i] = LP(pairAddress, t0, t1, r0, r1);
        }
        return lps;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

}