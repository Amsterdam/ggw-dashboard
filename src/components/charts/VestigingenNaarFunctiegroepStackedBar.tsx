import cloneDeep from "lodash/cloneDeep";

import StackedHorizontalBarChart from "../StackedHorizontalBarChart";
import vestigingen from "../../static/links/vestigingen_hoofdfunctie.json";
import stackedVegaSpec from "../../static/charts/stackedhorizontalbar.json";
import { getColorsUsingStaticDefinition } from "../../services/colorcoding";

const VestigingenNaarFunctiegroep = ({ gwb }) => {
  const customSpec = cloneDeep(stackedVegaSpec);
  const colors = getColorsUsingStaticDefinition(vestigingen);

  customSpec.layer[0].encoding.color["field"] = "i";
  customSpec.layer[0].encoding.color.legend["labelExpr"] =
    "datum.value == 0 ? 'Kantoor' : datum.value == 1 ? 'Winkel' : datum.value == 2 ? 'Voorzieningen' : datum.value == 3 ? 'Horeca' : datum.value == 4 ? 'Bedrijf' :'Overig'";
  customSpec.layer[0].encoding.color["scale"] = {
    range: colors,
  };

  return (
    <StackedHorizontalBarChart
      title="Vestigingen naar functiegroep"
      config={vestigingen}
      gwb={gwb}
      customVegaSpec={customSpec}
    />
  );
};

export default VestigingenNaarFunctiegroep;
