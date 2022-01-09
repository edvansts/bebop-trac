import React from "react";
import { Spin } from "antd";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { colors } from "../../static/Styles";
import { useGetAssetsQuery } from "../../store/api/Endpoints";
import { isUndefined } from "lodash";
import { percentage } from "../../static/FnUtils";

function AssetsInfo() {
  const { data, isLoading } = useGetAssetsQuery(undefined, {
    pollingInterval: 60000,
  });

  const inAlertPercentage =
    data?.assets && data.inAlert
      ? percentage(data?.inAlert.length, data?.assets.length)
      : 0;
  const inOperationPercentage =
    data?.assets && data.inOperation
      ? percentage(data?.inOperation.length, data?.assets.length)
      : 0;
  const inDowntimePercentage =
    data?.assets && data.inDowntime
      ? percentage(data?.inDowntime.length, data?.assets.length)
      : 0;

  return (
    <Spin spinning={isLoading} size="large">
      <div className="graph-container">
        {!isUndefined(data?.assets) ? (
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: "pie",
              },
              title: {
                text: "Condição dos ativos",
              },
              subtitle: {
                text: `Total de ativos: ${data?.assets?.length}`,
              },
              // xAxis: {
              //   categories: ["Em funcionamento", "Em alerta", "Inativos"],
              //   title: {
              //     text: null,
              //   },
              // },
              // yAxis: {
              //   min: 0,
              //   title: {
              //     text: "Quantidade",
              //     align: "high",
              //   },
              //   labels: {
              //     overflow: "justify",
              //   },
              // },
              tooltip: {
                pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
              },
              plotOptions: {
                // bar: {
                //   dataLabels: {
                //     enabled: true,
                //   },
                // },
                pie: {
                  allowPointSelect: true,
                  cursor: "pointer",
                  dataLabels: {
                    enabled: true,
                    format: "<b>{point.name}</b>: {point.percentage:.1f} %",
                  },
                },
              },
              // legend: {
              //   layout: "vertical",
              //   align: "right",
              //   verticalAlign: "top",
              //   x: -40,
              //   y: 80,
              //   floating: true,
              //   borderWidth: 1,
              //   backgroundColor:
              //     Highcharts.defaultOptions.legend?.backgroundColor || "#FFFFFF",
              //   shadow: true,
              // },
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
                      y: inOperationPercentage,
                    },
                    {
                      name: "Em alerta",
                      y: inAlertPercentage,
                    },
                    {
                      name: "Inativos",
                      y: inDowntimePercentage,
                    },
                  ],
                },
              ],
              // series: [
              //   {
              //     name: "Status",
              //     colorByPoint: true,
              //     data: [
              //       {
              //         name: "Em funcionamento",
              //         y: data?.inOperation?.length || 0,
              //       },
              //       {
              //         name: "Em alerta",
              //         y: data?.inAlert.length || 0,
              //       },
              //       {
              //         name: "Inativo",
              //         y: data?.inDowntime?.length || 0,
              //       },
              //     ],
              //   },
              // ],
            }}
          />
        ) : null}
      </div>
    </Spin>
  );
}

export default AssetsInfo;
