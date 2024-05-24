import { initializeConnector } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { CONNECTION_TYPE, Connection, onConnectionError } from "./connections";
import { CoinbaseWallet } from "@web3-react/coinbase-wallet";
import { CHAIN_TO_URL_MAP, INPUT_CHAIN_ID, INPUT_CHAIN_URL } from "./constants";
import { GnosisSafe } from "@web3-react/gnosis-safe";
import { WalletConnect } from "@web3-react/walletconnect";
import { Network } from "@web3-react/network";

export const buildInjectedConnector = () => {
  const [web3MetamaskWallet, web3MetamaskWalletHooks] =
    initializeConnector<MetaMask>(
      (actions) => new MetaMask({ actions, onError: onConnectionError })
    );

  const injectedConnection: Connection = {
    connector: web3MetamaskWallet,
    hooks: web3MetamaskWalletHooks,
    type: CONNECTION_TYPE.INJECTED,
  };

  return injectedConnection;
};

export const buildCoinbaseWalletConnector = () => {
  const [web3CoinbaseWallet, web3CoinbaseWalletHooks] =
    initializeConnector<CoinbaseWallet>(
      (actions) =>
        new CoinbaseWallet({
          actions,
          options: {
            url: INPUT_CHAIN_URL,
            appName: "Openzeppline Example",
          },
          onError: onConnectionError,
        })
    );

  const coinbaseWalletConnection: Connection = {
    connector: web3CoinbaseWallet,
    hooks: web3CoinbaseWalletHooks,
    type: CONNECTION_TYPE.COINBASE_WALLET,
  };

  return coinbaseWalletConnection;
};

export const buildGnosisSafeConnector = () => {
  const [web3GnosisSafe, web3GnosisSafeHooks] = initializeConnector<GnosisSafe>(
    (actions) => new GnosisSafe({ actions })
  );

  const gnosisSafeConnection: Connection = {
    connector: web3GnosisSafe,
    hooks: web3GnosisSafeHooks,
    type: CONNECTION_TYPE.GNOSIS_SAFE,
  };

  return gnosisSafeConnection;
};

export const buildWalletConnectConnector = () => {
  const [web3WalletConnect, web3WalletConnectHooks] =
    initializeConnector<WalletConnect>(
      (actions) =>
        new WalletConnect({
          actions,
          options: {
            rpc: CHAIN_TO_URL_MAP,
            qrcode: true,
          },
          onError: onConnectionError,
        })
    );

  const walletConnectConnection: Connection = {
    connector: web3WalletConnect,
    hooks: web3WalletConnectHooks,
    type: CONNECTION_TYPE.WALLET_CONNECT,
  };

  return walletConnectConnection;
};

export const buildNetworkConnector = () => {
  const [web3Network, web3NetworkHooks] = initializeConnector<Network>(
    (actions) =>
      new Network({
        actions,
        urlMap: CHAIN_TO_URL_MAP,
        defaultChainId: INPUT_CHAIN_ID,
      })
  );

  const networkConnection: Connection = {
    connector: web3Network,
    hooks: web3NetworkHooks,
    type: CONNECTION_TYPE.NETWORK,
  }

  return networkConnection;
};
