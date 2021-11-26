import cloneDeep from "lodash/cloneDeep";

import StackedHorizontalBarChart from "../StackedHorizontalBarChart";
import woningen from "../../static/links/woningen_naar_energielabel.json";
import stackedVegaSpec from "../../static/charts/stackedhorizontalbar.json";
import { getColorsUsingStaticDefinition } from "../../services/colorcoding";

const WoningenNaarEnergieStackedBar = ({ gwb }) => {
  const customSpec = cloneDeep(stackedVegaSpec);
  const colors = getColorsUsingStaticDefinition(woningen);

  customSpec.layer[0].encoding.color["field"] = "i";
  customSpec.layer[0].encoding.color.legend["labelExpr"] =
    "datum.value == 0 ? 'Kantoor' : datum.value == 1 ? 'Winkel' : datum.value == 2 ? 'Voorzieningen' : datum.value == 3 ? 'Horeca' : datum.value == 4 ? 'Bedrijf' :'Overig'";
  customSpec.layer[0].encoding.color["scale"] = {
    range: colors,
  };

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
