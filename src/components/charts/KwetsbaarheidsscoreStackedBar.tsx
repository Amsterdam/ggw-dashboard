import cloneDeep from "lodash/cloneDeep";
import util from "../../services/util";

import StackedHorizontalBarChart from "../StackedHorizontalBarChart";
import kwetsbaarheid from "../../static/links/kwetsbaarheid.json";

import stackedVegaSpec from "../../static/charts/stackedhorizontalbar.json";
import { getColorsUsingStaticDefinition } from "../../services/colorcoding";

const KwetsbaarheidsscoreStackedBar = ({ gwb }) => {
  const customSpec = cloneDeep(stackedVegaSpec);
  const colors = getColorsUsingStaticDefinition(kwetsbaarheid);

  util.setVegaLocale();

  customSpec.layer[0].encoding.color["field"] = "i";
  customSpec.layer[0].encoding.color.legend["labelExpr"] =
    "datum.value == 0 ? 'Meest kwetsbaar (%)' : datum.value == 1 ? '4-12' : datum.value == 2 ? '12-17' : 'Meest kwetsbaar (%)'";
  customSpec.layer[0].encoding.color["scale"] = {
    range: colors,
  };

  return (
    <StackedHorizontalBarChart
      title="Kwetsbaarheidsscore bewoners"
      config={kwetsbaarheid}
      gwb={gwb}
      scaleToHundred
      customVegaSpec={customSpec}
    />
  );
};

export default KwetsbaarheidsscoreStackedBar;
