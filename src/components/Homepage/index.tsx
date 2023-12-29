"use client";
import {
  getDataRaw,
  getNearExecutionArgs,
  getRouterExecutionArgs,
} from "@/utils";
import {
  PING_PONG_ADDRESS,
  ROUTER_COSMOS_CHAIN_ID,
  ROUTER_ETH_CHAIN_ID,
  ROUTER_LCD,
} from "@/utils/constants";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import WalletComponent from "../Wallet";
import {
  switchNetworkInMetamask,
  switchNetworkInWeb3Auth,
} from "../Wallet/configs/utils";
import {
  useAccountAddress,
  useNetworkId,
  useWalletConnected,
  useWalletId,
  useWallets,
} from "../Wallet/hooks";
import { WalletId } from "../Wallet/types";
import { adapter } from "../Wallet/configs/utils/tron";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { OsmosisChainInfo } from "@/utils/OsmosisChainInfo";
type Props = {};

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #161622;
  overflow: auto;
`;

const Header = styled.div`
  width: 100%;
  margin: 20px 0px;
  padding: 0 20px;
  display: flex;
  justify-content: right;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const InteractiveButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

const InteractiveButton = styled.button`
  color: white;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 20px;
`;

const HomePage = (props: Props) => {
  const [isWalletConnected] = useWalletConnected();
  const [walletId] = useWalletId();
  const [networkId] = useNetworkId();
  const [accountAddress] = useAccountAddress();
  const { handleSendTransaction } = useWallets();

  const handleEvmTx = useCallback(async () => {
    if (!isWalletConnected) {
      alert("Connect Wallet");
      return;
    }
    if (walletId === WalletId.near) {
      alert("Connect to EVM wallet");
      return;
    }
    if (networkId !== "80001") {
      if (walletId === WalletId.web3Auth) {
        await switchNetworkInWeb3Auth({
          chainId: "0x" + (80001).toString(16),
          chainName: "Mumbai",
          gasTicker: "MATIC",
          gasDecimals: "18",
          rpc: "https://rpc.ankr.com/polygon_mumbai",
          explorer: "",
        });
      } else {
        await window.walletClient.switchChain({
          id: 43113,
        });
      }
      return;
    }
    const txRespone = await handleSendTransaction({
      from: accountAddress,
      to: "0x862f75cb828b21c9a2f406eeb7f5263c1e012700",
      value: "0",
      data: getDataRaw(accountAddress),
    });
    console.log("txRespone evm =>", txRespone);
  }, [isWalletConnected, walletId, networkId, accountAddress]);

  const handleRouterTx = useCallback(async () => {
    if (!isWalletConnected) {
      alert("Connect Wallet");
      return;
    }
    if (walletId === WalletId.near) {
      alert("Connect to EVM wallet");
      return;
    }
    if (networkId !== ROUTER_ETH_CHAIN_ID.toString()) {
      await switchNetworkInMetamask(walletId);
      return;
    }
    const txResponse = await handleSendTransaction({
      routerNetworkEnv: "testnet",
      routerContractAddress: PING_PONG_ADDRESS[ROUTER_COSMOS_CHAIN_ID],
      routerExecuteMsg: {
        i_ping: getRouterExecutionArgs(accountAddress),
      },
      routerNodeUrl: ROUTER_LCD,
    });
    console.log("txResponse router=>", txResponse);
  }, [isWalletConnected, walletId, networkId, accountAddress]);

  const handleNearTx = useCallback(async () => {
    if (!isWalletConnected) {
      alert("Connect Wallet");
      return;
    }
    if (walletId !== WalletId.near) {
      alert("Connect to Near Wallet");
      return;
    }
    if (networkId !== "testnet") {
      alert("Connect to Near Testnet");
      return;
    }
    const txResponse = await handleSendTransaction({
      methodName: "i_ping",
      args: getNearExecutionArgs(accountAddress),
      gas: "30000000000000",
      deposit: "10000000000000000000000",
    });
    console.log("txResponse near=>", txResponse);
  }, [isWalletConnected, walletId, networkId, accountAddress]);

  const handleTronTx = useCallback(async () => {
    const receiver: string = "TFUEuZhTtJJb5KYvzFJQyoyEMcwUnSLQHF";
    if (!isWalletConnected) {
      alert("Connect Wallet");
      return;
    }
    if (walletId !== WalletId.tron) {
      alert("Connect to TronLink");
      return;
    }
    if (networkId !== "2494104990") {
      alert("Change network to Tron Shashta Testnet");
      return;
    }
    if (adapter.address === receiver) {
      alert("Sender and receiver cannot be same");
      return;
    }
    const txResponse = await handleSendTransaction({
      address: "TY3rse72uqVB6sf85NkKZZEWPMDfffYyfU",
      functionSelector: "balanceOf(address)",
      parameter: [
        { type: "address", value: window?.tronWeb?.defaultAddress?.hex! },
      ],
    });
    console.log(`TRON tx response =>`, txResponse);
  }, [isWalletConnected, walletId, networkId, accountAddress]);

  const handleOsmosisTx = useCallback(async () => {
    if (walletId !== WalletId.keplr) {
      console.log("WalletId - ", walletId);
      alert("Connect to Keplr wallet");
      return;
    }
    if (networkId !== OsmosisChainInfo.chainId) {
      console.log("NetworkId - ", networkId);
      alert("Change network to Osmosis Testnet");
      return;
    }
    const response = await handleSendTransaction({
      // contractAddress:
      //   "osmo1seycyux492p7msueqa9pyacw8gre2ufgzdmndsetc96tlv3kmw5srcnfrj",
      // message: {
      //   i_deposit_message: {
      //     amount: "1200",
      //     dest_amount: "1000",
      //     dest_chain_id: "80001",
      //     dest_token: "0x22baa8b6cdd31a0c5d1035d6e72043f4ce6af054",
      //     message: "bmF0aXZl",
      //     partner_id: "1",
      //     recipient: "0xa102A5809ef1707e749c14cfDD901AFb4BBeF03d",
      //     src_token:
      //       "osmo1wpahf5cuy6yzzmmrkdc0xv2ta95wzfj2lk0jpyvtumq9qrfq3q8sse0r2e",
      //   },
      // },
      contractAddress:
        "osmo1wpahf5cuy6yzzmmrkdc0xv2ta95wzfj2lk0jpyvtumq9qrfq3q8sse0r2e",
      message: {
        increase_allowance: {
          amount: "12000000",
          spender:
            "osmo1seycyux492p7msueqa9pyacw8gre2ufgzdmndsetc96tlv3kmw5srcnfrj",
        },
      },
      fee: "auto",
    });
    console.log("Osmosis tx repsonse => ", response);
  }, []);

  return (
    <Wrapper>
      <Header>
        <WalletComponent />
      </Header>
      <ContentWrapper>
        <InteractiveButtonWrapper>
          <InteractiveButton onClick={handleEvmTx}>
            EVM Chains
          </InteractiveButton>
          <InteractiveButton onClick={handleRouterTx}>
            Router Chain
          </InteractiveButton>
          <InteractiveButton onClick={handleNearTx}>
            Near Chain
          </InteractiveButton>
          <InteractiveButton onClick={handleTronTx}>
            Tron Chain
          </InteractiveButton>
          <InteractiveButton onClick={handleOsmosisTx}>
            Osmosis Chain
          </InteractiveButton>
        </InteractiveButtonWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

export default HomePage;
