import React from "react";
import { Spin } from "antd";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { useGetAssetsQuery } from "../../store/api/Endpoints";

function AssetsInfo() {
  const { isFetching, isLoading, data: assets } = useGetAssetsQuery();

  const inAlert = assets?.filter((asset) => asset.status === "inAlert");
  const inDowntime = assets?.filter((asset) => asset.status === "inDowntime");
  const inOperation = assets?.filter((asset) => asset.status === "inOperation");

  return (
    <Spin spinning={isFetching || isLoading} size="large">
      {!isFetching ? (
        <HighchartsReact
          highcharts={Highcharts}
          options={{
            chart: {
              type: "bar",
            },
            title: {
              text: "Condição dos ativos",
            },
            subtitle: {
              text: `Total de ativos: ${assets?.length}`,
            },
            xAxis: {
              categories: ["Em alerta", "Inativo", "Em operação"],
              title: {
                text: null,
              },
            },
            yAxis: {
              min: 0,
              title: {
                text: "Quantidade",
                align: "high",
              },
              labels: {
                overflow: "justify",
              },
            },

            plotOptions: {
              bar: {
                dataLabels: {
                  enabled: true,
                },
              },
            },
            legend: {
              layout: "vertical",
              align: "right",
              verticalAlign: "top",
              x: -40,
              y: 80,
              floating: true,
              borderWidth: 1,
              backgroundColor:
                Highcharts.defaultOptions.legend?.backgroundColor || "#FFFFFF",
              shadow: true,
            },
            credits: {
              enabled: false,
            },
            series: [
              {
                name: "Status",
                colorByPoint: true,
                data: [
                  {
                    name: "Em alerta",
                    y: inAlert?.length || 0,
                  },
                  {
                    name: "Inativo",
                    y: inDowntime?.length || 0,
                  },
                  {
                    name: "Em funcionamento",
                    y: inOperation?.length || 0,
                  },
                ],
              },
            ],
          }}
        />
      ) : null}
    </Spin>
  );
}

export default AssetsInfo;
