
# Wallet Module

This module helps in getting a wallet instance with which user's can connect wallet and interact with EVM chains, router chain and near chain.

Goal to create this was to have all kinds of wallet integrated at one place and router chain's dapp creators can just plugin in this wallet module and get started with signing and broadcating transactions to the chains integrated to Router Chain. 

## Installation

1. Copy **Wallet** directory from components in your react project then install these packages.

```bash
  yarn add @emotion/react @emotion/styled @heroicons/react @near-wallet-selector/core @mui/material @near-wallet-selector/my-near-wallet @routerprotocol/router-chain-sdk-ts near-api-js styled-components viem wagmi
```
Note : For installing *@routerprotocol/router-chain-sdk-ts* refer to it's installation guide with UI.

2. Wrap your App with WalletContextProvider
```JS
<WalletContextProvider>
    <App/>
</WalletContextProvider>
```

3. Now you have access to these states -  
```JS
    const [accountAddress] = useAccountAddress();
    const [networkId] = useNetworkId();
    const [isWalletConnected] = useWalletConnected();
    const [chainType] = useChainType();
    const [walletId] = useWalletId();
```

4. You can use *handleSendTransaction* for sending transaction through integrated wallet - 
```JS
    const { handleSendTransaction } = useWallets();
```

5. Currently we have divided transactions into 3 parts 

    a. For EVM chains - 
    ```JS
        const txRespone = await handleSendTransaction({
        from: SENDER_ADDRESS,
        to: RECEIVER_ADDRESS,
        value: ETH_TO_SEND,
        data: RAW_TX_DATA,
        });
    ```
    b. For Router chain - 
    ```JS
    const txResponse = await handleSendTransaction({
            routerNetworkEnv: NETWORK_ENVIRONMENT,
            routerContractAddress: ROUTER_CONTRACT_ADDRESS,
            routerExecuteMsg: EXECUTE_QUERY,
            routerNodeUrl: ROUTER_LCD,
        });
    Ex - 
        const txResponse = await handleSendTransaction({
            routerNetworkEnv: "testnet",
            routerContractAddress: "router1703xucyw0nv2yfs6d082x4crapjly9utn0w2cy42rpcdez3t9dusp287ky",
            routerExecuteMsg: {
                i_ping: {
                    ping: `Hello`,
                    dest_contract_address: "0x862f75cB828B21c9A2F406EEb7F5263C1E012700",
                    dest_chain_id: "80001",
                    request_metadata: "0xee',
                }
            },
            routerNodeUrl: "https://lcd.testnet.routerchain.dev/",
        });
    ```
    c. For EVM chains - 
    ```JS
        const txRespone = await handleSendTransaction({
        from: SENDER_ADDRESS,
        to: RECEIVER_ADDRESS,
        value: ETH_TO_SEND,
        data: RAW_TX_DATA,
        });
    ```
