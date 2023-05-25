import {
  getEndpointsForNetwork,
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
