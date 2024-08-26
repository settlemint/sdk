// SPDX-License-Identifier: FSL-1.1-MIT
pragma solidity ^0.8.24;

import "@openzeppelin-contracts-5.0.2/token/ERC1155/ERC1155.sol";
import "@openzeppelin-contracts-5.0.2/access/Ownable.sol";
import "@openzeppelin-contracts-5.0.2/token/ERC1155/extensions/ERC1155Pausable.sol";
import "@openzeppelin-contracts-5.0.2/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin-contracts-5.0.2/token/ERC1155/extensions/ERC1155Supply.sol";

/// @title Generic ERC1155 Token
/// @dev Extends ERC1155 with burnable, pausable, and supply tracking functionalities.
/// @custom:security-contact support@settlemint.com
contract AssetERC1155 is ERC1155, Ownable, ERC1155Pausable, ERC1155Burnable, ERC1155Supply {
    /// @dev Constructor that initializes the contract with an empty URI and sets the deployer as the owner.
    constructor() ERC1155("") Ownable(msg.sender) { }

    /// @dev Sets a new URI for all token types.
    /// @param newuri The new URI to set.
    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    /// @dev Pauses all token transfers.
    /// @notice Can only be called by the contract owner.
    function pause() public onlyOwner {
        _pause();
    }

    /// @dev Unpauses all token transfers.
    /// @notice Can only be called by the contract owner.
    function unpause() public onlyOwner {
        _unpause();
    }

    /// @dev Mints a specified amount of tokens.
    /// @param account The address that will receive the minted tokens.
    /// @param id The token id to mint.
    /// @param amount The amount of tokens to mint.
    /// @param data Additional data with no specified format.
    /// @notice Can only be called by the contract owner.
    function mint(address account, uint256 id, uint256 amount, bytes memory data) public onlyOwner {
        _mint(account, id, amount, data);
    }

    /// @dev Mints multiple token types in a batch.
    /// @param to The address that will receive the minted tokens.
    /// @param ids An array of token ids to mint.
    /// @param amounts An array of the amounts of tokens to mint.
    /// @param data Additional data with no specified format.
    /// @notice Can only be called by the contract owner.
    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    )
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }

    /// @dev Internal function to update token balances.
    /// @param from Address tokens are transferred from.
    /// @param to Address tokens are transferred to.
    /// @param ids Array of token ids.
    /// @param values Array of token amounts.
    /// @notice This function is an override required by Solidity.
    function _update(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory values
    )
        internal
        override(ERC1155, ERC1155Pausable, ERC1155Supply)
    {
        super._update(from, to, ids, values);
    }
}
