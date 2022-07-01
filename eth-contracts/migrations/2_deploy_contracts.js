// migrating the appropriate contracts
var SquareVerifier = artifacts.require("../../zokrates/code/square/verifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

module.exports = function(deployer) {

  deployer.deploy(SquareVerifier).then(() => {
      return deployer.deploy(SolnSquareVerifier, SquareVerifier.address);
   })
};
