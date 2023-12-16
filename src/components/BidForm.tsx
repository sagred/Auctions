import React, { useState } from 'react';

interface BidFormProps {
  onBidSubmit: (auctionId: number, bidAmount: string) => void;
  auctionId: number;
}

const BidForm: React.FC<BidFormProps> = ({ onBidSubmit, auctionId }) => {
  const [bidAmount, setBidAmount] = useState<string>('');

  const handleBidSubmit = () => {
    onBidSubmit(auctionId, bidAmount);
  };

  return (
    <div>
      <h2>Submit Bid</h2>
      <label>Bid Amount:</label>
      <input
        type="number"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
      />
      <button onClick={handleBidSubmit}>Submit Bid</button>
    </div>
  );
};

export default BidForm;
