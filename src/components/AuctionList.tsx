import React, { useEffect, useState } from "react";
import { TK } from "../abi/TK";
import toast from "react-hot-toast";
import { ERC721 } from "../abi/ERC721";

interface Auction {
  id: number;
  nftId: string;
  isOpen: boolean;
  createdTime: string;
  bidCount: number;
  timeLeft: string;
}

interface AuctionListProps {
  web3: any;
  account: any;
}

function convertSecondsToTime(seconds: any) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return {
    hours: hours,
    minutes: minutes,
    seconds: remainingSeconds,
  };
}

const ERC721Names = {
  "0x8c9C0D503031488bc801F0a1e976bc8AE13d20f8": "Art TKN",
  "0x8713062d372FD09d374347BDef51CB7E22810dd4": "Color TKN",
};

const AuctionList: React.FC<AuctionListProps> = ({ account, web3 }) => {
  const auctionContractAddress = "0xC815E4601F85988AE2fe1802C2686e78b6bf55Fa";
  const auctionContractABI = TK.output.abi; // Contract ABI Array

  const auctionContract = new web3.eth.Contract(
    auctionContractABI,
    auctionContractAddress
  );

  const [allAuctions, setAllAuctions] = useState([]);

  const [bidValue, setBidValue] = useState("");

  useEffect(() => {
    getAllAuctions();
  }, []);

  const getAllAuctions = async () => {
    try {
      const auctions = await auctionContract.methods
        .getAllActiveAuctions()
        .call();

      const auctionList: any = [];
      for (let i = 0; i < auctions.length; i++) {
        const singleAuction = auctions[i];

        const auction = await auctionContract.methods
          .getAuction(singleAuction[0], String(singleAuction[1]))
          .call();

        auction.tokenId = String(singleAuction[1]);
        auction.tokenContract = String(singleAuction[0]);

        console.log(auction);
        auctionList.unshift(auction);
      }

      setAllAuctions(auctionList);
      toast.success("Fetched Auctions...");
    } catch (error: any) {
      toast(error);
      console.error("Error fetching auction details", error);
    }
  };

  const commitBid = async (tokenContract: any, tokenId: any) => {
    const currentCommitment = createCommitment(
      "0xa5b9d60f32436310afebcfda832817a68921beb782fabf7915cc0460b443116a",
      bidValue,
      tokenContract,
      tokenId,
      1
    );
    console.log(tokenContract, tokenId, currentCommitment, bidValue);
    try {
      await auctionContract.methods
        .commitBid(tokenContract, tokenId, currentCommitment, bidValue)
        .send({ from: account })
        .then((result: any) => {
          toast("Bid committed successfully", result);
          console.log("Bid committed successfully", result);
        })
        .catch((error: any) => {
          console.error("Error committing bid", error);
        });
    } catch (error: any) {
      toast("Error in commitBid function", error);
      console.error("Error in commitBid function", error);
    }
  };

  const revealBid = async (tokenContract: any, tokenId: any) => {
    console.log(tokenContract, tokenId, bidValue);
    try {
      await auctionContract.methods
        .revealBid(
          tokenContract,
          tokenId,
          bidValue,
          "0xa5b9d60f32436310afebcfda832817a68921beb782fabf7915cc0460b443116a"
        )
        .send({ from: account })
        .then((result: any) => {
          console.log("Bid revealed successfully", result);
          toast("Bid revealed successfully", result);
        })
        .catch((error: any) => {
          console.error("Error revealing bid", error);
          toast("Error revealing bid", error);
        });
    } catch (error) {
      console.error("Error in revealBid function", error);
    }
  };

  const endAuction = async (tokenContract: any, tokenId: any) => {
    try {
      await auctionContract.methods
        .endAuction(tokenContract, tokenId)
        .send({ from: account })
        .then((result: any) => {
          console.log("Auction ended successfully", result);
          toast("Auction ended successfully", result);
        })
        .catch((error: any) => {
          console.error("Error ending auction", error);
          toast("Error ending auction", error);
        });
    } catch (error) {
      console.error("Error in endAuction function", error);
    }
  };

  const createCommitment = (
    nonce: any,
    bidValue: any,
    tokenContract: any,
    tokenId: any,
    auctionIndex: any
  ) => {
    const encoded = web3.eth.abi.encodeParameters(
      ["bytes32", "uint96", "address", "uint256", "uint64"],
      [nonce, bidValue, tokenContract, tokenId, auctionIndex]
    );
    return web3.utils.keccak256(encoded).slice(0, 42); // Slicing to get a bytes20 representation
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-10">Auction List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>NFT ID</th>
            <th>Is Open</th>
            <th>Start Time</th>
            <th>Bid Count</th>
            <th>Time Left</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allAuctions.map((auction: any, indx) => {
            const date = new Date(Number(auction.startTime) * 1000);

            // Extract date and time components
            const year = date.getFullYear(); // 4-digit year
            const month = date.getMonth() + 1; // Month (1-12)
            const day = date.getDate(); // Day of the month (1-31)
            const hours = date.getHours(); // Hours (0-23)
            const minutes = date.getMinutes(); // Minutes (0-59)

            // Format the date as YYYY-MM-DD HH:MM
            const formattedDateTime = `${year}-${String(month).padStart(
              2,
              "0"
            )}-${String(day).padStart(2, "0")} ${String(hours).padStart(
              2,
              "0"
            )}:${String(minutes).padStart(2, "0")}`;

            const currentTime = Math.floor(Date.now() / 1000);
            return (
              <tr key={indx}>
                <td className="">
                  <div className="flex flex-col items-center justify-center">
                    <span>{auction.tokenId}</span>
                    {/* @ts-expect-error */}
                    <span className="kbd kbd-sm w-max">{ERC721Names[auction.tokenContract]}</span>
                  </div>
                </td>
                <td className="flex w-full h-full mt-10 items-center justify-center flex-col space-y-4">
                  {auction.isOpen ? (
                    <>
                      <span className="badge badge-primary">Yes</span>
                      {currentTime < Number(auction.startTime) ? (
                        <span className="badge w-full min-w-full">Up Next</span>
                      ) : currentTime > Number(auction.startTime) &&
                        currentTime < Number(auction.endOfBiddingPeriod) ? (
                        <span className="badge">Bidding</span>
                      ) : currentTime > Number(auction.endOfBiddingPeriod) &&
                        currentTime < Number(auction.endOfRevealPeriod) ? (
                        <span className="badge">Reveal</span>
                      ) : (
                        <span className="badge">Time up</span>
                      )}
                    </>
                  ) : (
                    <div className="-mt-10 flex items-center justify-center flex-col space-y-4">
                      <span className="badge badge-neutral">No</span>
                      <span className="badge badge-success">Ended</span>
                    </div>
                  )}
                </td>
                <td>{formattedDateTime}</td>
                <td>{String(auction.totalBids)}</td>
                <td>
                  <Timer auction={auction.endOfBiddingPeriod} />
                </td>
                <td>
                  {auction.isOpen && (
                    <div className="flex flex-col justify-center w-max space-y-2">
                      <input
                        type="number"
                        placeholder="Bid Value "
                        className="input ml-2 input-xs input-primary "
                        value={bidValue}
                        onChange={(e) => {
                          setBidValue(e.target.value);
                        }}
                      />
                      <button
                        className="btn btn-xs btn-success"
                        onClick={() =>
                          commitBid(auction.tokenContract, auction.tokenId)
                        }
                      >
                        Submit Bid
                      </button>
                      <button
                        className="btn btn-xs btn-warning"
                        onClick={() =>
                          revealBid(auction.tokenContract, auction.tokenId)
                        }
                      >
                        Reveal Bid
                      </button>
                      <button
                        className="btn btn-xs btn-error"
                        onClick={() =>
                          endAuction(auction.tokenContract, auction.tokenId)
                        }
                      >
                        End Auction
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const Timer = (auction: any) => {
  const [timeLeftForAuction, setTimeLeftForAuction] = useState({
    hours: 99,
    minutes: 99,
    seconds: 99,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Math.floor(Date.now() / 1000);
      const timeLeft = Number(auction.auction) - currentTime;
      const newTimeLeft = convertSecondsToTime(timeLeft);

      setTimeLeftForAuction(newTimeLeft);
    }, 1000);

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, [auction]);

  if (timeLeftForAuction.seconds < 0) {
    return (
      <span className="countdown font-mono text-md">
        {/* @ts-expect-error */}
        <span style={{ "--value": 0 }}></span>:{/* @ts-expect-error */}
        <span style={{ "--value": 0 }}></span>:{/* @ts-expect-error */}
        <span style={{ "--value": 0 }}></span>
      </span>
    );
  } else
    return (
      <span className="countdown font-mono text-md">
        {/* @ts-expect-error */}
        <span style={{ "--value": timeLeftForAuction?.hours }}></span>:
        {/* @ts-expect-error */}
        <span style={{ "--value": timeLeftForAuction?.minutes }}></span>:
        {/* @ts-expect-error */}
        <span style={{ "--value": timeLeftForAuction?.seconds }}></span>
      </span>
    );
};

export default AuctionList;
