import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
// install near-api-js s
import { CustomChainType } from "../../types";
import { nearNetworkConfig } from "../nearConfig";

export const handleNearConnection = async ({
  contractId,
}: {
  contractId: string;
}) => {
  const nearSelector = await setupWalletSelector({
    //@ts-ignore
    network: nearNetworkConfig.networkId,
    modules: [setupMyNearWallet()],
  });
  const _wallet = await nearSelector.wallet("my-near-wallet");
  const _accounts = await _wallet.signIn({
    contractId: contractId,
    accounts: [],
  });
  return {
    _address: _accounts.length > 0 ? _accounts[0].accountId : "",
    _chainId: nearNetworkConfig.networkId,
    _walletClient: _wallet,
    _chainType: CustomChainType.near,
  };
};
