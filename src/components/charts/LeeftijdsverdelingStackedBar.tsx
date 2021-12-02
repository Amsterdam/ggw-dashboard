import cloneDeep from "lodash/cloneDeep";

import StackedHorizontalBarChart from "../StackedHorizontalBarChart";
import stackedVegaSpec from "../../static/charts/stackedhorizontalbar.json";
import { getColorsUsingStaticDefinition } from "../../services/colorcoding";

const LeeftijdsverdelingStackedBar = ({ gwb }) => {
  const config = [
    {
      indicatorDefinitieId: "BEV0_17_P",
    },
    {
      indicatorDefinitieId: "BEV18_64_P",
    },
    {
      indicatorDefinitieId: "BEV65_74_P",
    },
    {
      indicatorDefinitieId: "BEV75PLUS_P",
    },
  ];
  const customSpec = cloneDeep(stackedVegaSpec);
  const colors = getColorsUsingStaticDefinition(config);

  customSpec.layer[0].encoding.color["field"] = "i";
  customSpec.layer[0].encoding.color.legend["labelExpr"] =
    "datum.value == 0 ? '0-17 jaar (%)' : datum.value == 1 ? 'BEV18_64_P' : datum.value == 2 ? 'BEV65_74_P' : '75+ (%)'";
  customSpec.layer[0].encoding.color["scale"] = {
    range: colors,
  };

  return <StackedHorizontalBarChart title="Leeftijdsverdeling" config={config} gwb={gwb} customVegaSpec={customSpec} />;
};

export default LeeftijdsverdelingStackedBar;
