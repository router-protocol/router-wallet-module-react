import { TronLinkAdapter } from "@tronweb3/tronwallet-adapters";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { ethers } from "ethers";
import { checkIfRouterChainId } from ".";
import { CustomChainType, WalletType } from "../../types";

export const adapter = new TronLinkAdapter();

export const handleWeb3AuthConnection = async (wallet: WalletType) => {
  try {
    const _walletClient = await wallet.connector.connect();
    //@ts-ignore
    const ethersProvider = new ethers.providers.Web3Provider(_walletClient);
    const signer = await ethersProvider.getSigner();

    const _address = await signer.getAddress();
    const _chainId = await signer.getChainId();
    let _chainType = CustomChainType.ethereum;
    if (checkIfRouterChainId(_chainId.toString())) {
      _chainType = CustomChainType.router;
    }
    return {
      _address,
      _chainId,
      _walletClient,
      _chainType,
    };
  } catch (e: any) {
    console.log("handleWeb3AuthConnection error - ", e);
    //throw new Error(e);
  }
};

export const switchNetworkInWeb3Auth = async ({
  chainId,
  chainName,
  gasTicker,
  gasDecimals,
  rpc,
  explorer,
}: {
  chainId: string;
  chainName: string;
  gasTicker: string;
  gasDecimals: string;
  rpc: string;
  explorer: string;
}) => {
  await window.walletClient.addChain({
    chainId: chainId,
    displayName: chainName,
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    tickerName: chainName,
    ticker: gasTicker,
    decimals: gasDecimals,
    rpcTarget: rpc,
    blockExplorer: explorer,
  });
  await window.walletClient.switchChain({ chainId: chainId });
};
