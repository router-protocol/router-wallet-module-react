import {
  CasperClient,
  CLPublicKey,
  CLValueBuilder,
  Contracts,
  DeployUtil,
  RuntimeArgs,
} from "casper-js-sdk";
import { WalletId, WalletType } from "../../types";
import axios from "axios";

// Timeout (in ms) for requests to the extension [DEFAULT: 30 min]
const REQUESTS_TIMEOUT_MS = 30 * 60 * 1000;

export const getCasperProvider = () => {
  const providerConstructor = window.CasperWalletProvider;
  if (typeof providerConstructor === "undefined") {
    alert("Capser Wallet is not installed");
    return;
  }
  const provider = providerConstructor({
    timeout: REQUESTS_TIMEOUT_MS,
  });
  return provider;
};

export const handleCasperConnection = async (wallet: WalletType) => {
  try {
    const provider: any = getCasperProvider();
    const connection = await provider.requestConnection();
    console.log("connection response - ", connection);

    if (!connection) {
      alert("Connection to casper wallet failed");
    } else {
      const publicKey = await provider.getActivePublicKey();
      return {
        _address: publicKey,
        // TODO: Update chainId dynamically
        _chainId: "casper-test",
        _walletClient: wallet,
        _chainType: WalletId.casper,
      };
    }
  } catch (error) {
    console.error("error connecting to casper wallet", error);
  }
};

export const disconnectCasperWallet = async () => {
  try {
    const provider: any = getCasperProvider();
    await provider.disconnectFromSite();
  } catch (error) {
    console.error("error disconnecting from casper wallet", error);
  }
};

export const signAndDeploy = async (
  contractAddress: string,
  functionSelector: string,
  publicKey: string,
  params: string,
  amount: number
) => {
  const provider = getCasperProvider();
  const NODE_URL = "http://65.108.127.242:7777/rpc";
  // TODO: Update chain id dynamically
  const CHAIN_ID = "casper-test"; // "casper" for mainnet
  // const CONTRACT_HASH = "hash-75143aa708275b7dead20ac2cc06c1c3eccff4ffcf1eb9aebb8cce7c35cea041";
  const casperClient = new CasperClient(NODE_URL);
  const contract = new Contracts.Contract(casperClient);
  contract.setContractHash(contractAddress);
  const runtimeArguments = RuntimeArgs.fromMap({
    params: CLValueBuilder.string(params), // message
  });
  const deploy = contract.callEntrypoint(
    functionSelector,
    runtimeArguments,
    CLPublicKey.fromHex(publicKey),
    CHAIN_ID,
    amount.toString() // "1000000000" // 1 CSPR (10^9 Motes)
  );
  const deployJSON = DeployUtil.deployToJson(deploy);

  try {
    const signedDeploy = await provider.sign(
      JSON.stringify(deployJSON),
      publicKey
    );
    const response = await axios.post(
      "http://65.108.127.242:7777/sendDeploy",
      signedDeploy,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("response - ", response);
    alert(response.data);
  } catch (error) {
    console.error("error signing and deploying", error);
  }
};
