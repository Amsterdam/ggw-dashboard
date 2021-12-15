import cloneDeep from "lodash/cloneDeep";

import StackedHorizontalBarChart from "../StackedHorizontalBarChart";

import stackedVegaSpec from "../../static/charts/stackedhorizontalbar";
import woningvoorraad from "../../static/links/woningvoorraad.json";

const WoningVoorraadStackedBar = ({ gwb }) => {
  const customSpec = cloneDeep(stackedVegaSpec);

  return (
    <StackedHorizontalBarChart
      title="Eigendomsverhouding (%)"
      config={woningvoorraad}
      gwb={gwb}
      customVegaSpec={customSpec}
    ></StackedHorizontalBarChart>
  );
};

export default WoningVoorraadStackedBar;
