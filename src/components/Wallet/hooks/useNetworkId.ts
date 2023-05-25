import { useContext } from "react";
import { WalletContext } from "../context/wallet";

export const useNetworkId = (): [string, (args: string) => void] => {
  const { networkId, setNetworkId } = useContext(WalletContext);
  return [networkId, setNetworkId];
};
