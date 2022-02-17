// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./libraries/ERC20.sol";
import "./libraries/AccessControl.sol";

/**
 * @title ERC20 Token
 * @notice mintable only by admins, no approval needed for a contract
 */
contract ERC20Key is ERC20, AccessControl {

    /**
     * @dev Constructor
     */
    constructor(
        string memory name,
        string memory symbol
    ) ERC20(name, symbol) {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    function mint(address account, uint256 amount)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        _mint(account, amount);
    }

    function mintMultiple(
        address[] calldata accounts,
        uint256[] calldata amounts
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        for (uint256 j = 0; j < accounts.length; j++) {
            _mint(accounts[j], amounts[j]);
        }
    }
}