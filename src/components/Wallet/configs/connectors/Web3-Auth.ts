import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";

export const web3AuthConnector = new Web3Auth({
  clientId:
    "BBx1t3f6461n9RFl5X0ZoEAHQECcJny03QES8x1CfKycelFfIPw_4HIU-LwL_0DtGX-M_8iIPLCNq2fq5pUsQgc",
  web3AuthNetwork: "testnet", // mainnet, aqua,  cyan or testnet
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x" + (80001).toString(16),
    rpcTarget: "https://rpc.ankr.com/polygon_mumbai", // This is the public RPC we have added, please pass on your own endpoint while creating an app
  },
});
