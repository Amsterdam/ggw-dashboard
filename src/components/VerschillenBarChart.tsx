import { useEffect, useRef, useState } from "react";
import vegaEmbed from "vega-embed";
import cloneDeep from "lodash/cloneDeep";
import { Spinner } from "@amsterdam/asc-ui";

import util from "../services/util";
import { getMeta, getOneStd } from "../services/apis/bbga";
import { getAll, getGebied } from "../services/apis/gebieden";
import { getColor } from "../services/colorcoding";
import { Gwb } from "../types";

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

    const gebiedType = util.getGebiedType(gwb.vollcode || gwb.code, true);

    const cijfers = await util.getVerschillenCijfers(indicatorDefinitieId, gebiedType, gebied.cijfers.jaar);

    const stdevs = await getOneStd(indicatorDefinitieId);

    chartBase.data.values = (cijfers || [])
      .filter((d) => d.waarde)
      .map(
        (d) =>
          ({
            gebied: getGebied(d.gebiedcode15).naam,
            label,
            value: d.waarde ? d.waarde : "Geen gegevens",
            ...getColor(
              { indicatorDefinitieId: indicatorDefinitieId, kleurenpalet: meta.kleurenpalet },
              d?.waarde,
              d?.jaar,
              stdevs,
            ),
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
    <div>
      <div className="chart-container">{isLoading ? <Spinner /> : <div ref={chartRef}></div>}</div>
    </div>
  );
};

export default VerschillenBarChart;
