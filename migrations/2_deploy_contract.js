const Voting = artifacts.require("Voting");//importing the contract

module.exports = function(deployer, _network, accounts) {//deploying the contract
  const candidates = [
    web3.utils.asciiToHex("Candidate 1"),
    web3.utils.asciiToHex("Candidate 2"),
    web3.utils.asciiToHex("Candidate 3")
  ];
  deployer.deploy(Voting, candidates, { from: accounts[0] });
};
