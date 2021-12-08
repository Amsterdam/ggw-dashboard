import cloneDeep from "lodash/cloneDeep";

import StackedHorizontalBarChart from "../StackedHorizontalBarChart";
import sociaaleconomischescore from "../../static/links/sociaaleconomischescore.json";

import stackedVegaSpec from "../../static/charts/stackedhorizontalbar.json";

const SociaalEconomischeScoreStackedBar = ({ gwb }) => {
  const customSpec = cloneDeep(stackedVegaSpec);

  return (
    <StackedHorizontalBarChart
      title="Sociaal economische score bewoners"
      config={sociaaleconomischescore}
      gwb={gwb}
      scaleToHundred
      customVegaSpec={customSpec}
    />
  );
};

export default SociaalEconomischeScoreStackedBar;
