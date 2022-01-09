import { Modal } from "antd";
import ReactJson from "react-json-view";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../store";
import { closeAssetModal } from "../../store/modules/layout/actions";
// import { Asset } from "../../types";

// interface AssetModalProps {
//   asset?: Asset;
//   onClose(): void;
// }

function AssetModal() {
  const dispatch = useDispatch();

  const asset = useSelector((state: IState) => state.layout.assetModalActived);

  function onClose() {
    dispatch(closeAssetModal());
  }

  if (!asset) return null;

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
