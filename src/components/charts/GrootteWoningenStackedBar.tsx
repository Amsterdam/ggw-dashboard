import cloneDeep from "lodash/cloneDeep";

import StackedHorizontalBarChart from "../StackedHorizontalBarChart";
import grootteWoningen from "../../static/links/grootte_woningen.json";
import stackedVegaSpec from "../../static/charts/stackedhorizontalbar.json";
import { getColorsUsingStaticDefinition } from "../../services/colorcoding";

const GrootteWoningenStackedBar = ({ gwb }) => {
  const customSpec = cloneDeep(stackedVegaSpec);
  const colors = getColorsUsingStaticDefinition(grootteWoningen);

  customSpec.layer[0].encoding.color["field"] = "i";
  customSpec.layer[0].encoding.color.legend["labelExpr"] =
    "datum.value == 0 ? '0-40' : datum.value == 1 ? '40-60' : datum.value == 2 ? '60-80' : datum.value == 3 ? '80-100' : '100+'";
  customSpec.layer[0].encoding.color["scale"] = {
    range: colors,
  };

  return (
    <StackedHorizontalBarChart
      title="Oppervlakte woning (%)"
      config={grootteWoningen}
      gwb={gwb}
      customVegaSpec={customSpec}
    ></StackedHorizontalBarChart>
  );
};

export default GrootteWoningenStackedBar;
