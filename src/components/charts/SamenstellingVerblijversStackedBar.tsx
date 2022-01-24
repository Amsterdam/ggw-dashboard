import cloneDeep from "lodash/cloneDeep";

import StackedHorizontalBarChart from "../StackedHorizontalBarChart";
import verblijvers from "../../static/links/verblijvers.json";

import stackedVegaSpec from "../../static/charts/stackedhorizontalbar";

const SamenstellingVerblijversStackedBar = ({ gwb }) => {
  const customSpec = cloneDeep(stackedVegaSpec);

  customSpec.config.legend.columns = 3;

  return (
    <StackedHorizontalBarChart
      title="Samenstelling verblijvers"
      config={verblijvers}
      gwb={gwb}
      customVegaSpec={customSpec}
    />
  );
};

export default SamenstellingVerblijversStackedBar;
