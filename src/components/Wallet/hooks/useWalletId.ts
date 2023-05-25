import { useContext } from "react";
import { WalletContext } from "../context/wallet";

export const useWalletId = (): [string, (args: string) => void] => {
  const { walletId, setWalletId } = useContext(WalletContext);
  return [walletId, setWalletId];
};
