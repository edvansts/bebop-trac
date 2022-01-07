import React from "react";
import { Spin } from "antd";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import useAssetsInfo from "../../hooks/useAssetsInfo";
import { colors } from "../../static/colors";

function AssetsInfo() {
  const { assets, inAlert, inDowntime, inOperation, isFetching, isLoading } =
    useAssetsInfo();

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
            colors: [colors.green, colors.warn, colors.red],
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
