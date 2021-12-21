import cloneDeep from "lodash/cloneDeep";

import StackedHorizontalBarChart from "../StackedHorizontalBarChart";
import stackedVegaSpec from "../../static/charts/stackedhorizontalbar";
import leeftijdsamenstelling from "../../static/links/leeftijdsamenstelling_bevolking.json";

const LeeftijdssamenstellingBevolkingStackedBar = ({ gwb }) => {
  const customSpec = cloneDeep(stackedVegaSpec);

  return (
    <StackedHorizontalBarChart
      title="Leeftijdssamenstelling bevolking (%)"
      config={leeftijdsamenstelling}
      gwb={gwb}
      customVegaSpec={customSpec}
    />
  );
};

export default LeeftijdssamenstellingBevolkingStackedBar;
