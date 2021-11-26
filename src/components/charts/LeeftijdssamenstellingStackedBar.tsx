import cloneDeep from "lodash/cloneDeep";

import StackedHorizontalBarChart from "../StackedHorizontalBarChart";
import woningen from "../../static/links/woningen_naar_energielabel.json";
import stackedVegaSpec from "../../static/charts/stackedhorizontalbar.json";
import { getColorsUsingStaticDefinition } from "../../services/colorcoding";

const LeeftijdssamenstellingStackedBar = ({ gwb }) => {
  const customSpec = cloneDeep(stackedVegaSpec);
  const colors = getColorsUsingStaticDefinition(woningen);

  customSpec.layer[0].encoding.color["field"] = "i";
  customSpec.layer[0].encoding.color.legend["labelExpr"] =
    "datum.value == 0 ? '0-17 jaar (%)' : datum.value == 1 ? 'BEV18_64_P' : '65+ (%)'";
  customSpec.layer[0].encoding.color["scale"] = {
    range: colors,
  };

  return (
    <StackedHorizontalBarChart
      title="Leeftijdssamenstelling"
      config={[
        {
          indicatorDefinitieId: "BEV0_17_P",
        },
        {
          indicatorDefinitieId: "BEV18_64_P",
        },
        {
          indicatorDefinitieId: "BEV65PLUS_P",
        },
      ]}
      gwb={gwb}
      customVegaSpec={customSpec}
    />
  );
};

export default LeeftijdssamenstellingStackedBar;
