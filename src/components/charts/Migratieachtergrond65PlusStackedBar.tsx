import cloneDeep from "lodash/cloneDeep";

import StackedHorizontalBarChart from "../StackedHorizontalBarChart";
import migratieachtergrond from "../../static/links/migratieachtergrond65+.json";
import stackedVegaSpec from "../../static/charts/stackedhorizontalbar.json";
import { getColorsUsingStaticDefinition } from "../../services/colorcoding";

const Migratieachtergrond65PlusStackedBar = ({ gwb }) => {
  const customSpec = cloneDeep(stackedVegaSpec);
  const colors = getColorsUsingStaticDefinition(migratieachtergrond);

  customSpec.layer[0].encoding.color["field"] = "i";
  customSpec.layer[0].encoding.color.legend["labelExpr"] =
    "datum.value == 0 ? 'Geen migratieachtergrond (%)' : datum.value == 1 ? 'Niet-westers (%)' : 'Westers (%)'";
  customSpec.layer[0].encoding.color["scale"] = {
    range: colors,
  };

  return (
    <StackedHorizontalBarChart
      title="Migratieachtergrond"
      config={migratieachtergrond}
      gwb={gwb}
      customVegaSpec={customSpec}
    />
  );
};

export default Migratieachtergrond65PlusStackedBar;
