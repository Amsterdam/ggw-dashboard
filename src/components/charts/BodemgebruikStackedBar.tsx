import cloneDeep from "lodash/cloneDeep";

import StackedHorizontalBarChart from "../StackedHorizontalBarChart";
import bodemgebruik from "../../static/links/bodemgebruik.json";

import stackedVegaSpec from "../../static/charts/stackedhorizontalbar";

const BodemgebruikStackedBar = ({ gwb }) => {
  const customSpec = cloneDeep(stackedVegaSpec);

  customSpec.config.legend.columns = 3;

  return (
    <StackedHorizontalBarChart
      title="Bodemgebruik"
      config={bodemgebruik}
      gwb={gwb}
      customVegaSpec={customSpec}
    />
  );
};

export default BodemgebruikStackedBar;
