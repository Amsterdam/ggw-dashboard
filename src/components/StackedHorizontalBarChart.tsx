import { useState, useRef, useEffect } from "react";
import vegaEmbed from "vega-embed";
import cloneDeep from "lodash/cloneDeep";
import { Heading, Spinner } from "@amsterdam/asc-ui";

import stackedVegaSpec from "../static/charts/stackedhorizontalbar";
import util from "../services/util";
import { getColorsUsingStaticDefinition } from "../services/colorcoding";
import { getMeta } from "../services/apis/bbga";
import { ConfigEnirched } from "../types";

const vegaEmbedOptions = {
  actions: false,
};

/**
 * We want to position the text element with the bar value in the center of the bar.
 * We achieve this by calculating the values of all previous bar's plus the current bar's value/2.
 *
 */
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

const getVegaChartData = async (gwb, config) => {
  const colors = getColorsUsingStaticDefinition(config);
  const chartdata = await util.getLatestConfigCijfers(gwb, config);

  // Filter data points with no data.
  const filteredChartData = chartdata.filter((d) => d);

  // Convert to vega spec
  return filteredChartData.map((d, i) => {
    const scaledValue = Math.round(d?.recent?.waarde) || 0;

    return {
      i,
      key: d.label,
      value: scaledValue ? scaledValue : 0,
      label: d.recent && d.recent.waarde !== null ? d.recent.waarde : 0,
      color: colors[i],
      gebied: d?.gebied?.naam,
      definitie: d?.meta?.definitie,
      peiljaar: d?.recent?.jaar,
      bron: d?.meta?.bron,
    };
  });
};

/**
 * Given the plain config json enrich it with the data we can find in the BBGA.
 */
const enrichConfig = async (config): Promise<(ConfigEnirched | string)[]> => {
  return await Promise.all<ConfigEnirched | string>(config.map((c) => getMeta(c.indicatorDefinitieId)));
};

/**
 * Converts the enirched config to a vega label expression using the labelKort values from the BBGA.
 * "datum.value == 0 ? '0-3 jaar %' : datum.value == 1 ? '4-12 jaar %' : datum.value == 2 ? '13-17 jaar %' : datum.value == 1 ? '27-65 jaar (%)' : '66+ (%)'";
 */
const labelExpr = (enrichedConfig: (ConfigEnirched | string)[]) => {
  const configLength = enrichedConfig.length;

  const getLabel = (c) => {
    if (typeof c === "string") {
      return c;
    }

    return c.labelKort;
  };

  return enrichedConfig
    .map((c, i) => {
      const label = getLabel(c);
      if (i === configLength - 1) {
        return `'${label}'`;
      }

      return `datum.value == ${i} ? '${label}' : `;
    })
    .join("");
};

const StackedHorizontalBarChart = ({ title, config, gwb, customVegaSpec = null }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showError, setShowError] = useState(false);

  util.setVegaLocale();

  async function updateData() {
    setIsLoading(true);
    setShowError(false);

    // Only show city average when the selected gwb is not the city.
    const showCityAverage = gwb?.code !== "STAD";
    const colors = getColorsUsingStaticDefinition(config);

    const chartdata = await getVegaChartData(gwb, config);
    const cityAverage = showCityAverage
      ? await getVegaChartData({ volledige_code: "STAD", naam: "Amsterdam" }, config)
      : [];

    const chartBase = cloneDeep(customVegaSpec ? customVegaSpec : stackedVegaSpec);

    chartBase.data.values = chartdata.concat(cityAverage);

    chartBase.data.values = chartBase.data.values.map((d) => ({
      ...d,
      position: calcPosition(d, chartBase.data.values),
    }));

    chartBase.layer[0].encoding.color["scale"] = {
      range: colors,
    };

    const enrichedConfig = await enrichConfig(config);

    chartBase.layer[0].encoding.color["field"] = "i";
    chartBase.layer[0].encoding.color.legend["labelExpr"] = labelExpr(enrichedConfig);

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
    <figure>
      <Heading as="h4">{title}</Heading>
      {isLoading ? <Spinner /> : null}
      {showError && <p>Op dit schaalniveau is helaas geen informatie beschikbaar.</p>}
      {!showError && <div ref={chartRef}></div>}
    </figure>
  );
};

export default StackedHorizontalBarChart;
