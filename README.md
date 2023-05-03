# d-voting - A Decentralized voting mechanism

Drafted By Kaustav Kamakhi Patro 

[https://github.com/icky-kp/d-voting](https://github.com/icky-kp/d-voting)

---

## I. Introduction

### A. The Current State of The Art and It’s Limitations

During election periods, incidents of electoral violence are unfortunately not uncommon, as often reported in newspapers and magazines. These incidents can include protests, riots, violence against civilians, explosions, battles, and even bloodshed near polling booths./ Additionally, traditional voting systems are often plagued with issues such as lack of transparency, vulnerability to fraud and manipulation, high implementation costs, limited physical accessibility to polling stations, and slow result announcement. So, an alternative to this method of voting, which can mitigate these issues is the need of the hour.

[Securing Democracy: Electoral Violence in India](https://acleddata.com/2019/04/12/securing-democracy-electoral-violence-in-india/)

### B. Proposed Solution

There are many solutions proposed to address the limitations of traditional voting system but decentralized voting, where data is kept on a secure, immutable blockchain is the best solution to the problem addressed in the above section, due to the following reasons : 

1. Transparency and tamper proof record of voting data.
2. Secure and immutable
3. Accessible to a large demographic
4. Efficient and non-redundant
5. Decentralized

D-voting is  decentralized app which helps to hold elections using the ethereum blockchain network. This web application provides an interface for users to vote for their favorite candidate using their metamask wallet extension. 

A small gas fee is charged for every vote transaction. 

 

## II. Implementation

### A.Technologies used to make d-voting dapp

1. Solidity Programming language to write the central smart contract
2. Javascript, HTML and CSS to build a simple web application
3. web3.js  which is Ethereum javascript API.
4. Ganache private blockchain testing network
5. Truffle suit development invironment which uses the Ethereum Virtual Machine (EVM)
6. Nodejs and npm

### B. Components of the dapp

The 2 components of the d-voting dapp are:

1. The client side web interface
2. The smart contract 

### C. Project setup

### 1. initialization

The project is setup using the command inside the empty project directory:

```bash
truffle init
```

This initializes a new truffle project structure in the directory with several sub directories:

 `contracts`
 `migrations`
 `test`
 `build`
 `node_modules`

`truffle-config.js`
`package.json`

The `contracts` folder has already a pre-written smart contract called Migrations.sol :

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Migrations {
  address public owner = msg.sender;
  uint public last_completed_migration;

  modifier restricted() {
    require(
      msg.sender == owner,
      "This function is restricted to the contract's owner"
    );
    _;
  }

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }
}
```

This solidity program basically keeps track of the deployments that are to be run on the blockchain.

### 2. Voting.sol smart contract

Create a new file called “Voting.sol” inside the `contracts` directory to write the backbone smart contract that drives the dapp.

```solidity
pragma solidity >=0.5.0;

contract Voting {
    mapping (bytes32 => uint256) public votes;
    bytes32[] public  candidates;
    uint256 public totalVotesCast;

    constructor(bytes32[] memory _candidates) public {
        candidates = _candidates;
    }

    function vote(bytes32 candidate) public {
        require(validCandidate(candidate), "Invalid candidate");
        votes[candidate]++;
        totalVotesCast++;
    }

    function totalVotesFor(bytes32 candidate) public view returns (uint256) {
        require(validCandidate(candidate), "Invalid candidate");

        return votes[candidate];
    }

    function validCandidate(bytes32 candidate) public view returns (bool) {
        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i] == candidate) {
                return true;
            }
        }
        return false;
    }
}
```

The contract allows users to cast their votes for a set of predefined candidates, and it keeps track of the total number of votes cast.

P.S. the bytes32 data type can be replaced by string data type when used on solidity version 0.8.0, which has been shown on the remix IDE.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.5.0;

contract Voting {
    mapping (string => uint256) public votes;
    string[] public candidates;
    uint256 public totalVotesCast;

    constructor(string[] memory _candidates) {
        require(_candidates.length > 0, "Candidates list is empty");
        candidates = _candidates;
    }

    function vote(string memory candidate) public {
        require(validCandidate(candidate), "Invalid candidate");
        votes[candidate]++;
        totalVotesCast++;
    }

    function totalVotesFor(string memory candidate) public view returns (uint256) {
        require(validCandidate(candidate), "Invalid candidate");
        return votes[candidate];
    }

    function validCandidate(string memory candidate) public view returns (bool) {
        for (uint256 i = 0; i < candidates.length; i++) {
            if (keccak256(bytes(candidates[i])) == keccak256(bytes(candidate))) {
                return true;
            }
        }
        return false;
    }
}
```

now, initialize the Ganache local blockchain (The Ganache Application must run throughout the testing of the smart contract).

Compile the solidity smart contract using the command

```solidity
truffle compile
```

This will convert the .sol program into bytecode which can be read by the EVM.

### 3.Setting up the json files

Before deploying the truffle project to the local blockchain, It’s important to ensure that `bs-config.json, package.json, truffle-config.js` are properly tweaked.

`bs-config.json` helps in letting the web server know where to look for files inside the root directory to display on webpage.

```json
{
  "server": {
    "baseDir": ["./src", "./build/contracts"],
    "routes": {
      "/vendor": "./node_modules"
    }
  },
  "watchOptions": {
    "ignoreInitial": true,
    "ignored": ["node_modules"]
  }
}
```

`package.json` contains the metadata and various dependencies of the project

```json
{
  "name": "voting-app",
  "version": "1.0.0",
  "description": "Simple web app for voting on a smart contract using MetaMask",
  "main": "index.js",
  "scripts": {
    "start": "lite-server",
    "dev": "lite-server --config bs-config.js"
  },
  "dependencies": {
    "bootstrap": "^5.1.0",
    "web3": "^1.6.0"
  },
  "devDependencies": {
    "lite-server": "^2.6.1",
    "truffle": "5.0.2",
    "truffle-contract": "3.0.6"
  },
  "license": "MIT"
}
```

`truffle-config.js` is used to configure the truffle project. It uses the Ganache port 7545 and the default ganache network_id 5777.

```jsx
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5777" 
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}
```

### 4.Client-side interface

The `src` directory contains the app.js script for index.html file.

```jsx
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
var contractAddress = '0xA27678210BE615DCa26E540566E1df4E4bD9DC22';

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
```

This script attempts to specify the functions which can be accessed by the web3.js library. 

It also creates an instance of the smart contract by passing the ABI(Application Binary Interface) and contract address to the web3.eth.Contract() constructor. The rest of the code attempts to read from the user input, from the index.html file using the vote() function.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Voting DApp</title>
  </head>
  <body>
    <h1>Vote for your favorite candidate</h1>
    <form id="vote-form">
      <label for="candidate">Choose a candidate:</label>
      <select id="candidate" name="candidate">
        <option value="Candidate1">Candidate1</option>
        <option value="Candidate2">Candidate2</option>
        <option value="Candidate3">Candidate3</option>
      </select>
      <button type="submit">Vote</button>
    </form>
    <script src="app.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/web3@1.3.5/dist/web3.min.js"></script>
  </body>
</html>
```

This html file contains a very basic template based voting form which also includes a script tag that imports the app.js file and the web3.min.js library.

## III. Use Cases and Limitations

Use cases of the current version of d-voting dapp :

1. Can be used as a voting application in corporate board meetings.
2. This could be to facilitate small-scale elections in regions where the transportation of physical ballots is challenging.
3. A similar implementation can be used to make a quiz web application.

**Limitations:**

1. The availability of this technology can be affected by network limitations.
2. Without a proper user interface, This dapp requires a fair bit of technical expertise to operate.
3. The smart contract in this dapp may not be fully secure.
4. In order to cast a vote on this dapp, a gas fee is required, which necessitates that voters possess ether in their wallets. 

## IV. Learning and Challenges Faced

The development of the d-voting dapp was a challenging yet rewarding experience, as it required completion within a tight 48-hour timeframe for assessment by the research team of ACM student chapter at VIT Vellore. Despite the pressure, this opportunity allowed me to refine existing skills and acquire new knowledge across a range of technologies in a short amount of time. 

**Challenges I faced:**

1. With limited experience in front-end development, I encountered challenges in scripting the web interface, incorporating libraries, and other related tasks.
2. Working with JSON files was particularly difficult due to my limited familiarity with their structure and usage.
3. I had difficulty managing the project as a single thread, as the project required me to make continuous tweaks to the json files, the smart contracts and the html files simultaneously.

**Learning:**

1. This project made me learn a fair bit of javascript, which provided me with invaluable experience that can help me make improvements in the project.
2. The project exposed me to the condition of working within a time constraint, which helped me develop time management skills.These skills can be help me crack hackathons in the future.
3. It also helped me to expand my knowledge on blockchain technology and how to apply blockchain technology in real life situations.
4. The project gave me a feel of what research work looks like in technical domain.
