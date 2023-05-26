import React, { useState } from "react";
import {
  useAccountAddress,
  useWalletConnected,
} from "./hooks";
import MenuWrapper from "./ModalWrapper";
import AccountInfo from "./AccountInfo";
import WalletList from "./WalletList";
import { shortenAddress } from "./configs/utils";
import styled from "styled-components";

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
