import { useContext } from "react";
import { WalletContext } from "../context/wallet";

export const useWalletConnected = (): [boolean, (args: boolean) => void] => {
  const { isWalletConnected, setIsWalletConnected } = useContext(WalletContext);
  return [isWalletConnected, setIsWalletConnected];
};
