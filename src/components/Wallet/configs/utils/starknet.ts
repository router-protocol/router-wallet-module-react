import { ethers } from "ethers";
import { CallData, Contract, defaultProvider, RpcProvider } from "starknet";
import { connect, disconnect } from "starknetkit";
import { WalletId, WalletType } from "../../types";
// @ts-ignore
import { InjectedConnector } from "starknetkit/injected";

export const handleStarknetConnection = async (wallet: WalletType) => {
  try {
    const connection = await connect({
      connectors: [
        new InjectedConnector({
          options: { id: "argentX" },
        }),
        new InjectedConnector({
          options: { id: "braavos" },
        }),
      ],
    });
    console.log("Connected to Starknet", connection);

    if (connection && connection.wallet?.isConnected) {
      const { wallet } = connection;
      return {
        _address: wallet.selectedAddress,
        _chainId: wallet.chainId,
        _walletClient: wallet,
        _chainType: WalletId.starknet,
      };
    }
  } catch (e) {
    console.log("Error connecting to Starknet", e);
  }
};

export const handleStarknetDisconnection = async () => {
  try {
    await disconnect();
    console.log("Disconnected from Starknet");
  } catch (e) {
    console.log("Error disconnecting from Starknet", e);
  }
};

export const fetchBalance = async (accountAddress: string) => {
  try {
    const provider = defaultProvider;
    const strkTokenAddress =
      "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d";
    // const ethTokenAddress =
    //   "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";
    const strkContractAbi = [
      {
        name: "balance_of",
        type: "function",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
    ];

    const strkContract = new Contract(
      strkContractAbi,
      strkTokenAddress,
      provider
    );
    const result = await strkContract.balance_of(accountAddress);
    const formattedBalance = ethers.utils.formatUnits(result, 18);

    return formattedBalance;
  } catch (error) {
    console.error("Error fetching balance: ", error);
  }
};

export async function sendTransactionToStarknet(
  contractAddress: string,
  functionSelector: string,
  params: any,
) {
  try {
    const provider = new RpcProvider({
      nodeUrl: "https://free-rpc.nethermind.io/sepolia-juno",
    });
    const result = await window.walletClient.account.execute({
      contractAddress: contractAddress,
      entrypoint: functionSelector,
      calldata: CallData.compile({
        ...params,
      }),
    });
    const txReceipt = await provider.waitForTransaction(
      result.transaction_hash
    );
    console.log("txReceipt - ", txReceipt);
    return result.transaction_hash;
  } catch (error) {
    console.error("Error transferring funds:", error);
  }
}
