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
import { switchNetworkInMetamask } from "../Wallet/configs/utils";
import {
  useAccountAddress,
  useNetworkId,
  useWalletConnected,
  useWalletId,
  useWallets,
} from "../Wallet/hooks";
import { WalletId } from "../Wallet/types";
import { adapter } from "../Wallet/configs/utils/tron";
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
      await window.walletClient.switchChain({
        id: 80001,
      });
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

  useEffect(() => {
    console.log("Network ID => ", networkId);
  }, [networkId]);

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
        </InteractiveButtonWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

export default HomePage;
