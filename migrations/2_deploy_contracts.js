const Voting = artifacts.require("Voting");//importing the contract

module.exports = function(deployer) {//deploying the contract
  const candidates = [
    web3.utils.utf8ToHex("Candidate 1"),
    web3.utils.utf8ToHex("Candidate 2"),
    web3.utils.utf8ToHex("Candidate 3")
  ];
  deployer.deploy(Voting, candidates);
};
