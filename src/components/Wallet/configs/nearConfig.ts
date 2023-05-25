const nearTestnetConnectionConfig = {
  networkId: "testnet",
  //keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
  contractId: "ping-pong.routerprotocol.testnet",
};

export const nearNetworkConfig = nearTestnetConnectionConfig;
