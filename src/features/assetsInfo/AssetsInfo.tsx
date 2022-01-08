import React from "react";
import { Spin } from "antd";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { colors } from "../../static/colors";
import { useGetAssetsQuery } from "../../store/api/Endpoints";
import { isUndefined } from "lodash";

function AssetsInfo() {
  const { data, isLoading } = useGetAssetsQuery(undefined, {
    pollingInterval: 60000,
  });

  return (
    <Spin spinning={isLoading} size="large">
      {!isUndefined(data?.assets) ? (
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
              text: `Total de ativos: ${data?.assets?.length}`,
            },
            xAxis: {
              categories: ["Em funcionamento", "Em alerta", "Inativos"],
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
                    name: "Em funcionamento",
                    y: data?.inOperation?.length || 0,
                  },
                  {
                    name: "Em alerta",
                    y: data?.inAlert.length || 0,
                  },
                  {
                    name: "Inativo",
                    y: data?.inDowntime?.length || 0,
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
