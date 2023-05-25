"use client";
import { useWalletStates, WalletContext } from ".";

const WalletContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WalletContext.Provider value={useWalletStates()}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletContextProvider;
