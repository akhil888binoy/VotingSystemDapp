// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Voting {
    address private chairperson;

    struct Proposal {
        string name;
        uint256 voteCount;
    }

    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint8 vote;
    }

    mapping(address => Voter) addressToVoter;
    Proposal[] public proposals;

    constructor() {
        chairperson = msg.sender;
    }

    modifier OnlyChairperson() {
        require(msg.sender == chairperson, "Only chairperson can call this function");
        _;
    }

    function createProposal(string memory _name) external {
        Proposal storage newproposal = proposals.push();
        newproposal.name = _name;
        newproposal.voteCount = 0;
    }

    function registerNewVoter(address voter) external OnlyChairperson {
        require(!addressToVoter[voter].isRegistered, "Voter is already Registered");
        addressToVoter[voter] = Voter({isRegistered: true, hasVoted: false, vote: 0});
    }

    function vote(uint8 proposalIndex) external {
        require(addressToVoter[msg.sender].isRegistered, "Voter is not Registered");
        require(!addressToVoter[msg.sender].hasVoted, "Voter already voted");
        require(proposalIndex < proposals.length, "Invalid proposal index");

        addressToVoter[msg.sender].hasVoted = true;
        addressToVoter[msg.sender].vote = proposalIndex;
        proposals[proposalIndex].voteCount += 1;
    }

    function winningProposal() public view returns (uint8) {
        uint256 highestVoteCount = 0; // Initialize the highest vote count
        uint8 winningProposalIndex = 0; // Initialize the winning proposal index
        for (uint256 i = 0; i < proposals.length; i++) {
            if (proposals[i].voteCount > highestVoteCount) {
                highestVoteCount = proposals[i].voteCount;
                winningProposalIndex = uint8(i);
            }
        }
        return winningProposalIndex;
    }

    function WinnerName() external view returns (string memory) {
        uint8 winningProposalIndex = winningProposal();
        string memory winnerName = proposals[winningProposalIndex].name;
        return winnerName;
    }

    function getProposals() external view returns (Proposal[] memory) {
        return proposals;
    }

    /////////////////////////
    ///Getter Functions ////
    ///////////////////////

    function getChairperson() external view returns (address) {
        return chairperson;
    }

    function getAddressToVoter(address voteraddress) external view returns (Voter memory) {
        return addressToVoter[voteraddress];
    }

    function getProposalVoteCount(uint256 proposalIndex) external view returns (uint256) {
        require(proposalIndex < proposals.length, "Invalid proposal index");
        return proposals[proposalIndex].voteCount;
    }
}
