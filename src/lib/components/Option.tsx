import { Connector } from "@web3-react/types";
import {
  CONNECTION_TYPE,
  tryActivateConnector,
  tryDeactivateConnector,
} from "../web3-connections/connections";

export const Option = ({
  connector,
  isEnabled,
  isConnected,
  connectionType,
  onActivate,
  onDeactivate,
}: {
  connector: Connector;
  isEnabled: boolean;
  isConnected: boolean;
  connectionType: CONNECTION_TYPE;
  onActivate: (connectionType: CONNECTION_TYPE) => void;
  onDeactivate: (connectionType: null | undefined) => void;
}) => {
  const onClick = async () => {
    if (isConnected) {
      const deactivation = await tryDeactivateConnector(connector);
      onDeactivate(deactivation);
      if (deactivation == undefined) return;
      return;
    }

    const activation = await tryActivateConnector(connector);

    if (!activation) return;
    onActivate(activation);
    return;
  };

  return (
    <div>
      <button
        className="btn btn-success m-2"
        onClick={onClick}
        disabled={!isEnabled}
      >
        {`${isConnected ? "Disconnect" : "Connect"} ${connectionType}`}
      </button>
    </div>
  );
};
