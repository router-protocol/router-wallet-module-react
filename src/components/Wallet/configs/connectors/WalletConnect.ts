import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { WalletConnectLegacyConnector } from "wagmi/connectors/walletConnectLegacy";

const walletConnectProjectId = "be1c34299e26b37abbc852b6ed59e3a2";

export const walletConnectConnector = new WalletConnectConnector({
  options: {
    projectId: walletConnectProjectId,
    qrModalOptions: {},
  },
});
// export const walletConnectConnector = new WalletConnectLegacyConnector({
//   options: {},
// });
