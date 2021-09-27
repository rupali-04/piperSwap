//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract MySmartContract {
    IERC20 dai;
    constructor(address _daiToken) {
        dai = IERC20(_daiToken);
    }

    function send() view public returns (uint) {
        return dai.balanceOf(address(msg.sender));
    }
}

