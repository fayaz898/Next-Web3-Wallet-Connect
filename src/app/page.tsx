"use client";

import styles from "./page.module.css";
import { FallbackComponent } from "@/components/FallBackComponent";
import { ErrorBoundary } from "react-error-boundary";
import { CHAIN_INFO, INPUT_CHAIN_URL } from "@/lib/web3-connections/constants";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import {
  CONNECTION_TYPE,
  getConnection,
  switchNetwork,
} from "@/lib/web3-connections/connections";
import { ConnectionOptions } from "@/lib/components/ConnectionOptions";

export default function Home() {
  const { chainId, account, isActive, connector } = useWeb3React();
  const [blockNumber, setBlockNumber] = useState<number>(0);
  const [connectionType, setConnectionType] = useState<
    CONNECTION_TYPE | null | undefined
  >(null);

  useEffect(() => {
    if (!isActive) {
      setConnectionType(undefined);
    } else {
      setConnectionType(getConnection(connector)?.type ?? undefined);
    }
  }, [connector, isActive]);

  return (
    <main className={styles.main}>
      <div className="App">
        <ErrorBoundary FallbackComponent={FallbackComponent}>
          {INPUT_CHAIN_URL === "" && (
            <h2 className="error">Please set your RPC URL in config.ts</h2>
          )}
          <h3>{`Block Number: ${blockNumber + 1}`}</h3>
          <ConnectionOptions
            connector={connector}
            activeConnectionType={connectionType}
            isConnectionActive={isActive}
            onActivate={setConnectionType}
            onDeactivate={setConnectionType}
          />
          <h3>{`ChainId: ${chainId}`}</h3>
          <h3>{`Connected Account: ${account}`}</h3>
          {Object.keys(CHAIN_INFO).map((chainId) => (
            <div key={chainId}>
              <button
                className="btn btn-warning m-2"
                onClick={() => switchNetwork(parseInt(chainId), connectionType)}
              >
                {`Switch to ${CHAIN_INFO[chainId].label}`}
              </button>
            </div>
          ))}
        </ErrorBoundary>
      </div>
    </main>
  );
}
