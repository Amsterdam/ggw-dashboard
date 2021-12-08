import { useEffect, useRef, useState } from "react";
import vegaEmbed from "vega-embed";
import cloneDeep from "lodash/cloneDeep";
import { Spinner } from "@amsterdam/asc-ui";

import util from "../services/util";
import { getOneStd } from "../services/apis/bbga";
import { getAll, getGebied } from "../services/apis/gebieden";
import { getColor } from "../services/colorcoding";

import vegaSpec from "../static/charts/verschillenbar";

const vegaEmbedOptions = {
  actions: false,
};

type MapResult = { 
  gebied: string;
  label: string;
  value: string;
  color: string;
};

const VerschillenBarChart = ({ gwb, indicatorDefinitieId }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function updateData() {
    setIsLoading(true);

    const chartBase = cloneDeep(vegaSpec);

    await getAll();
    
    const gebied = await util.getGebiedCijfers(indicatorDefinitieId, gwb, util.CIJFERS.LATEST)

    const gebiedType = util.getGebiedType(gwb.vollcode || gwb.code, true)

    if (!gebied.cijfers) {
      setIsLoading(false);
      return;
    } 

    const cijfers = await util.getVerschillenCijfers(indicatorDefinitieId, gebiedType, gebied.cijfers.jaar)

    const stdevs = await getOneStd(indicatorDefinitieId);

    chartBase.data.values = (cijfers || [])
      .filter((d) => d.waarde)
      .map(
        (d) =>
          ({
            gebied: getGebied(d.gebiedcode15).naam,
            label: gebied?.meta?.label,
            value: d.waarde ? d.waarde : "Geen gegevens",
            color: getColor({ indicatorDefinitieId: indicatorDefinitieId, kleurenpalet: 1 }, d?.waarde, d?.jaar, stdevs).color,
          } as MapResult),
      ) as MapResult[];

    if (chartRef.current && chartBase.data.values.length > 0) {
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

  useEffect(() => {
    if (!gwb) {
      return;
    }

    updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indicatorDefinitieId]);

  useEffect(() => {
    if (!gwb) {
      return;
    }

    updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="chart-container">
        {isLoading ? <Spinner /> : null}
        <div ref={chartRef}></div>
      </div>
    </div>
  );
};

export default VerschillenBarChart;
