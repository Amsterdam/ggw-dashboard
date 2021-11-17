import cloneDeep from "lodash/cloneDeep";

import StackedHorizontalBarChart from "../StackedHorizontalBarChart";

import stackedVegaSpec from "../../static/charts/stackedhorizontalbar.json";
import woningvoorraad from "../../static/links/woningvoorraad.json";
import { getColorsUsingStaticDefinition } from "../../services/colorcoding";

const WoningVoorraadStackedBar = ({ gwb }) => {
  const customSpec = cloneDeep(stackedVegaSpec);
  const colors = getColorsUsingStaticDefinition(woningvoorraad);

  customSpec.layer[0].encoding.color["field"] = "i";
  customSpec.layer[0].encoding.color.legend["labelExpr"] =
    "datum.value == 0 ? 'Koop' : datum.value == 1 ? 'Particuliere huur' : 'Corporatiebezit'";
  customSpec.layer[0].encoding.color["scale"] = {
    range: colors,
  };

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
