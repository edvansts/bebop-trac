import { Modal } from "antd";
import ReactJson from "react-json-view";

interface InfoModalProps {
  object: any;
  onClose(): void;
}

function InfoModal({ object, onClose }: InfoModalProps) {
  return (
    <Modal
      title={object.name}
      visible
      closable
      onCancel={onClose}
      footer={null}
      style={{ minWidth: "600px" }}
    >
      <ReactJson src={object} theme="google" />
    </Modal>
  );
}

export default InfoModal;
