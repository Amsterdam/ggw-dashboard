import { useEffect, useRef, useState } from "react";
import vegaEmbed from "vega-embed";
import cloneDeep from "lodash/cloneDeep";
import { Spinner } from "@amsterdam/asc-ui";

import util from "../services/util";
import { getOneStd } from "../services/apis/bbga";
import { getColor } from "../services/colorcoding";

import { getColorsUsingStaticDefinition } from "../services/colorcoding";
import vegaSpec from "../static/charts/verticalbar";

const vegaEmbedOptions = {
  actions: false,
};

type MapResult = { key: number; value: string; color: string; gemiddelde: number };

const VerticalBarChart = ({ title, gwb, config }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showError, setShowError] = useState(false);

  async function updateData() {
    setIsLoading(true);
    setShowError(false);

    const colors = getColorsUsingStaticDefinition(config);
    const chartdata = await util.getConfigCijfers(gwb, config);
    const chartBase = cloneDeep(vegaSpec);
    const variabele = chartdata[0].meta && chartdata[0].meta.variabele;

    const stdevs = await getOneStd(variabele);

    // Only use last 10 years
    const cijfers = chartdata[0].cijfers.length > 10 ? chartdata[0].cijfers.slice(-10) : chartdata[0].cijfers;

    chartBase.data.values = (cijfers || [])
      .filter((d) => d.waarde)
      .map(
        (d, i) =>
          ({
            key: d.jaar,
            value: d.waarde ? d.waarde : "Geen gegevens",
            color: getColor({ indicatorDefinitieId: variabele, kleurenpalet: 1 }, d.waarde, d.jaar, stdevs).color,
            textColor: getColor({ indicatorDefinitieId: variabele, kleurenpalet: 1 }, d.waarde, d.jaar, stdevs)
              .textColor,
            gemiddelde: stdevs.find((sd) => sd.jaar === d.jaar).gemiddelde,
            last: cijfers.length === i + 1,
          } as MapResult),
      ) as MapResult[];

    if (chartBase.layer[0].encoding.color) {
      chartBase.layer[0].encoding.color.scale.range = colors;
    }

    // console.log(JSON.stringify(chartBase));

    if (chartRef.current && chartBase.data.values.length > 0) {
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

export default VerticalBarChart;
