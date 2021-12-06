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

const VerschillenBarChart = ({ gwb, variabele }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showError, setShowError] = useState(false);

  async function updateData() {
    setIsLoading(true);
    setShowError(false);

    const chartBase = cloneDeep(vegaSpec);

    await getAll();
    
    const gebied = await util.getGebiedCijfers(variabele, gwb, util.CIJFERS.LATEST)

    const gebiedType = util.getGebiedType(gwb.vollcode || gwb.code, true)

    const cijfers = await util.getVerschillenCijfers(variabele, gebiedType, gebied.cijfers.jaar)

    const stdevs = await getOneStd(variabele);

    chartBase.data.values = (cijfers || [])
      .filter((d) => d.waarde)
      .map(
        (d) =>
          ({
            gebied: getGebied(d.gebiedcode15).naam,
            label: gebied?.meta?.label,
            value: d.waarde ? d.waarde : "Geen gegevens",
            color: getColor({ indicatorDefinitieId: variabele, kleurenpalet: 1 }, d?.waarde, d?.jaar, stdevs).color,
          } as MapResult),
      ) as MapResult[];

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

  useEffect(() => {
    if (!gwb) {
      return;
    }

    updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variabele]);

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
        {showError && <p>Op dit schaalniveau is helaas geen informatie beschikbaar.</p>}
        <div ref={chartRef}></div>
      </div>
    </div>
  );
};

export default VerschillenBarChart;
