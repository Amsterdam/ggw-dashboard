import { useEffect, useRef, useState } from "react";
import vegaEmbed from "vega-embed";
import cloneDeep from "lodash/cloneDeep";
import { Spinner } from "@amsterdam/asc-ui";

import util from "../services/util";

import { getColorsUsingStaticDefinition } from "../services/colorcoding";
import vegaSpec from "../static/charts/linechart.json";

const vegaEmbedOptions = {
  actions: false,
};

const LineChart = ({ title, gwb, config }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function updateData() {
    setIsLoading(true);
    const colors = getColorsUsingStaticDefinition(config);
    const chartdata = await util.getConfigCijfers(gwb, config);
    const chartBase = cloneDeep(vegaSpec);

    const cijfers = util.flatten(
      chartdata.map((data) =>
        data.cijfers.map((cijfer) => ({
          x: cijfer.jaar,
          y: cijfer.waarde,
          variable: data.label,
          dash: /prognose/i.test(data.label), // show prognose variables as dashed lines
        })),
      ),
    );

    vegaSpec.data[0].values = cijfers;
    vegaSpec.scales[2].range = colors;

    // console.log(JSON.stringify(chartBase));

    if (chartRef.current) {
      setIsLoading(false);
      vegaEmbed(chartRef.current, chartBase, vegaEmbedOptions);
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
        <div ref={chartRef}></div>
      </div>
    </div>
  );
};

export default LineChart;
