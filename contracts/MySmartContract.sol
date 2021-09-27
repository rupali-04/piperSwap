// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import "./PiperToken.sol";

contract MySmartContract {
    address public owner;
    IERC20 public dai;
    PiperToken public pToken;

    event Send(uint amount);
    event Unsend(uint amount);
    
    address[] public investers;
    mapping(address => uint) public investingBalance;
    mapping(address => bool) public hasInvested;
    mapping(address => bool) public isInvesting;



    constructor(address _daiToken, PiperToken _pToken) {
        dai = IERC20(_daiToken);
	    pToken = _pToken;
	    owner = msg.sender;
    }

    function bal() view public returns (uint) {
        return dai.balanceOf(address(msg.sender));
    }
    
    function investTokens(uint _amount) public {
        // Require amount greater than 0
        require(_amount > 0, "amount cannot be 0");

        // Trasnfer Mock Dai tokens to this contract for investing
        dai.transferFrom(msg.sender, address(this), _amount);
	    pToken.transfer(msg.sender, _amount);

        // Update investing balance
        investingBalance[msg.sender] = investingBalance[msg.sender] + _amount;

        // Add user to investers array *only* if they haven't invested already
        if(!hasInvested[msg.sender]) {
            investers.push(msg.sender);
        }

        // Update investing status
        isInvesting[msg.sender] = true;
        hasInvested[msg.sender] = true;

        emit Send(_amount);
    }

    function withdraw() public {
        // Fetch staking balance
        uint balance = investingBalance[msg.sender];

        // Require amount greater than 0
        require(balance > 0, "investing balance cannot be 0");

        // Transfer Mock Dai tokens to this contract for staking
        dai.transfer(msg.sender, balance);

        // Reset investing balance
        investingBalance[msg.sender] = 0;

        // Update investing status
        isInvesting[msg.sender] = false;
        emit Unsend(balance);
    }
	
	
}

