import { CURRENT_NETWORK_METAMASK_CONFIG } from "../constants";

export * from "./injected";
export * from "./near";

export function shortenAddress(address: string, chars = 8): string {
  return `${address.substring(0, chars + 2)}...${address.substring(
    address.length - chars
  )}`;
}

export const switchNetworkInMetamask = async (
  config = CURRENT_NETWORK_METAMASK_CONFIG
) => {
  try {
    if (window.ethereum) {
      console.log("CALLED");
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [config],
      });
    }
  } catch (e: any) {
    if (e.code === 4001) {
      // EIP-1193 userRejectedRequest error
      console.log("We can encrypt anything without the key.");
    } else {
      console.error(e);
    }
  }
};

export const checkIfRouterChainId = (chainId: string) => {
  switch (chainId) {
    case "9600":
      return true;
    case "9601":
      return true;
    case "9602":
      return true;
    case "9603":
      return true;
    case "9604":
      return true;
    case "9605":
      return true;
    default:
      return false;
  }
};
