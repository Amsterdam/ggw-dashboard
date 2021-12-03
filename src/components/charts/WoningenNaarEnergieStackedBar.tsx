import cloneDeep from "lodash/cloneDeep";

import StackedHorizontalBarChart from "../StackedHorizontalBarChart";
import woningen from "../../static/links/woningen_naar_energielabel.json";
import stackedVegaSpec from "../../static/charts/stackedhorizontalbar.json";

const WoningenNaarEnergieStackedBar = ({ gwb }) => {
  const customSpec = cloneDeep(stackedVegaSpec);

  return (
    <StackedHorizontalBarChart
      title="Woningen naar energielabel"
      config={woningen}
      gwb={gwb}
      customVegaSpec={customSpec}
    />
  );
};

export default WoningenNaarEnergieStackedBar;
