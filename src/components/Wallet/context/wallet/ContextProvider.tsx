"use client";
import { getWalletStates, WalletContext } from ".";

const WalletContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WalletContext.Provider value={getWalletStates()}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletContextProvider;
