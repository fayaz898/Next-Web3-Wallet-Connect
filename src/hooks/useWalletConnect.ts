import { NETWORKS, NETWORKS_SLUG } from "@/helper/core_constant";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const useWalletConnect = () => {
  const network = NETWORKS[NETWORKS_SLUG.LOCAL];

  const { account, isActivating, isActive, connector } = useWeb3React();

  const connectToMetamask = () => {
    const injected = new InjectedConnector({
      supportedChainIds: [network.chain_id],
    });

    const connect = async () => {
      try {
        await connector.activate(injected);
      } catch (ex) {
        console.log(ex);
      }
    };

    const disconnect = () => {
      if (connector && typeof connector.deactivate === "function") {
        try {
          connector.deactivate();
        } catch (ex) {
          console.log(ex);
        }
      }
    };

    return {
      connect,
      disconnect,
    };
  };

  const connectToWalletConnect = () => {
    const walletconnect = new WalletConnectConnector({
      rpc: { [network.chain_id]: network.rpc_url },
      bridge: "https://bridge.walletconnect.org",
      qrcode: true,
    });
    const connect = async () => {
      try {
        await connector.activate(walletconnect);
      } catch (ex) {
        console.log(ex);
      }
    };

    const disconnect = () => {
      if (connector && typeof connector.deactivate === "function") {
        try {
          connector.deactivate();
        } catch (ex) {
          console.log(ex);
        }
      }
    };

    return {
      connect,
      disconnect,
    };
  };

  return {
    account,
    isActivating,
    isActive,
    connectToWalletConnect,
    connectToMetamask,
  };
};
