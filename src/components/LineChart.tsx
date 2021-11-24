import { useEffect, useRef, useState } from "react";
import vegaEmbed from "vega-embed";
import cloneDeep from "lodash/cloneDeep";
import { Spinner } from "@amsterdam/asc-ui";

import util from "../services/util";

import { getColorsUsingStaticDefinition } from "../services/colorcoding";
import vegaSpec from "../static/charts/linechart";

const vegaEmbedOptions = {
  actions: false,
};

const LineChart = ({ title, gwb, config }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showError, setShowError] = useState(false);

  async function updateData() {
    setIsLoading(true);
    setShowError(false);
    const colors = getColorsUsingStaticDefinition(config);
    const chartdata = await util.getConfigCijfers(gwb, config);
    const chartBase = cloneDeep(vegaSpec);

    const cijfers = chartdata
      .map((data) =>
        data.cijfers
          .filter((cijfer) => cijfer.waarde !== null)
          .map((cijfer) => ({
            x: cijfer.jaar,
            y: cijfer.waarde,
            variable: data.label,
            dash: /prognose/i.test(data.label), // show prognose variables as dashed lines
          })),
      )
      .flat();

    vegaSpec.data[0].values = cijfers;
    vegaSpec.scales[2].range = colors;

    // console.log(JSON.stringify(chartBase));

    if (chartRef.current && vegaSpec.data[0].values.length > 0) {
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
      <h5 className="text-center">{title}</h5>
      <div className="chart-container">
        {isLoading ? <Spinner /> : null}
        {showError && <p>Op dit schaalniveau is helaas geen informatie beschikbaar.</p>}
        <div ref={chartRef}></div>
      </div>
    </div>
  );
};

export default LineChart;
