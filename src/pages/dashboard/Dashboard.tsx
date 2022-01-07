import React from "react";
import { Breadcrumb, Divider, Layout } from "antd";
import AssetsInfo from "../../features/assetsInfo/AssetsInfo";
import GeneralStatistics from "../../components/general-statistics/GeneralStatistics";

function Dashboard() {
  return (
    <Layout.Content style={{ margin: "1.25rem 2.5rem 2.5rem" }}>
      <Divider orientation="left">
        <Breadcrumb separator=">">
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </Breadcrumb>
      </Divider>

      <GeneralStatistics />

      <AssetsInfo />
    </Layout.Content>
  );
}

export default Dashboard;
