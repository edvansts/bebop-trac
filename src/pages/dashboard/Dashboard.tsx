import React from "react";
import { Col, Layout, Row } from "antd";
import AssetsInfo from "../../features/assets-info/AssetsInfo";
import GeneralStatistics from "../../components/general-statistics/GeneralStatistics";
import useScreenModel from "../../hooks/useScreenModel";
import AssetsWeekInfo from "../../features/assets-week-info/AssetsWeekInfo";

function Dashboard() {
  const isTablet = useScreenModel("tablet");
  const isMobile = useScreenModel("mobile");

  return (
    <Layout.Content
      style={{
        margin: isTablet ? "1.25rem 1.25rem 0" : "1.25rem 2.5rem 0",
      }}
    >
      {/* <Divider orientation="left">
          <Breadcrumb separator=">">
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
        </Divider> */}

      <GeneralStatistics />

      <Row gutter={[isMobile ? 0 : 16, 20]}>
        <Col span={isTablet ? 24 : 12}>
          <AssetsInfo />
        </Col>
        <Col span={isTablet ? 24 : 12}>
          <AssetsWeekInfo />
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default Dashboard;
