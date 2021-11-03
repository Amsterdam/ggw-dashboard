import cloneDeep from "lodash/cloneDeep";

import StackedHorizontalBarChart from "../StackedHorizontalBarChart";
import beroepsbevolking from "../../static/links/potentiele_beroepsbevolking.json";
import stackedVegaSpec from "../../static/charts/stackedhorizontalbar.json";
import { getColorsUsingStaticDefinition } from "../../services/colorcoding";

const SocialeKlasseStackedBar = ({ gwb }) => {
  const customSpec = cloneDeep(stackedVegaSpec);
  const colors = getColorsUsingStaticDefinition(beroepsbevolking);

  customSpec.layer[0].encoding.color["field"] = "i";
  customSpec.layer[0].encoding.color.legend["labelExpr"] =
    "datum.value == 0 ? 'Werknemer' : datum.value == 1 ? 'Ondernemer' : datum.value == 2 ? 'Uitkering' : datum.value == 3 ? 'Student' : datum.value == 4 ? 'Pensioen' :'Geen inkomen'";
  customSpec.layer[0].encoding.color["scale"] = {
    range: colors,
  };

  return (
    <StackedHorizontalBarChart
      title="18 t/m 74 jarigen naar sociale klasse"
      config={beroepsbevolking}
      gwb={gwb}
      customVegaSpec={customSpec}
    />
  );
};

export default SocialeKlasseStackedBar;
