// Check if Metamask is installed
if (typeof web3 !== 'undefined') {
  // Use Metamask provider
  web3 = new Web3(web3.currentProvider);
  console.log('Connected to Metamask');
} else {
  // Handle case where Metamask is not installed
  console.log('Please install Metamask');
}

// Contract ABI (Application Binary Interface)
var contractABI=[
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "votes",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "candidates",
    "outputs": [
      {
        "name": "",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalVotesCast",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_candidates",
        "type": "bytes32[]"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "candidate",
        "type": "bytes32"
      }
    ],
    "name": "vote",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "candidate",
        "type": "bytes32"
      }
    ],
    "name": "totalVotesFor",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "candidate",
        "type": "bytes32"
      }
    ],
    "name": "validCandidate",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

// Contract address
var contractAddress = '0xF7c86B383142E66a5D55352f367b81Ac02F3e283';

// Contract instance
var contractInstance = new web3.eth.Contract(contractABI, contractAddress);

// Vote function
function vote() {
  var candidate = document.getElementById('candidate').value;

  // Send transaction using Metamask
  web3.eth.getAccounts().then(function (accounts) {
    var account = accounts[0];
    return contractInstance.methods.vote(web3.utils.utf8ToHex(candidate)).send({ from: account });
  }).then(function (receipt) {
    console.log(receipt);
  }).catch(function (error) {
    console.error(error);
  });
}

// Attach vote function to form submit event
document.getElementById('vote-form').addEventListener('submit', function(event) {
  event.preventDefault();
  vote();
});
