import React, { useEffect, useState } from "react";
import {
  useAccountAddress,
  useWalletConnected,
  useWalletId,
  useWallets,
} from "./hooks";
import MenuWrapper from "./ModalWrapper";
import AccountInfo from "./AccountInfo";
import WalletList from "./WalletList";
import { shortenAddress } from "./configs/utils";
import styled from "styled-components";
import { walletConfigs } from "./configs/ProviderConfig";

type Props = {};

declare global {
  interface Window {
    walletClient: any;
    ethereum: any;
    frontier: any;
    cosmostation: any;
  }
}

const Button = styled.button`
  color: white;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 14px;
`;

const WalletComponent = ({}: Props) => {
  const [isWalletConnected] = useWalletConnected();
  const [accountAddress] = useAccountAddress();
  const [showWalletList, setShowWalletList] = useState(false);
  const [showAccountInfo, setShowAccountInfo] = useState(false);
  const [walletId] = useWalletId();
  const { handleConnect } = useWallets();

  // This useEffect is for intial connection of last wallet connected
  useEffect(() => {
    if (!walletId) return;
    handleConnect(walletConfigs.filter((wallet) => wallet.id === walletId)[0]);
  }, []);
  
  return (
    <>
      <MenuWrapper
        open={showWalletList}
        onClose={() => setShowWalletList(false)}
      >
        <WalletList close={() => setShowWalletList(false)} />
      </MenuWrapper>
      <MenuWrapper
        open={showAccountInfo}
        onClose={() => setShowAccountInfo(false)}
      >
        <AccountInfo
          action={() => {
            setShowAccountInfo(false);
            setShowWalletList(true);
          }}
          close={() => setShowAccountInfo(false)}
        />
      </MenuWrapper>
      <Button
        onClick={() =>
          isWalletConnected ? setShowAccountInfo(true) : setShowWalletList(true)
        }
      >
        {isWalletConnected
          ? shortenAddress(accountAddress, 4)
          : "Connect Wallet"}
      </Button>
    </>
  );
};

export default WalletComponent;
