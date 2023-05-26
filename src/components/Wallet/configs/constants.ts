import {
  getEndpointsForNetwork,
  getEthereumChainIdForNetwork,
  getNetworkType,
  Network,
} from "@routerprotocol/router-chain-sdk-ts";

const EXPLORER_URL: { [network: string]: string } = {
  [Network.AlphaDevnet]: "https://alpha-explorer-ui.routerprotocol.com",
  [Network.Devnet]: "https://devnet-explorer.routerprotocol.com",
  [Network.Testnet]: "https://explorer.testnet.routerchain.dev",
};

export const CURRENT_NETWORK_METAMASK_CONFIG = {
  chainId:
    "0x" + getEthereumChainIdForNetwork(getNetworkType("testnet")).toString(16),
  chainName: `Router Testnet`,
  nativeCurrency: {
    name: "Route",
    symbol: "ROUTE",
    decimals: 18,
  },
  rpcUrls: [getEndpointsForNetwork(getNetworkType("testnet")).rpcEndpoint],
  blockExplorerUrls: [EXPLORER_URL[getNetworkType("testnet")]],
};
