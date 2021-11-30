import React from "react";
import { Modal } from "antd";
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
    ></Modal>
  );
}

export default AssetModal;
