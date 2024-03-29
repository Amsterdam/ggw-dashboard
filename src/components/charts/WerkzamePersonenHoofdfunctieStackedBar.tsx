import cloneDeep from "lodash/cloneDeep";

import StackedHorizontalBarChart from "../StackedHorizontalBarChart";
import werkzamen from "../../static/links/werkzamen_hoofdfunctie.json";
import stackedVegaSpec from "../../static/charts/stackedhorizontalbar";

const WerkzamePersonenHoofdfunctieStackedBar = ({ gwb }) => {
  const customSpec = cloneDeep(stackedVegaSpec);

  customSpec.config.legend.columns = 3;

  return (
    <StackedHorizontalBarChart
      title="Werkzame personen naar functiegroep"
      config={werkzamen}
      gwb={gwb}
      customVegaSpec={customSpec}
    />
  );
};

export default WerkzamePersonenHoofdfunctieStackedBar;
