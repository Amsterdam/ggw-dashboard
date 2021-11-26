import cloneDeep from "lodash/cloneDeep";

import StackedHorizontalBarChart from "../StackedHorizontalBarChart";
import woningen from "../../static/links/woningen_naar_energielabel.json";
import stackedVegaSpec from "../../static/charts/stackedhorizontalbar.json";
import { getColorsUsingStaticDefinition } from "../../services/colorcoding";

const OpleidingsniveauStackedBar = ({ gwb }) => {
  const customSpec = cloneDeep(stackedVegaSpec);
  const colors = getColorsUsingStaticDefinition(woningen);

  customSpec.layer[0].encoding.color["field"] = "i";
  customSpec.layer[0].encoding.color.legend["labelExpr"] =
    "datum.value == 0 ? 'Opleiding laag (%)' : datum.value == 1 ? 'Opleiding middelbaar (%)' : 'Opleiding hoog (%)'";
  customSpec.layer[0].encoding.color["scale"] = {
    range: colors,
  };

  return (
    <StackedHorizontalBarChart
      title="Opleidingsniveau (%15-74 jaar)"
      config={[
        {
          indicatorDefinitieId: "BEVOPLLAAG_P",
        },
        {
          indicatorDefinitieId: "BEVOPLMID_P",
        },
        {
          indicatorDefinitieId: "BEVOPLHOOG_P",
        },
      ]}
      gwb={gwb}
      customVegaSpec={customSpec}
    />
  );
};

export default OpleidingsniveauStackedBar;
