// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Cryvora Token ($CVR)
 * @dev Secure, lightweight ERC-20 token for the Cryvora Web3 Ecosystem.
 * Total Supply: 1,000,000,000 CVR (1 Billion, Fixed Supply)
 * Deployment: Automatically sets contract ownership and total supply to deployer (msg.sender).
 */
contract CryvoraToken is ERC20, ERC20Burnable, Ownable {

    /// @notice Initial total supply: 1 Billion $CVR (with 18 decimals)
    uint256 private constant INITIAL_SUPPLY = 1_000_000_000 * 1e18;

    constructor() 
        ERC20("Cryvora Token", "CVR") 
        Ownable(msg.sender) 
    {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    /**
     * @notice Allows owner to recover accidentally sent foreign ERC20 tokens.
     * @param tokenAddress Address of foreign ERC20 token to recover
     * @param amount Amount to recover
     */
    function recoverForeignToken(address tokenAddress, uint256 amount) external onlyOwner {
        require(tokenAddress != address(this), "Cannot recover CVR token");
        require(tokenAddress != address(0), "Invalid token address");
        IERC20(tokenAddress).transfer(owner(), amount);
    }
}
