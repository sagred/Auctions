import React, { useState } from 'react';


interface ERC721Contract {
  id: string;
  name: string;
}

interface ERC20Contract {
  id: string;
  name: string;
}

interface AuctionFormProps {
  onAuctionCreate: (nftId: string, tokenId: string) => void;
  erc721Contracts: ERC721Contract[];
  erc20Contracts: ERC20Contract[];
}

  const AuctionForm: React.FC<AuctionFormProps> = ({
    onAuctionCreate,
    erc721Contracts,
    erc20Contracts,
  }) => {
    const [selectedNFT, setSelectedNFT] = useState<string>('');
    const [selectedToken, setSelectedToken] = useState<string>('');
  
    const handleCreateAuction = () => {
      onAuctionCreate(selectedNFT, selectedToken);
    };
  
    return (
      <div>
        <h2>Create Auction</h2>
        <label>Select NFT:</label>
        <select value={selectedNFT} onChange={(e) => setSelectedNFT(e.target.value)}>
          {erc721Contracts.map((contract) => (
            <option key={contract.id} value={contract.id}>
              {contract.name}
            </option>
          ))}
        </select>
  
        <label>Select Token:</label>
        <select value={selectedToken} onChange={(e) => setSelectedToken(e.target.value)}>
          {erc20Contracts.map((contract) => (
            <option key={contract.id} value={contract.id}>
              {contract.name}
            </option>
          ))}
        </select>
  
        <button onClick={handleCreateAuction}>Create Auction</button>
      </div>
    );
  };
  
  export default AuctionForm;
  
