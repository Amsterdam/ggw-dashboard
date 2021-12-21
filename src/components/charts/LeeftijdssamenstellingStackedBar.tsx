import cloneDeep from "lodash/cloneDeep";

import StackedHorizontalBarChart from "../StackedHorizontalBarChart";
import stackedVegaSpec from "../../static/charts/stackedhorizontalbar";

const LeeftijdssamenstellingStackedBar = ({ gwb }) => {
  const config = [
    {
      indicatorDefinitieId: "BEV0_17_P",
    },
    {
      indicatorDefinitieId: "BEV18_64_P",
    },
    {
      indicatorDefinitieId: "BEV65PLUS_P",
    },
  ];
  const customSpec = cloneDeep(stackedVegaSpec);

  return (
    <StackedHorizontalBarChart title="Leeftijdssamenstelling" config={config} gwb={gwb} customVegaSpec={customSpec} />
  );
};

export default LeeftijdssamenstellingStackedBar;
