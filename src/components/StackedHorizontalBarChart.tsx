import * as React from "react";
import vegaEmbed from "vega-embed";
import cloneDeep from "lodash/cloneDeep";

import stackedVegaSpec from "../static/charts/stackedhorizontalbar.json";
import util from "../services/util";
import "./HorizontalBarChart.scss";
import { getColorsUsingStaticDefinition } from "../services/colorcoding";

const vegaEmbedOptions = {
  actions: false,
};

const sumReducer = (previousValue, currentItem) => {
  if (currentItem?.recent?.waarde) {
    return previousValue + currentItem?.recent?.waarde;
  }
  return previousValue;
};

const calcPosition = (d, values) => {
  return d.i === 0
    ? d.value / 2
    : values
        .filter((v) => v.gebied === d.gebied)
        .slice(0, d.i)
        .reduce((previousValue, currentItem) => {
          if (currentItem.value) {
            return previousValue + currentItem.value;
          }
          return previousValue;
        }, 0) +
        d.value / 2;
};

const StackedHorizontalBarChart = ({
  title,
  config,
  gwb,
  customVegaSpec = null,
  scaleToHundred = false,
}) => {
  const chartRef = React.useRef<HTMLDivElement>(null);

  async function updateData() {
    const colors = getColorsUsingStaticDefinition(config);
    const chartdata = await util.getLatestConfigCijfers(gwb, config);
    const cityAverage = await util.getLatestConfigCijfers(
      { volledige_code: "STAD", naam: "Amsterdam" },
      config
    );
    const chartBase = cloneDeep(
      customVegaSpec ? customVegaSpec : stackedVegaSpec
    );

    const baseMultiplier = scaleToHundred
      ? 100 / chartdata.reduce(sumReducer, 0)
      : 1;
    const cityMultiplier = scaleToHundred
      ? 100 / cityAverage.reduce(sumReducer, 0)
      : 1;

    const filteredChartData = chartdata.filter((d) => d.recent);
    const filteredCityAverage = cityAverage.filter((d) => d.recent);

    chartBase.data.values = filteredChartData.map((d, i) => {
      const scaledValue = Math.round(d?.recent?.waarde * baseMultiplier) || 0;

      return {
        i,
        key: d.label,
        value: scaledValue,
        label:
          d.recent && d.recent.waarde !== null
            ? d.recent.waarde
            : "Geen gegevens",
        color: colors[i],
        gebied: d?.gebied?.naam,
      };
    });

    chartBase.data.values = chartBase.data.values.concat(
      filteredCityAverage.map((d, i) => {
        const scaledValue = Math.round(d?.recent?.waarde * cityMultiplier) || 0;

        return {
          i,
          key: d.label,
          value: scaledValue,
          label:
            d.recent && d.recent.waarde !== null
              ? d.recent.waarde
              : "Geen gegevens",
          color: colors[i],
          gebied: d?.gebied?.naam,
        };
      })
    );

    chartBase.data.values = chartBase.data.values.map((d, i) => ({
      ...d,
      position: calcPosition(d, chartBase.data.values),
    }));

    if (!customVegaSpec) {
      chartBase.layer[0].encoding.color["scale"] = {
        domain: config.map((i) => i.label),
        range: colors,
      };
    }

    if (chartRef.current) {
      vegaEmbed(chartRef.current, chartBase, vegaEmbedOptions);
    }
  }

  React.useEffect(() => {
    if (!gwb) {
      return;
    }

    updateData();
  }, [gwb]);

  return (
    <div className="block-container">
      <h3>{title}</h3>
      <div ref={chartRef}></div>
    </div>
  );
};

export default StackedHorizontalBarChart;
