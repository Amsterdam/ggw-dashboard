import cloneDeep from "lodash/cloneDeep";
import util from "../../services/util";

import StackedHorizontalBarChart from "../StackedHorizontalBarChart";
import verblijvers from "../../static/links/verblijvers.json";

import stackedVegaSpec from "../../static/charts/stackedhorizontalbar.json";
import { getColorsUsingStaticDefinition } from "../../services/colorcoding";

const SamenstellingVerblijversStackedBar = ({ gwb }) => {
  const customSpec = cloneDeep(stackedVegaSpec);
  const colors = getColorsUsingStaticDefinition(verblijvers);

  util.setVegaLocale();

  customSpec.layer[0].encoding.color["field"] = "i";
  customSpec.layer[0].encoding.color.legend["labelExpr"] =
    "datum.value == 0 ? '0-3 jaar' : datum.value == 1 ? '4-12' : datum.value == 2 ? '12-17' : '18-26'";
  customSpec.layer[0].encoding.color["scale"] = {
    range: colors,
  };

  return (
    <StackedHorizontalBarChart
      title="Samenstelling verblijvers"
      config={verblijvers}
      gwb={gwb}
      scaleToHundred
      customVegaSpec={customSpec}
    />
  );
};

export default SamenstellingVerblijversStackedBar;
