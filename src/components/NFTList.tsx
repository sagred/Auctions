import React, { useEffect, useState } from "react";
import { RandomAvatar } from "react-random-avatars";
import { ERC721 } from "../abi/ERC721";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { TK } from "../abi/TK";

interface NFT {
  id: string;
  name: string;
}

interface NFTListProps {
  ownedNFTs: NFT[];
  web3: any;
  account: any;
}

const ERC20Tokens = {
  TVA: "0xF690e35fCF02679439cf99450aC5BEA55449FAAd",
  FTK: "0x87134e6a72b2b8130c5711ce81a1bfa59d164373",
};

const ERC721Names = {
  "0x8c9C0D503031488bc801F0a1e976bc8AE13d20f8": "Art TKN",
  "0x8713062d372FD09d374347BDef51CB7E22810dd4": "Color TKN",
};

const NFTList: React.FC<NFTListProps> = ({ web3, ownedNFTs, account }) => {
  const [tokenSet1, setTokenSet1] = useState([]);
  const [tokenSet2, setTokenSet2] = useState([]);

  const contractAddress1 = "0x8c9C0D503031488bc801F0a1e976bc8AE13d20f8";
  const contractAddress2 = "0x8713062d372FD09d374347BDef51CB7E22810dd4";
  const contractABI = ERC721.output.abi;

  const contract1 = new web3.eth.Contract(contractABI, contractAddress1);
  const contract2 = new web3.eth.Contract(contractABI, contractAddress2);

  const auctionContractAddress = "0xC815E4601F85988AE2fe1802C2686e78b6bf55Fa";
  const auctionContractABI = TK.output.abi; // Contract ABI Array

  const auctionContract = new web3.eth.Contract(
    auctionContractABI,
    auctionContractAddress
  );

  const [selectedTokenId, setSelectedTokenId] = useState<any>(null);
  const [selectedERC20, setSelectedERC20] = useState<any>(ERC20Tokens["TVA"]);
  const [selectedTime, setSelectedTime] = useState<any>(new Date());
  const [bidPeriod, setBidPeriod] = useState("");
  const [revealPeriod, setRevealPeriod] = useState("");
  const reservePrice = 100;

  console.log(selectedTime);

  useEffect(() => {
    getTokens1();
    getTokens2();
  }, []);

  const getTokens1 = async () => {
    try {
      const tokens = await contract1.methods.getNFTsByOwner(account).call();
      await setTokenSet1(tokens);
      return tokens;
    } catch (error) {
      console.error(error);
    }
  };

  const getTokens2 = async () => {
    try {
      const tokens = await contract2.methods.getNFTsByOwner(account).call();
      await setTokenSet2(tokens);
      return tokens;
    } catch (error) {
      console.error(error);
    }
  };

  const mintToken1 = async () => {
    try {
      await contract1.methods.mint().send({ from: account });
    } catch (error) {
      console.error(error);
    }
  };

  const mintToken2 = async () => {
    try {
      await contract2.methods.mint().send({ from: account });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateAuction = async (contract: any, tokenId: any) => {
    const date = new Date(selectedTime);
    const unixTime = Math.floor(date.getTime() / 1000);
    console.log(
      contract,
      tokenId,
      selectedERC20,
      unixTime,
      bidPeriod,
      revealPeriod,
      reservePrice
    );

    auctionContract.methods
      .createAuction(
        contract,
        tokenId,
        selectedERC20,
        unixTime,
        bidPeriod,
        revealPeriod,
        reservePrice
      )
      .send({ from: account })
      .then((result: any) => {
        console.log("Auction Created", result);
      })
      .catch((error: any) => {
        console.error("Error creating auction", error);
      });
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-6">Owned NFTs</h1>
      <div>
        <div className="flex items-center space-x-5">
          <h2 className="font-medium text-lg">
            1. Art Token Contract: {tokenSet1.length}
          </h2>{" "}
          <button onClick={getTokens1} className="btn btn-xs">
            Refresh
          </button>
          <button onClick={mintToken1} className="btn btn-xs">
            Mint Token
          </button>
        </div>
        {tokenSet1.length === 0 && (
          <h2 className="my-5 font-medium">
            You don't have any tokens. Mint to get one...
          </h2>
        )}
        {tokenSet1.map((nft, indx) => (
          <div className="flex justify-between">
            <div className="border w-min my-10">
              <RandomAvatar
                key={indx}
                name={String(nft)}
                size={250}
                square={true}
              />
              <div className="border-t  font-light font-serif text-center">
                <h2>Token Id: {String(nft)}</h2>
              </div>
            </div>
            <div className="my-10">
              {selectedTokenId === String(nft) ? (
                <div>
                  {/* <h2 className="text-sm">Token Id: {String(nft)}</h2>
                  <h2 className="text-sm">Contract: {contractAddress1}</h2> */}
                  <h2 className="text-sm">ERC Token:</h2>
                  <select
                    onChange={(e) => setSelectedERC20(e.target.value)}
                    className="select select-xs select-bordered w-full max-w-xs"
                  >
                    <option value={ERC20Tokens["TVA"]} selected>
                      TVA ({ERC20Tokens["TVA"]})
                    </option>
                    <option value={ERC20Tokens["FTK"]}>
                      {" "}
                      FTK ({ERC20Tokens["FTK"]})
                    </option>
                  </select>
                  <h2 className="text-sm">Select Start Date and Time:</h2>
                  <DateTimePicker
                    value={selectedTime}
                    onChange={setSelectedTime}
                  />
                  <div className="flex my-2 items-center">
                    <h2 className="text-sm">Bid Period:</h2>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="input ml-2 input-xs input-primary w-max max-w-xs"
                      value={bidPeriod}
                      onChange={(e) => setBidPeriod(e.target.value)}
                    />
                  </div>
                  <div className="flex mb-2 items-center">
                    <h2 className="text-sm">Reveal Period:</h2>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="input ml-2 input-xs input-primary w-max max-w-xs"
                      value={revealPeriod}
                      onChange={(e) => setRevealPeriod(e.target.value)}
                    />
                  </div>

                  <h2 className="text-sm">Reserve Price: 100</h2>

                  <button
                    onClick={() =>
                      handleCreateAuction(contractAddress1, String(nft))
                    }
                    className="btn btn-sm btn-primary mt-5"
                  >
                    Create Auction
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSelectedTokenId(String(nft))}
                  className="btn btn-outline btn-sm"
                >
                  Auction
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center space-x-5">
          <h2 className="font-medium text-lg">
            2. Color Token Contract: {tokenSet2.length}
          </h2>{" "}
          <button onClick={getTokens1} className="btn btn-xs">
            Refresh
          </button>
          <button onClick={mintToken2} className="btn btn-xs">
            Mint Token
          </button>
        </div>
        {tokenSet2.length === 0 && (
          <h2 className="my-5 font-medium">
            You don't have any tokens. Mint to get one...
          </h2>
        )}
        {tokenSet2.map((nft, indx) => (
          <div className="flex justify-between">
            <div className="border w-min my-10">
              <RandomAvatar
                key={indx}
                name={String(nft)}
                size={250}
                square={true}
                mode="colors"
              />
              <div className="border-t  font-light font-serif text-center">
                <h2>Token Id: {String(nft)}</h2>
              </div>
            </div>
            <div className="my-10">
              {selectedTokenId === String(nft) ? (
                <div>
                  {/* <h2 className="text-sm">Token Id: {String(nft)}</h2>
                  <h2 className="text-sm">Contract: {contractAddress1}</h2> */}
                  <h2 className="text-sm">ERC Token:</h2>
                  <select
                    onChange={(e) => setSelectedERC20(e.target.value)}
                    className="select select-xs select-bordered w-full max-w-xs"
                  >
                    <option value={ERC20Tokens["TVA"]} selected>
                      TVA ({ERC20Tokens["TVA"]})
                    </option>
                    <option value={ERC20Tokens["FTK"]}>
                      {" "}
                      FTK ({ERC20Tokens["FTK"]})
                    </option>
                  </select>
                  <h2 className="text-sm">Select Start Date and Time:</h2>
                  <DateTimePicker
                    value={selectedTime}
                    onChange={setSelectedTime}
                  />
                  <div className="flex my-2 items-center">
                    <h2 className="text-sm">Bid Period:</h2>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="input ml-2 input-xs input-primary w-max max-w-xs"
                      value={bidPeriod}
                      onChange={(e) => setBidPeriod(e.target.value)}
                    />
                  </div>
                  <div className="flex mb-2 items-center">
                    <h2 className="text-sm">Reveal Period:</h2>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="input ml-2 input-xs input-primary w-max max-w-xs"
                      value={revealPeriod}
                      onChange={(e) => setRevealPeriod(e.target.value)}
                    />
                  </div>

                  <h2 className="text-sm">Reserve Price: 100</h2>

                  <button
                    onClick={() =>
                      handleCreateAuction(contractAddress2, String(nft))
                    }
                    className="btn btn-sm btn-primary mt-5"
                  >
                    Create Auction
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSelectedTokenId(String(nft))}
                  className="btn btn-outline btn-sm"
                >
                  Auction
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTList;
