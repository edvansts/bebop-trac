import React from "react";
import { Col, Layout, Row } from "antd";
import AssetsInfo from "../../features/assetsInfo/AssetsInfo";
import GeneralStatistics from "../../components/general-statistics/GeneralStatistics";
import useScreenModel from "../../hooks/useScreenModel";

function Dashboard() {
  const isTablet = useScreenModel("tablet");

  return (
    <Layout.Content
      style={{
        margin: isTablet ? "1.25rem 1.25rem 2.5rem" : "1.25rem 2.5rem 2.5rem",
      }}
    >
      {/* <Divider orientation="left">
          <Breadcrumb separator=">">
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
        </Divider> */}

      <GeneralStatistics />

      <Row>
        <Col
          span={isTablet ? 24 : 12}
          className={`${isTablet ? "all-width" : ""}`}
        >
          <AssetsInfo />
        </Col>
        <Col span={isTablet ? 24 : 12}></Col>
      </Row>
    </Layout.Content>
  );
}

export default Dashboard;
