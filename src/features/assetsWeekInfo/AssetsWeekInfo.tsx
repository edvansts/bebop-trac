import React, { useMemo } from "react";
import { Spin } from "antd";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { isEmpty, isUndefined } from "lodash";
import { useGetAssetsQuery } from "../../store/api/Endpoints";
import { colors } from "../../static/Styles";
import { addDays, format } from "date-fns";
import subDays from "date-fns/subDays";

function AssetsWeekInfo() {
  const { data, isLoading } = useGetAssetsQuery(undefined, {
    pollingInterval: 60000,
  });

  const inOperationInfos = data?.lastWeekInfo
    ? data.lastWeekInfo.map((info) => info.assetsInOperation)
    : [];
  const inAlertInfos = data?.lastWeekInfo
    ? data.lastWeekInfo.map((info) => info.assetsInAlert)
    : [];
  const inDowntimeInfos = data?.lastWeekInfo
    ? data.lastWeekInfo.map((info) => info.assetsInDowntime)
    : [];

  const days = useMemo<string[] | undefined>(() => {
    if (!data) return undefined;

    let newDays = data.lastWeekInfo.map((info) => format(info.day, "dd/MM"));

    if (isEmpty(newDays)) {
      return newDays;
    }

    const firstDate = format(subDays(data.lastWeekInfo[0].day, 1), "dd/MM");
    const lastDate = format(
      addDays(data.lastWeekInfo[data.lastWeekInfo.length - 1].day, 1),
      "dd/MM"
    );

    newDays = [firstDate, ...newDays, lastDate];
    return newDays;
  }, [data]);

  return (
    <Spin spinning={isLoading} size="large">
      <div className="graph-container">
        {!isUndefined(data?.assets) ? (
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              title: {
                text: "Situação dos Ativos nos últimos 7 dias",
              },

              yAxis: {
                title: {
                  text: "Número de Ativos",
                },
              },

              xAxis: {
                accessibility: {
                  rangeDescription: `Distância: 01/01 - 08/01`,
                },
                categories: days,
              },

              legend: {
                layout: "vertical",
                align: "right",
                verticalAlign: "middle",
              },

              plotOptions: {
                series: {
                  label: {
                    connectorAllowed: false,
                  },
                  pointStart: 1,
                },
              },

              series: [
                {
                  name: "Em funcionamento",
                  data: inOperationInfos,
                  color: colors.green,
                },
                {
                  name: "Em alerta",
                  data: inAlertInfos,
                  color: colors.warn,
                },
                {
                  name: "Inativos",
                  data: inDowntimeInfos,
                  color: colors.red,
                },
              ],

              responsive: {
                rules: [
                  {
                    condition: {
                      maxWidth: 500,
                    },
                    chartOptions: {
                      legend: {
                        layout: "horizontal",
                        align: "center",
                        verticalAlign: "bottom",
                      },
                    },
                  },
                ],
              },
              credits: {
                enabled: false,
              },
            }}
          />
        ) : null}
      </div>
    </Spin>
  );
}

export default AssetsWeekInfo;
