import { useEffect, useRef, useState } from "react";
import vegaEmbed, { vega } from "vega-embed";
import cloneDeep from "lodash/cloneDeep";
import { Spinner } from "@amsterdam/asc-ui";

import util from "../services/util";
import { getOneStd } from "../services/apis/bbga";
import { getColor } from "../services/colorcoding";

import { getColorsUsingStaticDefinition } from "../services/colorcoding";
import vegaSpec from "../static/charts/verticalbar.json";

const vegaEmbedOptions = {
  actions: false,
};

type MapResult = { key: number; value: string; color: string, gemiddelde: number  };

const VerticalBarChart = ({ title, gwb, config }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function updateData() {
    setIsLoading(true);
    const colors = getColorsUsingStaticDefinition(config);
    const chartdata = await util.getConfigCijfers(gwb, config);
    const chartBase = cloneDeep(vegaSpec);
    const variabele = chartdata[0].meta && chartdata[0].meta.variabele;

    const stdevs = await getOneStd(variabele);

    chartBase.data.values = (chartdata[0].cijfers || [])
      .filter((d) => d.waarde)
      .map(
        (d, i) =>
          ({
            key: d.jaar,
            value: d.waarde ? d.waarde : "Geen gegevens",
            color: getColor({indicatorDefinitieId: variabele, kleurenpalet: 1}, d.waarde, d.jaar, stdevs).color,
            textColor: getColor({indicatorDefinitieId: variabele, kleurenpalet: 1}, d.waarde, d.jaar, stdevs).textColor,
            gemiddelde: stdevs.find((sd) => sd.jaar === d.jaar).gemiddelde,
            last: chartdata[0].cijfers.length === i + 1,
          } as MapResult)
      ) as MapResult[];

    vegaSpec["legends"] = [{}];
    console.log('VerticalBarChart', chartBase);

    if (chartBase.layer[0].encoding.color) {
      chartBase.layer[0].encoding.color.scale.range = colors;
    }

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

export default VerticalBarChart;
