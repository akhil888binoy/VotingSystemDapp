// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import {Voting} from "../src/Voting.sol";
import {HelperConfig} from "./HelperConfig.s.sol";

contract DeployVoting is Script {
    function run() external returns (Voting) {
        vm.startBroadcast();

        // Example of proposal names (adjust based on your actual requirements)

        Voting voting = new Voting();

        vm.stopBroadcast();

        return voting;
    }
}
