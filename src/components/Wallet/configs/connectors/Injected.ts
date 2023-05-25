import { InjectedConnector } from "wagmi/connectors/injected";

const GetInjectedProviders = () => {
  if (typeof window !== "undefined") {
    if (window.ethereum) {
      return window.ethereum;
    }
    if (window.frontier) {
      return window.frontier.ethereum;
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
