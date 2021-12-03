import cloneDeep from "lodash/cloneDeep";

import StackedHorizontalBarChart from "../StackedHorizontalBarChart";
import grootteWoningen from "../../static/links/grootte_woningen.json";
import stackedVegaSpec from "../../static/charts/stackedhorizontalbar.json";

const GrootteWoningenStackedBar = ({ gwb }) => {
  const customSpec = cloneDeep(stackedVegaSpec);

  return (
    <StackedHorizontalBarChart
      title="Oppervlakte woning (%)"
      config={grootteWoningen}
      gwb={gwb}
      customVegaSpec={customSpec}
    ></StackedHorizontalBarChart>
  );
};

export default GrootteWoningenStackedBar;
