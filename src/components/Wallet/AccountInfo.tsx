import React, { useCallback, useMemo, useState } from "react";
import { useAccountAddress, useWalletId } from "./hooks";
import {
  DocumentDuplicateIcon,
  CheckCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { walletConfigs } from "./configs/ProviderConfig";
import { useWallets } from "./hooks";
import styled from "styled-components";

interface Props {
  action: () => void;
  close: () => void;
}

const AccountInfoContainer = styled.div`
  background-color: #161622;
  border-radius: 12px;
  width: 400px;
  height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  @media only screen and (max-width: 600px) {
    height: 300px;
    max-width: 230px;
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

const WalletLogo = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
`;

const WalletName = styled.span`
  margin: 5px;
  font-size: 18px;
  font-weight: 500;
`;

const AddressWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 300;
  color: white;
  cursor: pointer;
`;

const ActionButton = styled.button`
  height: 32px;
  background-color: #ffffff20;
  color: #d11313;
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;
  padding: 0 12px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 15px;
  padding: 0 25px;
`;

const AccountInfo = ({ action, close }: Props) => {
  const [walletId] = useWalletId();
  const [accountAddress] = useAccountAddress();
  const [copied, setCopied] = useState(false);
  const { handleDisconnect } = useWallets();

  const wallet = useMemo(
    () => walletConfigs.filter((wallet) => wallet.id === walletId)[0],
    [walletId]
  );

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(accountAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 4000);
  }, [setCopied]);

  return (
    <AccountInfoContainer>
      <CloseIcon onClick={close} />
      <WalletLogo src={wallet?.logoUri} alt="Wallet Logo" />
      <WalletName>{wallet?.name}</WalletName>
      <AddressWrapper onClick={copyToClipboard}>
        {copied ? "Copied" : accountAddress}
        &nbsp;
        {copied ? (
          <CheckCircleIcon style={{ width: "14px" }} />
        ) : (
          <DocumentDuplicateIcon style={{ width: "14px" }} />
        )}
      </AddressWrapper>
      <ButtonWrapper>
        <ActionButton onClick={action}>Change</ActionButton>
        <ActionButton
          onClick={() => {
            close();
            handleDisconnect(wallet);
          }}
        >
          Disconnect
        </ActionButton>
      </ButtonWrapper>
    </AccountInfoContainer>
  );
};

export default AccountInfo;
