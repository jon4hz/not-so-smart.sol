// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol';
import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';
import "hardhat/console.sol";

struct Pool {
        address token0;
        address token1;
        uint112 reserve0;
        uint112 reserve1;
    }

contract LPGetter {
    function getAllLPs(address factory) public view returns (Pool[] memory) {
        uint _all = IUniswapV2Factory(factory).allPairsLength();
        console.log("pair lenght is %d", _all);
        Pool[] memory pools = new Pool[](_all);
        for (uint i = 0; i < _all-1; i++) {
            address pairAddress = IUniswapV2Factory(factory).allPairs(i);
            (uint112 r0, uint112 r1,) = IUniswapV2Pair(pairAddress).getReserves();
            address t0 = IUniswapV2Pair(pairAddress).token0();
            address t1 = IUniswapV2Pair(pairAddress).token1();
            pools[i] = Pool(t0, t1, r0, r1);
        }
        return pools;
    }
}