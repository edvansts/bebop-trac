import { Modal } from "antd";
import ReactJson from "react-json-view";
import { Asset } from "../../types";

interface AssetModalProps {
  asset: Asset;
  onClose(): void;
}

function AssetModal({ asset, onClose }: AssetModalProps) {
  return (
    <Modal
      title={asset.name}
      visible
      closable
      onCancel={onClose}
      footer={null}
      style={{ minWidth: "600px" }}
    >
      <ReactJson src={asset} theme="google" />
    </Modal>
  );
}

export default AssetModal;
