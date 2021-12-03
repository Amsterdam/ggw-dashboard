import cloneDeep from "lodash/cloneDeep";

import StackedHorizontalBarChart from "../StackedHorizontalBarChart";
import jeugd from "../../static/links/jeugd.json";

import stackedVegaSpec from "../../static/charts/stackedhorizontalbar.json";

const LeeftijdJeugdStackedBar = ({ gwb }) => {
  const customSpec = cloneDeep(stackedVegaSpec);

  return (
    <StackedHorizontalBarChart
      title="Leeftijdsgroepen in %"
      config={jeugd}
      gwb={gwb}
      scaleToHundred
      customVegaSpec={customSpec}
    />
  );
};

export default LeeftijdJeugdStackedBar;
