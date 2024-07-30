"use client";

import { VotingABI, VotingAddress } from "@/constants";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import { useEffect, useState } from "react";

import { formatEther } from "viem";
import {
  useAccount,
  useBalance,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  const { isConnected, address } = useAccount();
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: hash, writeContract } = useWriteContract();
  const [voter, setVoter] = useState("");
  const [proposalIndex, setProposalIndex] = useState(null);
  const [proposalName, setProposalName] = useState("");
  // const [currentVoterAddress, setCurrentAddress] = useState("");

  const { data: Chairperson } = useReadContract({
    abi: VotingABI,
    address: VotingAddress,
    functionName: "getChairperson",
  });

  const { data: WinnerName } = useReadContract({
    abi: VotingABI,
    address: VotingAddress,
    functionName: "WinnerName",
  });

  const { data: currentVoter } = useReadContract({
    abi: VotingABI,
    address: VotingAddress,
    functionName: "getAddressToVoter",
    args: [address],
  });

  console.log("currentVoter", currentVoter);
  const { data: proposals } = useReadContract({
    abi: VotingABI,
    address: VotingAddress,
    functionName: "getProposals",
  });

  const { data: WinningProposal } = useReadContract({
    abi: VotingABI,
    address: VotingAddress,
    functionName: "winningProposal",
  });

  async function registerNewVoter() {
    setLoading(true);
    if (!isConnected) {
      window.alert("Please connect your wallet to create a proposal.");
      setLoading(false);
      return;
    }

    try {
      writeContract({
        address: VotingAddress,
        abi: VotingABI,
        functionName: "registerNewVoter",
        args: [voter],
      });
    } catch (error) {
      console.error(error);
      window.alert(error);
    }
  }

  async function Vote() {
    setLoading(true);
    if (!isConnected) {
      window.alert("Please connect your wallet to create a proposal.");
      setLoading(false);
      return;
    }

    try {
      console.log("inside Vote function");
      await writeContract({
        address: VotingAddress,
        abi: VotingABI,
        functionName: "vote",
        args: [proposalIndex],
      });
      console.log("Vote function done");
    } catch (error) {
      console.error(error);
      window.alert(error);
    }
  }
  async function createProposal() {
    setLoading(true);

    try {
      await writeContract({
        abi: VotingABI,
        address: VotingAddress,
        functionName: "createProposal",
        args: [proposalName],
      });
      setProposalName("");
    } catch (error) {
      window.alert(error);
      console.error(error);
    }
  }
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });
  useEffect(() => {
    setIsMounted(true);
  }, [proposalIndex, proposalName, voter]);

  if (!isMounted) return null;

  if (!isConnected)
    return (
      <div className="min-h-screen flex flex-col items-center bg-gray-100">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-mono font-bold text-gray-900 drop-shadow-lg">
              Voting Dapp
            </h1>
          </div>
          <div className="flex justify-center items-center mt-10 bg-white p-6 sm:p-8 rounded-lg shadow-2xl">
            <div className="w-full sm:w-4/5 lg:w-3/5">
              <p className="text-gray-700 font-mono text-base sm:text-lg md:text-xl leading-relaxed">
                Welcome to our decentralized voting system, a revolutionary
                platform designed to enhance transparency, security, and trust
                in the voting process. By leveraging blockchain technology, our
                system ensures that every vote is securely recorded and
                tamper-proof, providing an immutable and transparent ledger of
                all voting activities. Voters can cast their votes from
                anywhere, and each vote is encrypted and stored across a
                distributed network, making it resistant to manipulation and
                fraud. Our decentralized approach eliminates the need for a
                central authority, giving power back to the voters and ensuring
                that every voice is heard and accurately counted. Join us in
                embracing the future of secure and transparent voting with our
                innovative decentralized solution.
              </p>
              <div className="mt-8 flex justify-center">
                <ConnectButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-100 to-purple-100 py-24">
      <Head>
        <title>Voting Dapp</title>
        <meta name="description" content="Voting Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Voting Dapp
          </h2>

          <div className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-4">
            <p className="break-words">Chairperson: {Chairperson || "N/A"}</p>
            <p>Winner Name: {WinnerName || "N/A"}</p>
          </div>

          {!currentVoter?.isRegistered && (
            <div className="text-xl font-semibold text-red-600 mb-6">
              Please request chairman to register you as a voter
            </div>
          )}

          {currentVoter?.hasVoted && (
            <div className="text-xl font-semibold text-gray-600 mb-6">
              You have already voted
            </div>
          )}
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Create Proposal:
          </h3>
          <input
            placeholder="Add proposal name"
            type="text"
            onChange={(e) => setProposalName(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg mb-4 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={createProposal}
          >
            Create
          </button>
        </div>

        {address === Chairperson && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Register New Voter:
            </h3>
            <input
              placeholder="Address of voter"
              type="text"
              onChange={(e) => setVoter(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg mb-4 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={registerNewVoter}
            >
              Register
            </button>
          </div>
        )}

        {!currentVoter?.hasVoted && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Vote:</h3>
            <input
              placeholder="Proposal Index"
              type="number"
              onChange={(e) => setProposalIndex(parseInt(e.target.value, 10))}
              className="w-full px-4 py-3 border rounded-lg mb-4 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={Vote}
            >
              Vote
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {proposals?.map((p, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition"
            >
              <p className="font-bold text-lg text-gray-800">
                Proposal Index: {index}
              </p>
              <p className="text-xl text-gray-700 mb-2">{p.name}</p>
              <p className="text-gray-600">
                Vote Count: {p.voteCount.toString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
