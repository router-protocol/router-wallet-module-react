import { WalletId } from "../types";
import {
  injectedConnector,
  starknetConnector,
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
    id: WalletId.starknet,
    name: "Argent X",
    logoUri: "https://docs.argent.xyz/~gitbook/image?url=https%3A%2F%2F790103736-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fspaces%252F-MCCsloxVgbn9ByBE-nP%252Favatar-1606910015788.png%3Fgeneration%3D1606910016108412%26alt%3Dmedia&width=32&dpr=1&quality=100&sign=16aef61c&sv=1",
    connector: starknetConnector,
  },
];
