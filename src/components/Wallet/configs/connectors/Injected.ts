import { TronLinkAdapter } from "@tronweb3/tronwallet-adapters";
import { InjectedConnector } from "wagmi/connectors/injected";

const GetInjectedProviders = () => {
  if (typeof window !== "undefined") {
    if (window.ethereum) {
      return window.ethereum;
    }
    if (window.frontier) {
      return window.frontier.ethereum;
    }
    if (window.cosmostation) {
      return window.cosmostation.ethereum;
    }
    if(window.tronWeb) {
      const adapter = new TronLinkAdapter()
      return adapter;
    }
    return undefined;
  }
  return undefined;
};

export const injectedConnector = new InjectedConnector({
  options: {
    name: "My Injected Wallet",
    getProvider: GetInjectedProviders,
  },
});

const GetStarknetProviders = () => {
  if (typeof window !== "undefined") {
    if ((typeof window as any).starknet_argentX) {
      return (typeof window as any).starknet_argentX;
    }
    return undefined;
  }
  return undefined;
};

export const starknetConnector = new InjectedConnector({
  options: {
    name: "Starknet Wallet",
    //@ts-ignore
    getProvider: GetStarknetProviders,
  },
});