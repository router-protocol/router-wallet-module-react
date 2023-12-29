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
    if (window.tronWeb) {
      const adapter = new TronLinkAdapter()
      return adapter;
    }
    if ((window as any).keplr) {
      return (window as any).keplr
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
