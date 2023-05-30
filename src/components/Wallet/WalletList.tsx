import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useWalletId } from "./hooks";
import { walletConfigs } from "./configs/ProviderConfig";
import { useWallets } from "./hooks";
import styled from "styled-components";

interface Props {
  close: () => void;
}

const WalletListContainer = styled.div`
  width: 360px;
  height: 420px;
  color: white;
  background-color: #161622;
  border-radius: 12px;
  @media only screen and (max-width: 600px) {
    height: 400px;
    max-width: 320px;
  }
`;

const CloseIcon = styled(XMarkIcon)`
  position: absolute;
  right: 15px;
  top: 15px;
  width: 25px;
  height: 25px;
  cursor: pointer;
  fill: white;
`;

const Title = styled.div`
  height: fit-content;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  margin-top: 1rem;
`;

const WalletListWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  overflow-y: scroll;
  margin-top: 1rem;
  padding: 0 20px;
`;

const WalletItem = styled.div`
  height: 4rem;
  background-color: #ffffff15;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  border-radius: 0.375rem;
  padding: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  border: 2px solid transparent;
  &:hover {
    border-color: #ffffff10;
  }
`;

const WalletName = styled.div`
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
`;

const StatusDot = styled.div<{ active: boolean }>`
  height: 0.5rem;
  width: 0.5rem;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? "green" : "transparent")};
  opacity: ${({ active }) => (active ? 1 : 0)};
  margin-right: 0.5rem;
`;

const WalletLogo = styled.img`
  height: 2.5rem;
  width: 2.5rem;
  transition: all 0.2s ease-in-out;
`;

const WalletList = ({ close }: Props) => {
  const [walletId] = useWalletId();
  const { handleConnect } = useWallets();

  return (
    <WalletListContainer>
      <CloseIcon onClick={close} />
      <Title>Connect To</Title>
      <WalletListWrapper>
        {walletConfigs.map((wallet, index) => (
          <WalletItem
            key={index}
            onClick={() => {
              handleConnect(wallet);
              close();
            }}
          >
            <WalletName>
              <StatusDot active={walletId === wallet.id} />
              {wallet.name}
            </WalletName>
            <WalletLogo src={wallet.logoUri} alt="Wallet Logo" />
          </WalletItem>
        ))}
      </WalletListWrapper>
    </WalletListContainer>
  );
};

export default WalletList;
