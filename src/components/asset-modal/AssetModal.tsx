import { Card, Col, Image, Modal, Row, Tree } from "antd";
import { DataNode } from "antd/lib/tree";
import { entries, isEmpty } from "lodash";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import HealthScore from "../../assets/shared/health-score/HealthScore";
import { ASSET_STATUS } from "../../static/constants";
import { format, toDate } from "../../static/DateFn";
import { IState } from "../../store";
import { closeAssetModal } from "../../store/modules/layout/actions";
import { Asset } from "../../types";
import CompanyCard from "../company-card/CompanyCard";
import UnitCard from "../unit-card/UnitCard";

function AssetModal() {
  const dispatch = useDispatch();

  const asset: Asset | undefined = useSelector(
    (state: IState) => state.layout.assetModalActived
  );

  const metricsTreeData = useMemo<DataNode[] | null>(() => {
    if (!asset || isEmpty(asset?.metrics)) {
      return null;
    }

    const treeData: DataNode[] = [
      { key: "0-0", title: <b>Métricas</b>, children: [] },
    ];

    entries(asset.metrics).forEach((entrie, index) => {
      switch (entrie[0]) {
        case "totalCollectsUptime":
          return treeData[0].children?.push({
            key: `0-0-${index}`,
            title: (
              <p>
                <b>Total de coletas</b>: <span>{entrie[1]}</span>
              </p>
            ),
          });
        case "totalUptime":
          return treeData[0].children?.push({
            key: `0-0-${index}`,
            title: (
              <p>
                <b>Total de horas coletadas</b>:{" "}
                <span>{Number(entrie[1]).toFixed(2)}</span>
              </p>
            ),
          });
        case "lastUptimeAt":
          return treeData[0].children?.push({
            key: `0-0-${index}`,
            title: (
              <p>
                <b>Última coleta em</b>:{" "}
                <span>
                  {format(toDate(String(entrie[1])), "dd/MM/yyyy HH:mm")}
                </span>
              </p>
            ),
          });
      }
    });

    return treeData;
  }, [asset]);

  const specificationsTreeData = useMemo<DataNode[] | null>(() => {
    if (!asset || isEmpty(asset?.specifications)) {
      return null;
    }

    const treeData: DataNode[] = [
      { key: "0-0", title: <b>Especificações</b>, children: [] },
    ];

    entries(asset.specifications).forEach((entrie, index) => {
      switch (entrie[0]) {
        case "rpm":
          return treeData[0].children?.push({
            key: `0-0-${index}`,
            title: (
              <p>
                <b>RPM</b>: <span>{entrie[1]} rpm</span>
              </p>
            ),
          });
        case "maxTemp":
          return treeData[0].children?.push({
            key: `0-0-${index}`,
            title: (
              <p>
                <b>Temperatura máxima:</b> <span>{entrie[1]} Cº</span>
              </p>
            ),
          });
        case "power":
          return treeData[0].children?.push({
            key: `0-0-${index}`,
            title: (
              <p>
                <b>Potência</b>: <span>{entrie[1]} kWh</span>
              </p>
            ),
          });
      }
    });

    return treeData;
  }, [asset]);

  function onClose() {
    dispatch(closeAssetModal());
  }

  if (!asset) return null;

  const status = ASSET_STATUS[asset.status];

  return (
    <Modal title={asset.name} visible closable onCancel={onClose} footer={null}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={14} style={{ textAlign: "left" }}>
          <Card>
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

            {specificationsTreeData ? (
              <Tree treeData={specificationsTreeData} />
            ) : null}

            {metricsTreeData ? <Tree treeData={metricsTreeData} /> : null}

            <div>
              <UnitCard id={`${asset.unitId}`} onCloseCallback={onClose} />
            </div>

            <div style={{ marginTop: "0.625rem" }}>
              <CompanyCard
                id={`${asset.companyId}`}
                onCloseCallback={onClose}
              />
            </div>
          </Card>
        </Col>

        <Col
          md={10}
          sm={24}
          xs={24}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div style={{ maxHeight: "12.5rem" }}>
            <Image
              onClick={(event) => event.stopPropagation()}
              alt={asset.name}
              src={asset.image}
              width="auto"
            />
          </div>
        </Col>
      </Row>
    </Modal>
  );
}

export default AssetModal;
