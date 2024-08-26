// SPDX-License-Identifier: FSL-1.1-MIT
pragma solidity ^0.8.24;

import { Test, console } from "forge-std/Test.sol";
import { AssetERC1155 } from "../src/AssetERC1155.sol";

contract AssetERC1155Test is Test {
    AssetERC1155 public assetERC1155;
    address public owner;
    address public user1;
    address public user2;

    function setUp() public {
        owner = address(this);
        user1 = address(0x1);
        user2 = address(0x2);
        assetERC1155 = new AssetERC1155();
    }

    function testInitialState() public view {
        assertEq(assetERC1155.owner(), owner);
        assertEq(assetERC1155.uri(0), "");
    }

    function testSetURI() public {
        string memory newURI = "https://example.com/token/";
        assetERC1155.setURI(newURI);
        assertEq(assetERC1155.uri(0), newURI);
    }

    function testSetURINotOwner() public {
        vm.prank(user1);
        vm.expectRevert();
        assetERC1155.setURI("https://example.com/token/");
    }

    function testMint() public {
        uint256 tokenId = 1;
        uint256 amount = 100;
        assetERC1155.mint(user1, tokenId, amount, "");
        assertEq(assetERC1155.balanceOf(user1, tokenId), amount);
    }

    function testMintNotOwner() public {
        vm.prank(user1);
        vm.expectRevert();
        assetERC1155.mint(user2, 1, 100, "");
    }

    function testMintBatch() public {
        uint256[] memory ids = new uint256[](2);
        ids[0] = 1;
        ids[1] = 2;
        uint256[] memory amounts = new uint256[](2);
        amounts[0] = 100;
        amounts[1] = 200;
        assetERC1155.mintBatch(user1, ids, amounts, "");
        assertEq(assetERC1155.balanceOf(user1, 1), 100);
        assertEq(assetERC1155.balanceOf(user1, 2), 200);
    }

    function testMintBatchNotOwner() public {
        uint256[] memory ids = new uint256[](2);
        uint256[] memory amounts = new uint256[](2);
        vm.prank(user1);
        vm.expectRevert();
        assetERC1155.mintBatch(user2, ids, amounts, "");
    }

    function testBurn() public {
        uint256 tokenId = 1;
        uint256 amount = 100;
        assetERC1155.mint(user1, tokenId, amount, "");

        vm.prank(user1);
        assetERC1155.burn(user1, tokenId, amount);
        assertEq(assetERC1155.balanceOf(user1, tokenId), 0);
    }

    function testBurnBatch() public {
        uint256[] memory ids = new uint256[](2);
        ids[0] = 1;
        ids[1] = 2;
        uint256[] memory amounts = new uint256[](2);
        amounts[0] = 100;
        amounts[1] = 200;
        assetERC1155.mintBatch(user1, ids, amounts, "");

        vm.prank(user1);
        assetERC1155.burnBatch(user1, ids, amounts);
        assertEq(assetERC1155.balanceOf(user1, 1), 0);
        assertEq(assetERC1155.balanceOf(user1, 2), 0);
    }

    function testPause() public {
        assetERC1155.pause();
        assertTrue(assetERC1155.paused());
    }

    function testPauseNotOwner() public {
        vm.prank(user1);
        vm.expectRevert();
        assetERC1155.pause();
    }

    function testUnpause() public {
        assetERC1155.pause();
        assetERC1155.unpause();
        assertFalse(assetERC1155.paused());
    }

    function testUnpauseNotOwner() public {
        assetERC1155.pause();
        vm.prank(user1);
        vm.expectRevert();
        assetERC1155.unpause();
    }

    function testTransferWhenPaused() public {
        uint256 tokenId = 1;
        uint256 amount = 100;
        assetERC1155.mint(user1, tokenId, amount, "");
        assetERC1155.pause();

        vm.prank(user1);
        vm.expectRevert();
        assetERC1155.safeTransferFrom(user1, user2, tokenId, amount, "");
    }

    function testSupply() public {
        uint256 tokenId = 1;
        uint256 amount = 100;
        assetERC1155.mint(user1, tokenId, amount, "");
        assertEq(assetERC1155.totalSupply(tokenId), amount);
    }

    function testExists() public {
        uint256 tokenId = 1;
        assertFalse(assetERC1155.exists(tokenId));
        assetERC1155.mint(user1, tokenId, 1, "");
        assertTrue(assetERC1155.exists(tokenId));
    }
}
