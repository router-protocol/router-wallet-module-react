import { useContext } from "react";
import { WalletContext } from "../context/wallet";

export const useChainType = (): [string, (args: string) => void] => {
  const { chainType, setChainType } = useContext(WalletContext);
  return [chainType, setChainType];
};
