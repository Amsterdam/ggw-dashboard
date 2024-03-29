import { useEffect, useRef, useState } from "react";
import vegaEmbed from "vega-embed";
import cloneDeep from "lodash/cloneDeep";
import { Spinner } from "@amsterdam/asc-ui";

import util from "../services/util";
import { getMeta } from "../services/apis/bbga";
import { getAll, getGebied } from "../services/apis/gebieden";
import { Gwb } from "../types";

import vegaSpec from "../static/charts/verschillenbar";
import { VERSCHILLEN_SELECTED } from "../services/colorcoding";

const vegaEmbedOptions = {
  actions: false,
};

type MapResult = {
  gebied: string;
  label: string;
  value: string;
  color: string;
  current: string;
};

interface Props {
  gwb: Gwb;
  indicatorDefinitieId: string;
  label: string;
}

const VerschillenBarChart: React.FC<Props> = ({ gwb, indicatorDefinitieId, label }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function updateData() {
    setIsLoading(true);

    const chartBase = cloneDeep(vegaSpec);

    await getAll();

    const gebied = await util.getGebiedCijfers(indicatorDefinitieId, gwb, util.CIJFERS.LATEST);
    const meta = await getMeta(indicatorDefinitieId);

    if (!gebied.cijfers || typeof meta === "string") {
      setIsLoading(false);
      return;
    }
    ``;

    const gebiedType = util.getGebiedType(gwb.vollcode || gwb.code, true);

    const cijfers = await util.getVerschillenCijfers(indicatorDefinitieId, gebiedType, gebied.cijfers.jaar);
    chartBase.data.values = (cijfers || [])
      .filter((d) => d.waarde)
      .map(
        (d) =>
          ({
            gebied: d.gebiedcode15,
            gebiedNaam: getGebied(d.gebiedcode15)?.naam,
            label,
            value: d.waarde ? d.waarde : "Geen gegevens",
            color: d.gebiedcode15 === gwb.code ? VERSCHILLEN_SELECTED : d.color,
            current: d.gebiedcode15 === gebied.gebied.code ? getGebied(d.gebiedcode15)?.naam : "",
          } as MapResult),
      ) as MapResult[];

    setIsLoading(false);

    if (chartRef.current && chartBase.data.values.length > 0) {
      vegaEmbed(chartRef.current, chartBase, vegaEmbedOptions);
    }
  }

  useEffect(() => {
    if (!gwb || !indicatorDefinitieId) {
      return;
    }

    updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gwb, indicatorDefinitieId]);

  return (
    <figure>
      <div className="chart-container">{isLoading ? <Spinner /> : <div ref={chartRef}></div>}</div>
    </figure>
  );
};

export default VerschillenBarChart;
