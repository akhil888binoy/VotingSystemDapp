# Decentralized Voting System

## Overview

The Decentralized Voting System is a blockchain-based application that facilitates secure, transparent, and immutable voting processes. Built on Ethereum, this system uses smart contracts to handle the creation of proposals and the voting process, ensuring a tamper-proof record of votes.

## Features

- **Proposal Creation:** Allows users to create new proposals for voting.
- **Voting:** Enables registered voters to cast their votes on proposals.
- **Voting Status:** Provides feedback on whether a user has already voted or not.
- **Vote Counting:** Accurately counts and displays votes for each proposal.
- **Access Control:** Ensures only registered voters can participate.

## Tech Stack

- **Smart Contracts:** Solidity
- **Blockchain Interaction:** Viem, Wagmi
- **Front-End Framework:** React
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- MetaMask or another Ethereum wallet

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/akhil888binoy/VotingSystemDapp.git
    ```
2. Navigate to the project directory:
    ```bash
    cd decentralized-voting-system
    ```
3. Install the required dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### Configuration

1. Update the smart contract addresses and other configurations in the `.env` file:
    ```env
    PRIVATE_KEY="..."
    RPC_URL="..."
    ETHERSCAN_API_KEY="..."

    ```

### Running the Application

1. Start the development server:
    ```bash
    npm start
    # or
    yarn start
    ```

2. Open your browser and go to `http://localhost:3000`.

### Usage

#### Creating a Proposal

1. Connect your wallet.
2. Navigate to the "Create Proposal" section.
3. Enter the proposal name and description.
4. Submit the proposal.

#### Voting on Proposals

1. Connect your wallet.
2. Navigate to the "Vote" section.
3. Select the proposal you want to vote on.
4. Submit your vote.

#### Checking Voting Status

1. Connect your wallet.
2. Navigate to the "Voting Status" section.
3. View your voting status and history.

## Contract Addresses

- **Voting Contract:** `0xCf2F0Aa297169864EC554d83D35c86E4b3677AD9`

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Thanks to the Ethereum community for their support and resources.
- Special thanks to the creators of Viem and Wagmi for their excellent libraries.

