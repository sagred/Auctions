import React, { useEffect, useState } from "react";
import { ERC20 } from "../abi/ERC20";

interface Token {
  id: string;
  name: string;
  balance: number;
}

interface TokenListProps {
  tokenBalances: Token[];
  web3: any;
  account: any;
}

const TokenList: React.FC<TokenListProps> = ({
  web3,
  tokenBalances,
  account,
}) => {
  const contractABI = ERC20.output.abi;
  const contractAddres1 = "0xF690e35fCF02679439cf99450aC5BEA55449FAAd";
  const contractAddres2 = "0x87134e6a72b2b8130c5711ce81a1bfa59d164373";

  const contract1 = new web3.eth.Contract(contractABI, contractAddres1);
  const contract2 = new web3.eth.Contract(contractABI, contractAddres2);

  const [bal1, setBal1] = useState<any>("0n");
  const [bal2, setBal2] = useState<any>("0n");


  const TVAAddress = "0xC815E4601F85988AE2fe1802C2686e78b6bf55Fa"

  useEffect(() => {
    if (web3 !== null) {
      getBalance1();
      getBalance2();
    }
  }, [web3]);

  const getBalance1 = async () => {
    try {
      const balance = await contract1.methods.balanceOf(account).call();

      console.log(balance);
      await setBal1(String(balance));
      return balance;
    } catch (error) {
      console.error(error);
    }
  };

  const getBalance2 = async () => {
    try {
      const balance = await contract2.methods.balanceOf(account).call();
      console.log(balance);
      await setBal2(String(balance));
      return balance;
    } catch (error) {
      console.error(error);
    }
  };

  const mintTokens1 = async () => {
    try {
      await contract1.methods.mint(account, 500).send({ from: account });
      // Handle the minting success
    } catch (error) {
      console.error(error);
    }
  };

  const mintTokens2 = async () => {
    try {
      await contract2.methods.mint(account, 500).send({ from: account });
      // Handle the minting success
    } catch (error) {
      console.error(error);
    }
  };

  console.log(bal1, bal2);

  return (
    <div className="flex items-center justify-center w-full flex-col space-y-4">
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* Table header */}
          <thead>
            <tr>
              <th>Token</th>
              <th>Balance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Table body */}
            {/* Replace with dynamic rows as needed */}
            <tr>
              <td>Token VA</td>
              <td>
                {bal1} TVA{" "}
                <button onClick={getBalance1} className="btn btn-xs">
                  Refresh
                </button>
              </td>
              <td>
                <button onClick={mintTokens1} className="btn btn-sm">
                  Get 500 TVA
                </button>
              </td>
            </tr>
            <tr>
              <td>Fun Token</td>
              <td>
                {bal2} FTK{" "}
                <button onClick={getBalance2} className="btn btn-xs">
                  Refresh
                </button>
              </td>
              <td>
                <button onClick={mintTokens2} className="btn btn-sm">
                  Get 500 FTK{" "}
                </button>
              </td>
            </tr>
            {/* ... more rows */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TokenList;
