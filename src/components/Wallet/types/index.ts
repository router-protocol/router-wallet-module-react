import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

export interface WalletType {
  id: string;
  name: string;
  logoUri: string;
  connector: WalletConnectConnector | InjectedConnector;
}

export interface RouterExecutionType {
  routerNetworkEnv: string;
  routerContractAddress: string;
  routerExecuteMsg: Record<string, unknown>;
  routerNodeUrl: string;
  funds?: {
    denom: string;
    amount: string;
  };
  memo?: string;
}

export function isRouterExecutionType(obj: any): obj is RouterExecutionType {
  return (
    typeof obj?.routerNetworkEnv === "string" &&
    typeof obj?.routerContractAddress === "string" &&
    typeof obj?.routerExecuteMsg === "object" &&
    typeof obj?.routerNodeUrl === "string"
  );
}

export interface NearExecutionType {
  methodName: string;
  args: any;
  gas: string;
  deposit: string;
}

export function isNearExecutionType(obj: any): obj is NearExecutionType {
  return (
    typeof obj?.methodName === "string" &&
    typeof obj?.args === "object" &&
    typeof obj?.gas === "string" &&
    typeof obj?.deposit === "string"
  );
}

// from: DATA, 20 Bytes - The address the transaction is send from.
// to: DATA, 20 Bytes - (optional when creating new contract) The address the transaction is directed to.
// gas: QUANTITY - (optional, default: 90000) Integer of the gas provided for the transaction execution. It will return unused gas.
// gasPrice: QUANTITY - (optional, default: To-Be-Determined) Integer of the gasPrice used for each paid gas
// value: QUANTITY - (optional) Integer of the value sent with this transaction
// data: DATA - The compiled code of a contract OR the hash of the invoked method signature and encoded parameters.
// nonce: QUANTITY - (optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce.

export interface EthereumSendTransactionArgs {
  from: string;
  to: string;
  gas?: string;
  gasPrice?: string;
  value: string;
  data: string;
  nonce?: string;
}

export function isEthereumSendTransactionArgs(
  obj: any
): obj is EthereumSendTransactionArgs {
  return (
    typeof obj?.from === "string" &&
    typeof obj?.to === "string" &&
    typeof obj?.value === "string" &&
    typeof obj?.data === "string"
  );
}

export enum WalletId {
  injected = "injected",
  walletconnect = "walletconnect",
  near = "near",
}

export enum CustomChainType {
  ethereum = "ethereum",
  near = "near",
  router = "router",
}
