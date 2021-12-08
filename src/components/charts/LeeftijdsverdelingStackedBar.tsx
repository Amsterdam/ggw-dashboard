import cloneDeep from "lodash/cloneDeep";

import StackedHorizontalBarChart from "../StackedHorizontalBarChart";
import stackedVegaSpec from "../../static/charts/stackedhorizontalbar.json";

const LeeftijdsverdelingStackedBar = ({ gwb }) => {
  const config = [
    {
      indicatorDefinitieId: "BEV0_17_P",
    },
    {
      indicatorDefinitieId: "BEV18_64_P",
    },
    {
      indicatorDefinitieId: "BEV65_74_P",
    },
    {
      indicatorDefinitieId: "BEV75PLUS_P",
    },
  ];
  const customSpec = cloneDeep(stackedVegaSpec);

  return <StackedHorizontalBarChart title="Leeftijdsverdeling" config={config} gwb={gwb} customVegaSpec={customSpec} />;
};

export default LeeftijdsverdelingStackedBar;
