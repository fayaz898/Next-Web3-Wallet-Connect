import { Web3ReactHooks } from "@web3-react/core";
import { AddEthereumChainParameter, Connector } from "@web3-react/types";
import { buildInjectedConnector } from "./connectors";
import { CHAIN_INFO } from "./constants";

export enum CONNECTION_TYPE {
  COINBASE_WALLET = "COINBASE_WALLET",
  GNOSIS_SAFE = "GNOSIS_SAFE",
  INJECTED = "INJECTED",
  NETWORK = "NETWORK",
  WALLET_CONNECT = "WALLET_CONNECT",
}

export interface Connection {
  connector: Connector;
  hooks: Web3ReactHooks;
  type: CONNECTION_TYPE;
}

function getIsBraveWallet(): boolean {
  //@ts-ignore
  return window.ethereum?.isBraveWallet ?? false;
}

export function getHasMetaMaskExtensionInstalled(): boolean {
  //@ts-ignore
  return (window.ethereum?.isMetaMask ?? false) && !getIsBraveWallet();
}

export function onConnectionError(error: Error) {
  console.debug(`web3-react error: ${error}`);
}

export const PRIORITIZED_CONNECTORS: { [key in CONNECTION_TYPE]: Connection } =
  {
    [CONNECTION_TYPE.INJECTED]: buildInjectedConnector(),
    [CONNECTION_TYPE.COINBASE_WALLET]: buildInjectedConnector(),
    [CONNECTION_TYPE.WALLET_CONNECT]: buildInjectedConnector(),
    [CONNECTION_TYPE.GNOSIS_SAFE]: buildInjectedConnector(),
    [CONNECTION_TYPE.NETWORK]: buildInjectedConnector(),
  };

export const getConnection = (connector: Connector | CONNECTION_TYPE) => {
  if (connector instanceof Connector) {
    const connection = Object.values(PRIORITIZED_CONNECTORS).find(
      (conection) => conection.connector == connector
    );

    if (!connection) {
      throw new Error("Unsupported Connector!");
    }

    return connection;
  } else {
    return PRIORITIZED_CONNECTORS[connector];
  }
};

export const switchNetwork = async (
  chainId: number,
  connectionType: CONNECTION_TYPE | null
) => {
  if (!connectionType) return;

  const { connector } = getConnection(connectionType);

  if (
    connectionType == CONNECTION_TYPE.WALLET_CONNECT ||
    connectionType == CONNECTION_TYPE.NETWORK
  ) {
    await connector.activate(chainId);
    return;
  }

  const chainInfo = CHAIN_INFO[chainId];
  const addChainParameter: AddEthereumChainParameter = {
    chainId,
    chainName: chainInfo.label,
    rpcUrls: [chainInfo.rpcUrl],
    nativeCurrency: chainInfo.nativeCurrency,
    blockExplorerUrls: [chainInfo.explorer],
  };
  await connector.activate(addChainParameter);
};

export const tryActivateConnector = async (
  connector: Connector
): Promise<CONNECTION_TYPE | undefined> => {
  await connector.activate();
  const connectionType = getConnection(connector).type;
  return connectionType;
};

export const tryDeactivateConnector = async (
  connector: Connector
): Promise<null | undefined> => {
  connector.deactivate?.();
  connector.resetState();
  return null;
};
