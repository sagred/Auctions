// Main.tsx

import React, { useState, useEffect } from "react";
import Web3 from "web3";
import AuctionForm from "./components/AuctionForm";
import AuctionList from "./components/AuctionList";
import NFTList from "./components/NFTList";
import TokenList from "./components/TokenList";
import { Toaster } from "react-hot-toast";

enum Tabs {
  Home = "Home",
  TokenBalances = "Tokens",
  OwnedNFTs = "NFTs",
  AuctionList = "Auction List",
}

interface ERC721Contract {
  id: string;
  name: string;
}

interface ERC20Contract {
  id: string;
  name: string;
}

interface Auction {
  id: number;
  nftId: string;
  isOpen: boolean;
  createdTime: string;
  bidCount: number;
  timeLeft: string;
}

interface NFT {
  id: string;
  name: string;
}

interface Token {
  id: string;
  name: string;
  balance: number;
}

function Main() {
  const [selectedTab, setSelectedTab] = useState<Tabs>(Tabs.Home);

  const handleTabChange = (tab: Tabs) => {
    setSelectedTab(tab);
  };

  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [erc721Contracts, setERC721Contracts] = useState<ERC721Contract[]>([]);
  const [erc20Contracts, setERC20Contracts] = useState<ERC20Contract[]>([]);
  const [ownedNFTs, setOwnedNFTs] = useState<NFT[]>([]);
  const [tokenBalances, setTokenBalances] = useState<Token[]>([]);
  const [selectedAuction, setSelectedAuction] = useState<number | null>(null);
  const [account, setAccount] = useState<null | any>(null);
  const [balance, setBalance] = useState("");
  const [web3, setWeb3] = useState<any | null>(null);

  useEffect(() => {
    loadWeb3();
  }, []);

  async function loadWeb3() {
    const connectedAccount = await connectWallet();
    if (connectedAccount) {
      //@ts-expect-error
      const w3 = new Web3(window?.ethereum);
      setWeb3(w3);
    }
  }

  async function connectWallet() {
    //@ts-expect-error
    if (window?.ethereum) {
      try {
        //@ts-expect-error
        const accounts = await window?.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Connected", accounts[0]);
        setAccount(accounts[0]);
        updateBalance(accounts[0]);
        return accounts[0]; // Returns the first account
      } catch (error) {
        console.error("User denied account access");
      }
    } else {
      console.log("Please install MetaMask!");
    }
  }

  const updateBalance = async (account: any) => {
    const balance = await getWalletBalance(account);
    setBalance(balance);
  };

  const getWalletBalance = async (address: any) => {
    try {
      const balanceWei = await web3.eth.getBalance(address);
      console.log(balanceWei);
      const balanceEth = web3.utils.fromWei(balanceWei, "ether");
      console.log(balanceEth);
      return balanceEth;
    } catch (error) {
      console.error("Error fetching balance: ", error);
    }
  };

  const renderContent = () => {
    switch (selectedTab) {
      case Tabs.OwnedNFTs:
        return <NFTList web3={web3} ownedNFTs={ownedNFTs} account={account} />;
      case Tabs.AuctionList:
        return <AuctionList account={account} web3={web3} />;
      case Tabs.TokenBalances:
        return (
          <TokenList
            web3={web3}
            tokenBalances={tokenBalances}
            account={account}
          />
        );
      default:
        return (
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <div>
              <h2 className="text-2xl font-bold mb-10 text-gray-800">
                🎉 Welcome to AuctionVT!
              </h2>
            </div>

            {!account ? (
              <div>
                <button
                  className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                  onClick={() => connectWallet()}
                >
                  🔗 Connect Wallet
                </button>
              </div>
            ) : (
              <div className="accountDetails mt-4">
                <h2 className="font-medium text-gray-700">
                  Connected Account:
                </h2>
                <div className="badge badge-primary">
                  {account}
                </div>
              </div>
            )}

            <div className="mt-10">
              <h2 className="text-lg font-medium text-gray-800">
                📚 How to Get Started?
              </h2>
              <div className="text-base text-gray-700 mt-4 space-y-2">
                <h3>
                  🌟 <span className="font-medium">Step 1:</span> Head over to
                  the <span className="kbd kbd-sm">Tokens</span> tab and grab
                  some tokens.
                </h3>
                <h3>
                  🎨 <span className="font-medium">Step 2:</span> Next, visit
                  the <span className="kbd kbd-sm">NFTs</span> tab and mint a
                  token to get your own NFT.
                </h3>
                <h3>
                  🔨 <span className="font-medium">Step 3:</span> In the NFTs
                  section, click the{" "}
                  <span className="kbd kbd-sm">Auction</span> button on the
                  NFT you wish to auction.
                </h3>
                <h3>
                  🕒 <span className="font-medium">Step 4:</span> Select your
                  ERC20 token and fill in the details like start time, bidding
                  and reveal periods (in seconds).
                </h3>
                <h3>
                  🚀 <span className="font-medium">Step 5:</span> Hit{" "}
                  <span className="kbd kbd-sm">Create Auction</span> to
                  launch your NFT into the market!
                </h3>
                <h3>
                  👀 <span className="font-medium">Step 6:</span> Check out all
                  ongoing auctions in the{" "}
                  <span className="kbd kbd-sm">Auction List</span> tab and
                  place your bids!
                </h3>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-lg font-medium text-gray-800">
                Team
              </h2>
              <div className="text-base text-gray-700 mt-4 space-y-2">
                <h3>
                    
                  1. Sagar Reddy
                </h3>
                <h3>
                 2. Abhilash 
                </h3>
                <h3>
3. Geethanjali
                </h3>
                
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Toaster />
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl">auctionsVT</a>
        </div>

        <div className="navbar-end">
          {Object.values(Tabs).map((tab) => (
            <div
              key={tab}
              className={`btn btn-sm tab ${
                selectedTab === tab ? "btn-primary" : "btn-ghost"
              }`}
              onClick={() => handleTabChange(tab as Tabs)}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20">{renderContent()}</div>
    </div>
  );
}

export default Main;
