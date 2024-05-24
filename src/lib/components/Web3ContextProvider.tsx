'use client';

import { Connector } from "@web3-react/types";
import {
  CONNECTION_TYPE,
  PRIORITIZED_CONNECTORS,
  getConnection,
} from "../web3-connections/connections";
import React, { ReactNode, useEffect } from "react";
import { Web3ReactProvider } from "@web3-react/core";

const connect = async (connector: Connector) => {
  try {
    if (connector.connectEagerly) {
      await connector.connectEagerly();
    } else {
      await connector.activate();
    }
  } catch (error) {
    console.debug(`web3-react eager connection error: ${error}`);
  }
};

const connectEgerly = async () => {
  await connect(getConnection(CONNECTION_TYPE.NETWORK).connector);
  await connect(getConnection(CONNECTION_TYPE.GNOSIS_SAFE).connector);
};

export const Web3ContextProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    connectEgerly();
  }, []);

  return (
    <Web3ReactProvider
      connectors={Object.values(PRIORITIZED_CONNECTORS).map((connector) => [
        connector.connector,
        connector.hooks,
      ])}
    >
      {children}
    </Web3ReactProvider>
  );
};
