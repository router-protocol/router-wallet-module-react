"use client";
import { createContext } from "react";

const intialWalletId =
  typeof window !== "undefined"
    ? localStorage.getItem("walletId")
      ? JSON.parse(localStorage.getItem("walletId") || "{}")
      : ""
    : "";

interface WalletState {
  accountAddress: string;
  networkId: string;
  isWalletConnected: boolean;
  showConnectWallet: boolean;
  walletId: string;
  chainType: string;
  setAccountAddress: (x: string) => void;
  setNetworkId: (x: string) => void;
  setIsWalletConnected: (x: boolean) => void;
  setShowConnectWallet: (x: boolean) => void;
  setWalletId: (x: string) => void;
  setChainType: (x: string) => void;
}

export const WalletContext = createContext<WalletState>({
  accountAddress: "",
  networkId: "",
  isWalletConnected: false,
  showConnectWallet: false,
  walletId: intialWalletId,
  chainType: "",
  setAccountAddress: (state: string) => {},
  setNetworkId: (state: string) => {},
  setIsWalletConnected: (state: boolean) => {},
  setShowConnectWallet: (state: boolean) => {},
  setWalletId: (state: string) => {},
  setChainType: (state: string) => {},
});

export * from "./state";
