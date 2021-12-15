import { useEffect, useRef, useState } from "react";
import vegaEmbed from "vega-embed";
import cloneDeep from "lodash/cloneDeep";
import { Heading, Spinner } from "@amsterdam/asc-ui";

import util from "../services/util";

import { getColorsUsingStaticDefinition } from "../services/colorcoding";
import vegaSpec from "../static/charts/linechart";

const vegaEmbedOptions = {
  actions: false,
};

const LineChart = ({ title, gwb, config, customVegaSpec = null, withPrognosis = false }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showError, setShowError] = useState(false);

  async function updateData() {
    setIsLoading(true);
    setShowError(false);
    const colors = getColorsUsingStaticDefinition(config);
    const chartdata = await util.getConfigCijfers(gwb, config);
    const chartBase = cloneDeep(customVegaSpec ? customVegaSpec : vegaSpec);
    let prognosis: any[] = [];

    if (withPrognosis) {
      // Filter only config items which contain a prognosisIndicator
      // Retrieve the data for those indicators.
      prognosis = await util.getConfigCijfers(
        gwb,
        config.filter((c) => c.prognoseIndicator).map((c) => ({ indicatorDefinitieId: c.prognoseIndicator })),
      );
    }

    let cijfers = chartdata
      .map((data) =>
        data.cijfers
          ?.filter((cijfer) => cijfer.waarde !== null)
          ?.map((cijfer) => ({
            x: cijfer.jaar,
            y: cijfer.waarde,
            variable: data?.meta?.labelKort,
          })),
      )
      .flat();

    if (prognosis.length > 0 && withPrognosis) {
      // Add the data from the prognosis indicators to the main chartData.
      cijfers = cijfers.concat(
        prognosis
          .map((data) =>
            data.cijfers
              ?.filter((cijfer) => cijfer.waarde !== null)
              ?.map((cijfer) => ({
                x: cijfer.jaar,
                y: cijfer.waarde,
                variable: data?.meta?.labelKort, // Need to use the label of the prognosis else vega will not show a dashed line
                dash: /prognose/i.test(data.label), // show prognose variables as dashed lines
              })),
          )
          .flat(),
      );
    }

    chartBase.data[0].values = cijfers;
    chartBase.scales[2].range = colors;

    // console.log(JSON.stringify(chartBase));

    if (chartRef.current && chartBase.data[0].values.length > 1) {
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
      <Heading as="h4">{title}</Heading>
      <div className="chart-container">
        {isLoading ? <Spinner /> : null}
        {showError && <p>Op dit schaalniveau is helaas geen informatie beschikbaar.</p>}
        {!showError && <div ref={chartRef}></div>}
      </div>
    </div>
  );
};

export default LineChart;
