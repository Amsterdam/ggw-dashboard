import cloneDeep from "lodash/cloneDeep";

import StackedHorizontalBarChart from "../StackedHorizontalBarChart";
import werkzamen from "../../static/links/werkzamen_hoofdfunctie.json";
import stackedVegaSpec from "../../static/charts/stackedhorizontalbar.json";
import { getColorsUsingStaticDefinition } from "../../services/colorcoding";

const WerkzamePersonenHoofdfunctieStackedBar = ({ gwb }) => {
  const customSpec = cloneDeep(stackedVegaSpec);
  const colors = getColorsUsingStaticDefinition(werkzamen);

  customSpec.layer[0].encoding.color["field"] = "i";
  customSpec.layer[0].encoding.color.legend["labelExpr"] =
    "datum.value == 0 ? 'Kantoor' : datum.value == 1 ? 'Winkel' : datum.value == 2 ? 'Voorzieningen' : datum.value == 3 ? 'Horeca' : datum.value == 4 ? 'Bedrijf' :'Overig'";
  customSpec.layer[0].encoding.color["scale"] = {
    range: colors,
  };

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
