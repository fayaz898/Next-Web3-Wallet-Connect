import {
  CONNECTION_TYPE,
  getConnection,
  tryActivateConnector,
  tryDeactivateConnector,
} from "../web3-connections/connections";

export const Option = ({
  isEnabled,
  isConnected,
  connectionType,
  onActivate,
  onDeactivate,
}: {
  isEnabled: boolean;
  isConnected: boolean;
  connectionType: CONNECTION_TYPE;
  onActivate: (connectionType: CONNECTION_TYPE) => void;
  onDeactivate: (connectionType: null) => void;
}) => {
  const onClick = async () => {
    if (isConnected) {
      const deactivation = await tryDeactivateConnector(
        getConnection(connectionType).connector
      );
      if (deactivation == undefined) return;
      onDeactivate(deactivation);
      return;
    }

    const activation = await tryActivateConnector(
      getConnection(connectionType).connector
    );
    if (!activation) return;
    onActivate(activation);
    return;
  };

  return (
    <div>
      <button onClick={onClick} disabled={!isEnabled}>
        {`${isConnected ? "Disconnect" : "Connect"} ${connectionType}`}
      </button>
    </div>
  );
};
