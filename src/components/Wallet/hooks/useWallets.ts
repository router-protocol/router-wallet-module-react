import { useCallback } from "react";
import {
  useAccountAddress,
  useChainType,
  useNetworkId,
  useWalletConnected,
  useWalletId,
} from "./";
import {
  CustomChainType,
  EthereumSendTransactionArgs,
  isEthereumSendTransactionArgs,
  isNearExecutionType,
  isRouterExecutionType,
  NearExecutionType,
  RouterExecutionType,
  WalletId,
  WalletType,
} from "../types";
import { executeQueryInjected } from "@routerprotocol/router-chain-sdk-ts";
import {
  handleInjectedConnection,
  handleNearConnection,
  subscribeInjectedWallet,
} from "../configs/utils";
import { nearNetworkConfig } from "../configs/nearConfig";
import { walletConfigs } from "../configs/ProviderConfig";

export const useWallets = () => {
  const [accountAddress, setAccountAddress] = useAccountAddress();
  const [, setIsWalletConnected] = useWalletConnected();
  const [, setNetworkId] = useNetworkId();
  const [chainType, setChainType] = useChainType();
  const [walletId, setWalletId] = useWalletId();
  const handleConnect = useCallback(
    async (wallet: WalletType) => {
      let connectionResponse;
      switch (wallet.id) {
        case WalletId.injected:
          connectionResponse = await handleInjectedConnection(wallet);
          await subscribeInjectedWallet({
            wallet,
            setAccountAddress,
            setNetworkId,
            setChainType,
          });
          break;
        case WalletId.walletconnect:
          connectionResponse = await handleInjectedConnection(wallet);
          await subscribeInjectedWallet({
            wallet,
            setAccountAddress,
            setNetworkId,
            setChainType,
          });
          break;
        case WalletId.near:
          connectionResponse = await handleNearConnection({
            contractId: nearNetworkConfig.contractId,
          });
          break;
      }
      //After successfull connection setting global states
      console.log("connectionResponse =>", connectionResponse);
      if (connectionResponse) {
        const { _address, _chainId, _walletClient, _chainType } =
          connectionResponse;
        setAccountAddress(_address);
        setNetworkId(_chainId.toString());
        setChainType(_chainType);
        setIsWalletConnected(true);
        window.walletClient = _walletClient;
        setWalletId(wallet.id);
      }
    },
    [
      setAccountAddress,
      setNetworkId,
      setIsWalletConnected,
      setChainType,
      setWalletId,
    ]
  );

  const handleDisconnect = useCallback(
    async (wallet: WalletType) => {
      const { walletClient } = window;
      try {
        switch (wallet.id) {
          case WalletId.near:
            await walletClient.signOut();
            break;
          default:
            await wallet.connector.disconnect();
        }
        setAccountAddress("");
        setNetworkId("");
        setWalletId("");
        setChainType("");
        setIsWalletConnected(false);
      } catch (e) {
        console.log("handleDisconnect erorr =>", e);
      }
    },
    [setAccountAddress, setNetworkId, setIsWalletConnected]
  );

  const handleSendTransaction = useCallback(
    async (
      txArgs:
        | RouterExecutionType
        | EthereumSendTransactionArgs
        | NearExecutionType
    ) => {
      const { walletClient } = window;
      switch (chainType) {
        case CustomChainType.ethereum:
          if (!isEthereumSendTransactionArgs(txArgs)) {
            throw new Error(
              `Chaintype is ethereum but transaction argument does not match EthereumSendTransactionArgs`
            );
          }
          const evmTxResponse = await walletClient.request({
            method: "eth_sendTransaction",
            params: [
              {
                ...txArgs,
              },
            ],
          });
          return evmTxResponse;
        case CustomChainType.router:
          if (!isRouterExecutionType(txArgs)) {
            throw new Error(
              `Chaintype is router but transaction argument does not match RouterExecutionType`
            );
          }
          const {
            routerNetworkEnv,
            routerContractAddress,
            routerExecuteMsg,
            routerNodeUrl,
            funds,
            memo,
          } = txArgs;
          if (!routerNetworkEnv) {
            throw new Error(
              `networkEnv is undefined for router chain transaciton`
            );
          }
          if (!routerContractAddress) {
            throw new Error(
              `contractAddress is undefined for router chain transaciton`
            );
          }
          if (!routerExecuteMsg) {
            throw new Error(
              `executeMsg is undefined for router chain transaciton`
            );
          }
          if (!routerNodeUrl) {
            throw new Error(
              `nodeUrl is undefined for router chain transaciton`
            );
          }
          console.log("HIT METAMASK =>");
          const broadCastedTransaction = await executeQueryInjected({
            networkEnv: routerNetworkEnv,
            contractAddress: routerContractAddress,
            executeMsg: routerExecuteMsg,
            nodeUrl: routerNodeUrl,
            ethereumAddress: accountAddress,
            injectedSigner: walletClient,
            funds,
            memo,
          });
          return broadCastedTransaction;
        case CustomChainType.near:
          if (!isNearExecutionType(txArgs)) {
            throw new Error(
              `Chaintype is near but transaction argument does not match NearExecutionType`
            );
          }
          const nearTxResponse = await walletClient.signAndSendTransaction({
            actions: [
              {
                type: "FunctionCall",
                params: { ...txArgs },
              },
            ],
          });
          return nearTxResponse;
        default:
          throw new Error(`${chainType} chain type is not handeled`);
      }
    },
    [accountAddress, chainType]
  );

  return { handleConnect, handleDisconnect, handleSendTransaction };
};
