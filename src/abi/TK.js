export const TK = {
	"compiler": {
		"version": "0.8.22+commit.4fc1097e"
	},
	"language": "Solidity",
	"output": {
		"abi": [
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "tokenContract",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"indexed": false,
						"internalType": "address",
						"name": "seller",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint32",
						"name": "startTime",
						"type": "uint32"
					},
					{
						"indexed": false,
						"internalType": "uint32",
						"name": "endOfBiddingPeriod",
						"type": "uint32"
					},
					{
						"indexed": false,
						"internalType": "uint32",
						"name": "endOfRevealPeriod",
						"type": "uint32"
					},
					{
						"indexed": false,
						"internalType": "uint96",
						"name": "reservePrice",
						"type": "uint96"
					}
				],
				"name": "AuctionCreated",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "tokenContract",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"indexed": false,
						"internalType": "address",
						"name": "winner",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint96",
						"name": "winningBid",
						"type": "uint96"
					}
				],
				"name": "AuctionEnded",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "bidder",
						"type": "address"
					},
					{
						"indexed": true,
						"internalType": "address",
						"name": "tokenContract",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"indexed": false,
						"internalType": "bytes20",
						"name": "commitment",
						"type": "bytes20"
					},
					{
						"indexed": false,
						"internalType": "uint96",
						"name": "collateral",
						"type": "uint96"
					}
				],
				"name": "BidCommitted",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "bidder",
						"type": "address"
					},
					{
						"indexed": true,
						"internalType": "address",
						"name": "tokenContract",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"indexed": false,
						"internalType": "uint96",
						"name": "bidValue",
						"type": "uint96"
					}
				],
				"name": "BidRevealed",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "bidder",
						"type": "address"
					},
					{
						"indexed": true,
						"internalType": "address",
						"name": "tokenContract",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"indexed": false,
						"internalType": "uint64",
						"name": "auctionIndex",
						"type": "uint64"
					}
				],
				"name": "CollateralWithdrawn",
				"type": "event"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"name": "auctions",
				"outputs": [
					{
						"internalType": "address",
						"name": "seller",
						"type": "address"
					},
					{
						"internalType": "uint32",
						"name": "startTime",
						"type": "uint32"
					},
					{
						"internalType": "uint32",
						"name": "endOfBiddingPeriod",
						"type": "uint32"
					},
					{
						"internalType": "uint32",
						"name": "endOfRevealPeriod",
						"type": "uint32"
					},
					{
						"internalType": "uint64",
						"name": "numUnrevealedBids",
						"type": "uint64"
					},
					{
						"internalType": "uint96",
						"name": "highestBid",
						"type": "uint96"
					},
					{
						"internalType": "uint96",
						"name": "secondHighestBid",
						"type": "uint96"
					},
					{
						"internalType": "address",
						"name": "highestBidder",
						"type": "address"
					},
					{
						"internalType": "uint64",
						"name": "index",
						"type": "uint64"
					},
					{
						"internalType": "address",
						"name": "erc20Token",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "isOpen",
						"type": "bool"
					},
					{
						"internalType": "uint64",
						"name": "totalBids",
						"type": "uint64"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					},
					{
						"internalType": "uint64",
						"name": "",
						"type": "uint64"
					},
					{
						"internalType": "address",
						"name": "",
						"type": "address"
					}
				],
				"name": "bids",
				"outputs": [
					{
						"internalType": "bytes20",
						"name": "commitment",
						"type": "bytes20"
					},
					{
						"internalType": "uint96",
						"name": "collateral",
						"type": "uint96"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "tokenContract",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"internalType": "bytes20",
						"name": "commitment",
						"type": "bytes20"
					},
					{
						"internalType": "uint96",
						"name": "collateral",
						"type": "uint96"
					}
				],
				"name": "commitBid",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "tokenContract",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "erc20Token",
						"type": "address"
					},
					{
						"internalType": "uint32",
						"name": "startTime",
						"type": "uint32"
					},
					{
						"internalType": "uint32",
						"name": "bidPeriod",
						"type": "uint32"
					},
					{
						"internalType": "uint32",
						"name": "revealPeriod",
						"type": "uint32"
					},
					{
						"internalType": "uint96",
						"name": "reservePrice",
						"type": "uint96"
					}
				],
				"name": "createAuction",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "bytes32",
						"name": "nonce",
						"type": "bytes32"
					},
					{
						"internalType": "uint96",
						"name": "bidValue",
						"type": "uint96"
					},
					{
						"internalType": "address",
						"name": "tokenContract",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"internalType": "uint64",
						"name": "auctionIndex",
						"type": "uint64"
					}
				],
				"name": "createCommitment",
				"outputs": [
					{
						"internalType": "bytes20",
						"name": "",
						"type": "bytes20"
					}
				],
				"stateMutability": "pure",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "tokenContract",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					}
				],
				"name": "endAuction",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "getAllActiveAuctions",
				"outputs": [
					{
						"components": [
							{
								"internalType": "address",
								"name": "tokenContract",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "tokenId",
								"type": "uint256"
							}
						],
						"internalType": "struct TokenizedVickeryAuction.AuctionReference[]",
						"name": "",
						"type": "tuple[]"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "tokenContract",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					}
				],
				"name": "getAuction",
				"outputs": [
					{
						"components": [
							{
								"internalType": "address",
								"name": "seller",
								"type": "address"
							},
							{
								"internalType": "uint32",
								"name": "startTime",
								"type": "uint32"
							},
							{
								"internalType": "uint32",
								"name": "endOfBiddingPeriod",
								"type": "uint32"
							},
							{
								"internalType": "uint32",
								"name": "endOfRevealPeriod",
								"type": "uint32"
							},
							{
								"internalType": "uint64",
								"name": "numUnrevealedBids",
								"type": "uint64"
							},
							{
								"internalType": "uint96",
								"name": "highestBid",
								"type": "uint96"
							},
							{
								"internalType": "uint96",
								"name": "secondHighestBid",
								"type": "uint96"
							},
							{
								"internalType": "address",
								"name": "highestBidder",
								"type": "address"
							},
							{
								"internalType": "uint64",
								"name": "index",
								"type": "uint64"
							},
							{
								"internalType": "address",
								"name": "erc20Token",
								"type": "address"
							},
							{
								"internalType": "bool",
								"name": "isOpen",
								"type": "bool"
							},
							{
								"internalType": "uint64",
								"name": "totalBids",
								"type": "uint64"
							}
						],
						"internalType": "struct TokenizedVickeryAuction.Auction",
						"name": "auction",
						"type": "tuple"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "tokenContract",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"internalType": "uint96",
						"name": "bidValue",
						"type": "uint96"
					},
					{
						"internalType": "bytes32",
						"name": "nonce",
						"type": "bytes32"
					}
				],
				"name": "revealBid",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "tokenContract",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"internalType": "uint64",
						"name": "auctionIndex",
						"type": "uint64"
					}
				],
				"name": "withdrawCollateral",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			}
		],
		"devdoc": {
			"kind": "dev",
			"methods": {},
			"version": 1
		},
		"userdoc": {
			"kind": "user",
			"methods": {},
			"version": 1
		}
	},
	"settings": {
		"compilationTarget": {
			"contracts/TK.sol": "TokenizedVickeryAuction"
		},
		"evmVersion": "shanghai",
		"libraries": {},
		"metadata": {
			"bytecodeHash": "ipfs"
		},
		"optimizer": {
			"enabled": false,
			"runs": 200
		},
		"remappings": []
	},
	"sources": {
		"contracts/IERC165.sol": {
			"keccak256": "0x87798755ab8438c5d137e4e0f916953f500f76f814341905da1735dbe368ddc4",
			"license": "MIT",
			"urls": [
				"bzz-raw://7906a4f78c4ccca1f2304e8db1879a00a289d0c17c97906385f9ede9a38d81a1",
				"dweb:/ipfs/QmSCNLmGzRttkwJJKPQGc2U2ps9XK2S9y1j88q5hCP7tEL"
			]
		},
		"contracts/IERC20.sol": {
			"keccak256": "0x13005ecf7cba588574563f1e2f8a9d166b4b23cbeec4e153584834db6a324120",
			"license": "MIT",
			"urls": [
				"bzz-raw://c7469e9231ec2fee28e304b4c3f69f70cf3d2bfab9d6d619c7676c52ac176712",
				"dweb:/ipfs/QmPNNxicR8bCc2BbWnEa8UXxaSfhcxRU4XT5QGjLWG7Cm2"
			]
		},
		"contracts/IERC721.sol": {
			"keccak256": "0xef9b673bf4d39776ffbd0c605d6deb4581503a1976ae1b603a549123b465496a",
			"license": "MIT",
			"urls": [
				"bzz-raw://7bbf9dfa3315d3be3fa34a166ffef83d1bbd601472f48a53ff18d48f351a17cd",
				"dweb:/ipfs/Qme1vUp7cFC3VFfXSqAWMsVsdiXXg2pkpExNd8bpnu8bFc"
			]
		},
		"contracts/TK.sol": {
			"keccak256": "0x47927a4e9df4ee2e2947382206f21827e6f2294811f4c4f077afcb9752730985",
			"license": "AGPL-3.0",
			"urls": [
				"bzz-raw://4c60b49e366f5ec3eb42ac41a541d8380ed9e679c863214a01f884e0b795dac3",
				"dweb:/ipfs/QmWwNoE6R13r4ShDvPdFWNYaqbh35FqcR1cEVzS1ybGWrK"
			]
		}
	},
	"version": 1
}