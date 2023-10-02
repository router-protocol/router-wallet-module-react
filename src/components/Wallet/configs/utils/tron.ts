import { TronLinkAdapter } from "@tronweb3/tronwallet-adapters";
import { CustomChainType, WalletType } from "../../types";

export const adapter = new TronLinkAdapter();

export const handleTronConnection = async (wallet: WalletType) => {
    // console.log(`Tron wallet`, wallet)
    await adapter.connect();
    const network = await adapter.network()

    return {
        _address: adapter.address!,
        _chainId: parseInt(network.chainId, 16).toString(),
        _walletClient: window.tron?.tronWeb,
        _chainType: CustomChainType.tron,
    };
};