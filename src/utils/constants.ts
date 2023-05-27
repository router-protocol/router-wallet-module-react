import { nearNetworkConfig } from "@/components/Wallet/configs/nearConfig";
import {
  getChainInfoForNetwork,
  getEndpointsForNetwork,
  getEthereumChainIdForNetwork,
  getNetworkType,
} from "@routerprotocol/router-chain-sdk-ts";

export const DEFAULT_GAS_PRICE = 500000000000;
export const DEFAULT_GAS_LIMIT = 200000;
export const ROUTER_GRPC = getEndpointsForNetwork(
  getNetworkType("testnet")
).grpcEndpoint;
export const ROUTER_LCD = getEndpointsForNetwork(
  getNetworkType("testnet")
).lcdEndpoint;

export const ROUTER_ETH_CHAIN_ID = getEthereumChainIdForNetwork(
  getNetworkType("testnet")
);
export const ROUTER_COSMOS_CHAIN_ID = getChainInfoForNetwork(
  getNetworkType("testnet")
).chainId;

export const PING_PONG_ADDRESS = {
  [nearNetworkConfig.networkId]: "",
  "80001": "0x862f75cB828B21c9A2F406EEb7F5263C1E012700",
  [ROUTER_COSMOS_CHAIN_ID]:
    "router1703xucyw0nv2yfs6d082x4crapjly9utn0w2cy42rpcdez3t9dusp287ky",
};
