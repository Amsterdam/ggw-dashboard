import { useState, useRef, useEffect } from "react";
import vegaEmbed from "vega-embed";
import cloneDeep from "lodash/cloneDeep";
import { Spinner } from "@amsterdam/asc-ui";

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

const getVegaChartData = async (gwb, config, scaleToHundred) => {
  const colors = getColorsUsingStaticDefinition(config);
  const chartdata = await util.getLatestConfigCijfers(gwb, config);

  // If we need to scale the values to a 100 (%) we need to determin the multiplier.
  const multiplier = scaleToHundred ? 100 / chartdata.reduce(sumReducer, 0) : 1;

  // Filter data points with no data.
  const filteredChartData = chartdata.filter((d) => d.recent);

  // Convert to vega spec
  return filteredChartData.map((d, i) => {
    const scaledValue = Math.round(d?.recent?.waarde * multiplier) || 0;

    return {
      i,
      key: d.label,
      value: scaledValue ? scaledValue : "Geen gegevens",
      label: d.recent && d.recent.waarde !== null ? d.recent.waarde : "Geen gegevens",
      color: colors[i],
      gebied: d?.gebied?.naam,
    };
  });
};

const StackedHorizontalBarChart = ({ title, config, gwb, customVegaSpec = null, scaleToHundred = false }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showError, setShowError] = useState(false);

  async function updateData() {
    setIsLoading(true);
    setShowError(false);

    // Only show city average when the selected gwb is not the city.
    const showCityAverage = gwb?.code !== "STAD";
    const colors = getColorsUsingStaticDefinition(config);

    const chartdata = await getVegaChartData(gwb, config, scaleToHundred);
    const cityAverage = showCityAverage
      ? await getVegaChartData({ volledige_code: "STAD", naam: "Amsterdam" }, config, scaleToHundred)
      : [];

    const chartBase = cloneDeep(customVegaSpec ? customVegaSpec : stackedVegaSpec);

    chartBase.data.values = chartdata.concat(cityAverage);

    chartBase.data.values = chartBase.data.values.map((d) => ({
      ...d,
      position: calcPosition(d, chartBase.data.values),
    }));

    if (!customVegaSpec) {
      chartBase.layer[0].encoding.color["scale"] = {
        domain: config.map((i) => i.label),
        range: colors,
      };
    }

    // console.log(JSON.stringify(chartBase));

    if (chartRef.current && chartdata.length > 0) {
      setIsLoading(false);
      vegaEmbed(chartRef.current, chartBase, vegaEmbedOptions);
    } else {
      setIsLoading(false);
      setShowError(true);
    }
  }

  useEffect(() => {
    if (!gwb) {
      return;
    }

    updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gwb]);

  return (
    <div>
      <h5>{title}</h5>
      {isLoading ? <Spinner /> : null}
      {showError && <p>Op dit schaalniveau is helaas geen informatie beschikbaar.</p>}
      <div ref={chartRef}></div>
    </div>
  );
};

export default StackedHorizontalBarChart;
