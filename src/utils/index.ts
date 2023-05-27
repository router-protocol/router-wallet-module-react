import Web3 from "web3";
import {
  DEFAULT_GAS_LIMIT,
  DEFAULT_GAS_PRICE,
  PING_PONG_ADDRESS,
  ROUTER_COSMOS_CHAIN_ID,
} from "./constants";
const ethers = require("ethers");

function getRequestMetadata(
  destGasLimit: number,
  destGasPrice: number,
  ackGasLimit: number,
  ackGasPrice: number,
  relayerFees: string,
  ackType: number,
  isReadCall: boolean,
  asmAddress: string
): string {
  return ethers.utils.solidityPack(
    [
      "uint64",
      "uint64",
      "uint64",
      "uint64",
      "uint128",
      "uint8",
      "bool",
      "string",
    ],
    [
      destGasLimit,
      destGasPrice,
      ackGasLimit,
      ackGasPrice,
      relayerFees,
      ackType,
      isReadCall,
      asmAddress,
    ]
  );
}

function getRequestMetadataBase64(
  destGasLimit: number,
  destGasPrice: number,
  ackGasLimit: number,
  ackGasPrice: number,
  relayerFees: string,
  ackType: number,
  isReadCall: boolean,
  asmAddress: string
): string {
  const x = ethers.utils.solidityPack(
    [
      "uint64",
      "uint64",
      "uint64",
      "uint64",
      "uint128",
      "uint8",
      "bool",
      "string",
    ],
    [
      destGasLimit,
      destGasPrice,
      ackGasLimit,
      ackGasPrice,
      relayerFees,
      ackType,
      isReadCall,
      asmAddress,
    ]
  );
  const y = Buffer.from(x.slice(2), "hex");
  return y.toString("base64");
}

function getRequestMetadataArray(
  destGasLimit: number,
  destGasPrice: number,
  ackGasLimit: number,
  ackGasPrice: number,
  relayerFees: string,
  ackType: number,
  isReadCall: boolean,
  asmAddress: string
): Array<number> {
  const x = ethers.utils.solidityPack(
    [
      "uint64",
      "uint64",
      "uint64",
      "uint64",
      "uint128",
      "uint8",
      "bool",
      "string",
    ],
    [
      destGasLimit,
      destGasPrice,
      ackGasLimit,
      ackGasPrice,
      relayerFees,
      ackType,
      isReadCall,
      asmAddress,
    ]
  );
  const y = Array.from(Buffer.from(x.slice(2), "hex"));
  return y;
}

//EVM Txn
const requestMetadata = getRequestMetadata(
  250000,
  DEFAULT_GAS_PRICE,
  250000,
  DEFAULT_GAS_PRICE,
  "0",
  3,
  false,
  ""
);
const tempWeb3 = new Web3(
  new Web3.providers.HttpProvider("https://rpc-mumbai.maticvigil.com")
);
export const getDataRaw = (accountAddress: string) =>
  tempWeb3.eth.abi.encodeFunctionCall(
    {
      name: "iPing",
      type: "function",
      inputs: [
        {
          internalType: "string",
          name: "destChainId",
          type: "string",
        },
        {
          internalType: "string",
          name: "destinationContractAddress",
          type: "string",
        },
        {
          internalType: "string",
          name: "str",
          type: "string",
        },
        {
          internalType: "bytes",
          name: "requestMetadata",
          type: "bytes",
        },
      ],
    },
    [
      ROUTER_COSMOS_CHAIN_ID,
      PING_PONG_ADDRESS[ROUTER_COSMOS_CHAIN_ID],
      `Hello, Mumbai From Wallet Module by ${accountAddress}`,
      requestMetadata,
    ]
  );
//Router Txn
export const getRouterExecutionArgs = (accountAddress: string) => {
  return {
    ping: `Hello, Router From Wallet Module by ${accountAddress}`,
    dest_contract_address: PING_PONG_ADDRESS["80001"],
    dest_chain_id: "80001",
    request_metadata: getRequestMetadataBase64(
      DEFAULT_GAS_LIMIT,
      DEFAULT_GAS_PRICE,
      DEFAULT_GAS_LIMIT,
      DEFAULT_GAS_PRICE,
      "0",
      3,
      false,
      ""
    ),
  };
};

//Near Txn
export const getNearExecutionArgs = (accountAddress: string) => {
  return {
    dest_chain_id: "router_9601-1",
    destination_contract_address: PING_PONG_ADDRESS[ROUTER_COSMOS_CHAIN_ID],
    str: `Hello, Router From Wallet Module by ${accountAddress}`,
    request_metadata: getRequestMetadataArray(
      DEFAULT_GAS_LIMIT,
      DEFAULT_GAS_PRICE,
      DEFAULT_GAS_LIMIT,
      DEFAULT_GAS_PRICE,
      "0",
      1,
      false,
      ""
    ),
  };
};
