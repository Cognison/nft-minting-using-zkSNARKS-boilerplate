pragma solidity >=0.4.21 <0.6.0;

import "./ERC721Mintable.sol";
import "../../zokrates/code/square/verifier.sol";

contract SquareVerifier is Verifier {}

contract SolnSquareVerifier is SquareVerifier, MyNFTERC721Token {
    
    struct Solution {
        uint256 index;
        address account;
    }
    
    Solution[] private solutions;

    mapping(bytes32 => Solution) uniqueSolutions;

    event AddedSolution(uint256 index, address account);

    function addSolution(
        uint256 idx, address acct, uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[2] memory input
    ) public returns(bool) {

         bytes32 key = keccak256(abi.encodePacked(a, b, c, input));

        Solution memory solution = Solution({index: idx, account: acct});

        solutions.push(solution);

        uniqueSolutions[key] = solution;

        emit AddedSolution(idx, acct);
    }

    // Allows minting a new NFT only after the solution has been verified
    function mint(uint256 tokenId, address to, uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[2] memory input) public returns(bool) {
        
        require(solutions[tokenId].index != tokenId, "The solution has already been used before");

        require(verifyTx(a, b, c, input), "Proof not valid");

        addSolution(tokenId, to, a, b, c, input);

        return super.mint(to, tokenId);

    }
}
