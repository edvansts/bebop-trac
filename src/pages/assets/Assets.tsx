import { Layout, Row, Col, Card, Divider, Spin, Image } from "antd";
import { useGetAssetsQuery } from "../../store/api/Endpoints";
import { Asset, AssetStatus } from "../../types";
import useScreenModel from "../../hooks/useScreenModel";
import { useDispatch } from "react-redux";
import { openAssetModal } from "../../store/modules/layout/actions";

import styles from "./Assets.module.scss";

const STATUS: Record<AssetStatus, string> = {
  inAlert: "Em alerta",
  inDowntime: "Inativo",
  inOperation: "Em operação",
};

function Ativos() {
  const dispatch = useDispatch();

  const { isFetching, isLoading, data } = useGetAssetsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const isTablet = useScreenModel("tablet");
  const isMobile = useScreenModel("mobile");

  const spanSize = isMobile ? 24 : isTablet ? 12 : 8;

  function handleClickCard(asset: Asset) {
    dispatch(openAssetModal(asset));
  }

  return (
    <Layout.Content
      style={{
        margin: isTablet ? "1.25rem 1.25rem 0" : "1.25rem 2.5rem 0",
      }}
    >
      <Divider orientation="left">Ativos</Divider>

      <Spin size="large" spinning={isLoading || isFetching}>
        <Row gutter={[20, 20]}>
          {data?.assets?.map((asset) => (
            <Col
              key={asset.id}
              span={spanSize}
              onClick={() => handleClickCard(asset)}
            >
              <Card
                style={{ height: "100%" }}
                bordered
                hoverable
                cover={
                  <div className={styles.cardImageContainer}>
                    <Image
                      onClick={(event) => event.stopPropagation()}
                      alt={asset.name}
                      src={asset.image}
                      width="auto"
                      height="15.625rem"
                    />
                  </div>
                }
              >
                <Card.Meta
                  title={asset.name}
                  description={STATUS[asset.status]}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Spin>
    </Layout.Content>
  );
}

export default Ativos;
