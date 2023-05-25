import { useContext } from "react";
import { WalletContext } from "../context/wallet";

export const useAccountAddress = (): [string, (args: string) => void] => {
  const { accountAddress, setAccountAddress } = useContext(WalletContext);
  return [accountAddress, setAccountAddress];
};
