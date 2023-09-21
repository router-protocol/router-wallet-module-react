import { checkIfRouterChainId } from ".";
import { CustomChainType, WalletId, WalletType } from "../../types";
import { adapter } from "./tron";

export const handleInjectedConnection = async (wallet: WalletType) => {
  try {
    await wallet.connector.connect();

    const _walletClient = await wallet.connector.getWalletClient();

    const _address = (await _walletClient.getAddresses())[0];
    const _chainId = await _walletClient.getChainId();
    let _chainType = CustomChainType.ethereum;
    if (checkIfRouterChainId(_chainId.toString())) {
      _chainType = CustomChainType.router;
    }
    return {
      _address,
      _chainId,
      _walletClient,
      _chainType,
    };
  } catch (e: any) {
    console.log("handleInjectedConnection error - ", e);
    //throw new Error(e);
  }
};

export const subscribeInjectedWallet = ({
  wallet,
  setAccountAddress,
  setNetworkId,
  setChainType,
}: {
  wallet: WalletType;
  setAccountAddress: (x: string) => void;
  setNetworkId: (x: string) => void;
  setChainType: (x: string) => void;
}) => {
  const { id, connector } = wallet;
  if (id === WalletId.injected || id === WalletId.walletconnect) {
    connector.on("change", ({ account, chain }) => {
      //change current wallet address
      if (account) {
        console.log(`Account Changed`);
        setAccountAddress(account);
      }
      if (chain) {
        console.log(`Chain Changed`);
        setNetworkId(chain.id.toString());
        if (chain.id.toString().includes("96")) {
          setChainType(CustomChainType.router);
        } else {
          setChainType(CustomChainType.ethereum);
        }
      }
    });
  }
  if(id === WalletId.tron) {
    adapter.on('connect', () => {
      console.log(`TRON address ${adapter.address}`)
      setAccountAddress(adapter.address!)
    })
    adapter.on("accountsChanged", () => {
      if(adapter.address) {
        console.log(`TRON account changed ${adapter.address}`)
        setAccountAddress(adapter.address!)
      }
    })
    adapter.on('chainChanged', async () => {
      const network = await adapter.network()
      setNetworkId(network.chainId)
      setChainType(CustomChainType.tron)
      console.log(`TRON chain changed ${network.chainId}`)
    })
  }
};
