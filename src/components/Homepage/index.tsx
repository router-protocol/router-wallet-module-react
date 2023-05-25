"use client";
import { getDataRaw, getNearExecutionArgs, getRouterExecutionArgs } from "@/utils";
import { ROUTER_LCD } from "@/utils/constants";
import React, { useCallback } from "react";
import styled from "styled-components";
import WalletComponent from "../Wallet";
import {
  useAccountAddress,
  useNetworkId,
  useWalletConnected,
  useWalletId,
  useWallets,
} from "../Wallet/hooks";
import { WalletId } from "../Wallet/types";
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
    if (networkId !== "9601") {
      await window.walletClient.switchChain({
        id: 9601,
      });
      return;
    }
    const txResponse = await handleSendTransaction({
      routerNetworkEnv: "testnet",
      routerContractAddress:
        "router1703xucyw0nv2yfs6d082x4crapjly9utn0w2cy42rpcdez3t9dusp287ky",
      routerExecuteMsg: {
        i_ping: getRouterExecutionArgs(accountAddress),
      },
      routerNodeUrl: ROUTER_LCD,
    });
    console.log("txResponse router=>", txResponse);
  }, [isWalletConnected, walletId, networkId, accountAddress]);

  const handleNearTx = useCallback(async() => {
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
        </InteractiveButtonWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

export default HomePage;
