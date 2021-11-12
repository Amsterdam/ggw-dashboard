import * as React from "react";
import vegaEmbed from "vega-embed";
import cloneDeep from "lodash/cloneDeep";

import vegaSpec from "../static/charts/horizontalbar.json";
import { COLOR } from "../services/colorcoding";
import util from "../services/util";
import "./HorizontalBarChart.scss";
import Icon from "./layout/Icon";

const vegaEmbedOptions = {
  actions: false,
  renderer: "svg",
};

// eslint-disable-next-line react/prop-types
const HorizontalBarChart = ({ title, icon, config, gwb }) => {
  const chartRef = React.useRef();

  util.setVegaLocale()

  async function updateData() {
    const chartdata = await util.getLatestConfigCijfers(gwb, config);
    const chartBase = cloneDeep(vegaSpec);

    chartBase.data.values = chartdata.map((d, i) => ({
      key: d.label,
      value: (d.recent && d.recent.waarde) || 0,
      label:
        d.recent && d.recent.waarde !== null
          ? d.recent.waarde
          : "Geen gegevens",
      color: (d.recent && d.recent.color) || COLOR["ams-oranje"],
      i,
    }));

    chartBase.layer[0].encoding.color.scale.range = chartBase.data.values.map(
      (v) => v.color
    );

    vegaEmbed(chartRef.current, chartBase, vegaEmbedOptions);
  }

  React.useEffect(() => {
    if (!gwb) {
      return;
    }
    updateData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gwb]);

  return (
    <div className="block-container">
      {/* <tooltip cijfers="chartdata"> */}

      <Icon icon={icon} title={title} />
      <div ref={chartRef}></div>

      {/* </tooltip> */}
    </div>
  );
};

export default HorizontalBarChart;
