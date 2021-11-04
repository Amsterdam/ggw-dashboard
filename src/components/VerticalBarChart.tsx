import { useEffect, useRef } from "react";
import vegaEmbed from "vega-embed";
import cloneDeep from "lodash/cloneDeep";

import util from "../services/util";
import { getOneStd } from "../services/apis/bbga";
import { getColorsUsingStaticDefinition } from "../services/colorcoding";
import vegaSpec from "../static/charts/verticalbar.json";

const vegaEmbedOptions = {
  actions: false,
};

type MapResult = { key: Number; value: String; color: String };

const VerticalBarChart = ({ title, gwb, config }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  async function updateData() {
    const colors = getColorsUsingStaticDefinition(config);
    const chartdata = await util.getConfigCijfers(gwb, config);
    const chartBase = cloneDeep(vegaSpec);
    const variabele = chartdata[0].meta && chartdata[0].meta.variabele;

    const stdevs = await getOneStd(variabele);

    // const tooltip = chartdata[0].meta && chartdata[0].meta.bron;

    chartBase.data.values = (chartdata[0].cijfers || [])
      .filter((d) => d.waarde)
      .map(
        (d, i) =>
          ({
            key: d.jaar,
            value: d.waarde ? d.waarde : "Geen gegevens",
            color: colors[i],
            i,
            gemiddelde: stdevs.find((sd) => sd.jaar === d.jaar).gemiddelde,
            last: chartdata[0].cijfers.length === i + 1        
          } as MapResult)
      ) as MapResult[];

    vegaSpec["legends"] = [{}];

    // vegaSpec.legends[0].values = util.getLegendLabels(chartdata);
    if (chartBase.layer[0].encoding.color) {
      chartBase.layer[0].encoding.color.scale.range = colors;
    }

    if (chartRef.current) {
      vegaEmbed(chartRef.current, chartBase, vegaEmbedOptions);
    }
  }

  useEffect(() => {
    if (!gwb) {
      return;
    }

    updateData();
  }, [gwb]);

  return (
    <div>
      <h5 className="text-center">{title}</h5>
      <div className="chart-container">
        <div ref={chartRef}></div>
      </div>
    </div>
  );
};

export default VerticalBarChart;
