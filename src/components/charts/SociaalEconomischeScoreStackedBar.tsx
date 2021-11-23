import cloneDeep from "lodash/cloneDeep";
import util from "../../services/util";

import StackedHorizontalBarChart from "../StackedHorizontalBarChart";
import sociaaleconomischescore from "../../static/links/sociaaleconomischescore.json";

import stackedVegaSpec from "../../static/charts/stackedhorizontalbar.json";
import { getColorsUsingStaticDefinition } from "../../services/colorcoding";

const SociaalEconomischeScoreStackedBar = ({ gwb }) => {
  const customSpec = cloneDeep(stackedVegaSpec);
  const colors = getColorsUsingStaticDefinition(sociaaleconomischescore);

  util.setVegaLocale();

  customSpec.layer[0].encoding.color["field"] = "i";
  customSpec.layer[0].encoding.color.legend["labelExpr"] =
    "datum.value == 0 ? 'SES laag (%)' : datum.value == 1 ? 'SES midden (%)' : 'SES hoog (%)'";
  customSpec.layer[0].encoding.color["scale"] = {
    range: colors,
  };

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
