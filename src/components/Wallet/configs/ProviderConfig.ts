import { WalletId } from "../types";
import {
  casperConnector,
  injectedConnector,
  walletConnectConnector,
  web3AuthConnector,
} from "./connectors";

export const walletConfigs = [
  {
    id: WalletId.injected,
    name: "Browser Wallets",
    // logoUri:
    //   "https://raw.githubusercontent.com/router-protocol/router-widget/main/wallet-logos/metamask.svg",
    logoUri:
      "https://img.uxwing.com/wp-content/themes/uxwing/download/brands-social-media/google-chrome-icon.svg",
    connector: injectedConnector,
  },
  {
    id: WalletId.walletconnect,
    name: "WalletConnect",
    logoUri:
      "https://raw.githubusercontent.com/router-protocol/router-widget/main/wallet-logos/walletconnect-circle.svg",
    connector: walletConnectConnector,
  },
  {
    id: WalletId.near,
    name: "My Near Wallet",
    logoUri: "https://cryptologos.cc/logos/near-protocol-near-logo.svg?v=025",
    // Putting injectedConnector here, but has no significance
    connector: injectedConnector,
  },
  {
    id: WalletId.tron,
    name: "TronLink",
    logoUri: "/tron_logo.svg",
    connector: injectedConnector,
  },
  {
    id: WalletId.web3Auth,
    name: "Web3 Auth",
    logoUri: "/tron_logo.svg",
    connector: web3AuthConnector,
  },
  {
    id: WalletId.casper,
    name: "Casper Wallet",
    logoUri: "https://pbs.twimg.com/profile_images/1670917562216124417/kAM83Poh_400x400.jpg",
    connector: casperConnector,
  },
];
