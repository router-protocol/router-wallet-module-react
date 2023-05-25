import { useState, useCallback } from "react";
const intialWalletId =
  typeof window !== "undefined"
    ? localStorage.getItem("walletId")
      ? JSON.parse(localStorage.getItem("walletId") || "{}")
      : ""
    : "";
export const getWalletStates = () => {
  const [accountAddress, setAccountAddress] = useState("");
  const [networkId, setNetworkId] = useState("");
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [showConnectWallet, setShowConnectWallet] = useState(false);
  const [walletId, _setWalletId] = useState(intialWalletId);
  const [chainType, setChainType] = useState("");
  const setWalletId = (_walletId: string) => {
    _setWalletId(_walletId);
    localStorage.setItem("walletId", JSON.stringify(_walletId));
  };
  return {
    accountAddress,
    setAccountAddress,
    networkId,
    setNetworkId,
    isWalletConnected,
    setIsWalletConnected,
    showConnectWallet,
    setShowConnectWallet,
    walletId,
    setWalletId,
    chainType,
    setChainType,
  };
};
