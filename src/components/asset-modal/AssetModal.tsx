import { Col, Image, Modal, Row } from "antd";
import { isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import ButtonAnchor from "../../assets/shared/button-anchor/ButtonAnchor";
import HealthScore from "../../assets/shared/health-score/HealthScore";
import { ASSET_STATUS } from "../../static/constants";
import { IState } from "../../store";
import { closeAssetModal } from "../../store/modules/layout/actions";

function AssetModal() {
  const dispatch = useDispatch();

  const asset = useSelector((state: IState) => state.layout.assetModalActived);

  function onClose() {
    dispatch(closeAssetModal());
  }

  if (!asset) return null;

  const status = ASSET_STATUS[asset.status];

  return (
    <Modal title={asset.name} visible closable onCancel={onClose} footer={null}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={14} style={{ textAlign: "left" }}>
          <h4 style={{ color: status.color }}>{status.text}</h4>
          <p>
            <b>Id:</b> <span>{asset.id}</span>
          </p>
          <p>
            <b>Status da saúde:</b>{" "}
            <HealthScore healthScore={asset.healthscore} />
          </p>
          <p>
            <b>Sensores:</b> <span>{asset.sensors.join(", ")}</span>
          </p>
          {!isEmpty(asset.specifications) ? (
            <>
              <b>Especificações</b>
              <ul className="disc-list">
                {asset.specifications.maxTemp ? (
                  <li>
                    <b>Temperatura máxima:</b>{" "}
                    <span>{asset.specifications.maxTemp} Cº</span>
                  </li>
                ) : null}
                {asset.specifications.power ? (
                  <li>
                    <b>Poder:</b> <span>{asset.specifications.power} kW</span>
                  </li>
                ) : null}
                {asset.specifications.rpm ? (
                  <li>
                    <b>RPM:</b> <span>{asset.specifications.rpm} rpm</span>
                  </li>
                ) : null}
              </ul>
            </>
          ) : null}

          <div>
            <ButtonAnchor onClick={() => {}}>
              <b>Unidade:</b> <span>{asset.unitId}</span>
            </ButtonAnchor>
          </div>

          <div>
            <ButtonAnchor onClick={() => {}}>
              <b>Empresa:</b> <span>{asset.companyId}</span>
            </ButtonAnchor>
          </div>
        </Col>

        <Col
          md={10}
          sm={24}
          xs={24}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Image
            onClick={(event) => event.stopPropagation()}
            alt={asset.name}
            src={asset.image}
            width="auto"
            height="12.5rem"
          />
        </Col>
      </Row>
    </Modal>
  );
}

export default AssetModal;
