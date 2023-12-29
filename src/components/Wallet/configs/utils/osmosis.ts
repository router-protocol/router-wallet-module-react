import { OsmosisChainInfo } from "@/utils/OsmosisChainInfo";
import { CustomChainType, WalletType } from "../../types";

export const handleOsmosisConnection = async (wallet: WalletType) => {
    // await (window as any).keplr.enable('osmo-test-5')
    await (window as any).keplr.experimentalSuggestChain(OsmosisChainInfo);
    const publicKey = await (window as any).keplr.getKey(OsmosisChainInfo.chainId)

    return {
        _address: publicKey.bech32Address,
        _chainId: OsmosisChainInfo.chainId,
        _walletClient: (window as any).keplr,
        _chainType: CustomChainType.cosmos,
    };
};