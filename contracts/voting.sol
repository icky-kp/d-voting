pragma solidity >=0.5.0;

contract voting {
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
