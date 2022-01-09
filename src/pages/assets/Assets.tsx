import { Layout, Row, Col, Card, Divider, Spin, Image } from "antd";
import { useGetAssetsQuery } from "../../store/api/Endpoints";
import { Asset } from "../../types";
import useScreenModel from "../../hooks/useScreenModel";
import { useDispatch } from "react-redux";
import { openAssetModal } from "../../store/modules/layout/actions";
import { toDate, format } from "../../static/DateFn";

import styles from "./Assets.module.scss";
import { ASSET_STATUS } from "../../static/constants";
import HealthScore from "../../components/shared/health-score/HealthScore";

function Ativos() {
  const dispatch = useDispatch();

  const { isFetching, isLoading, data } = useGetAssetsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const isTablet = useScreenModel("tablet");

  function handleClickCard(asset: Asset) {
    dispatch(openAssetModal(asset));
  }

  function renderDescription(asset: Asset) {
    const status = ASSET_STATUS[asset.status];
    return (
      <div>
        <h3 style={{ color: status.color }}>{status.text}</h3>
        <p>
          Última atualização:{" "}
          {format(toDate(asset.metrics.lastUptimeAt), "dd/MM/yyyy HH/mm")}
        </p>
        <p>
          Status da saúde: <HealthScore healthScore={asset.healthscore} />
        </p>
      </div>
    );
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
              xs={24}
              sm={12}
              md={8}
              xl={6}
              xxl={4}
              key={asset.id}
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
                      height="14.0625rem"
                    />
                  </div>
                }
              >
                <Card.Meta
                  title={<h2>{asset.name}</h2>}
                  description={renderDescription(asset)}
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
