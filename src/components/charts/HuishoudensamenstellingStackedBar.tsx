import cloneDeep from "lodash/cloneDeep";

import StackedHorizontalBarChart from "../StackedHorizontalBarChart";
import woningen from "../../static/links/woningen_naar_energielabel.json";
import stackedVegaSpec from "../../static/charts/stackedhorizontalbar.json";
import { getColorsUsingStaticDefinition } from "../../services/colorcoding";

const HuishoudensamenstellingStackedBar = ({ gwb }) => {
  const customSpec = cloneDeep(stackedVegaSpec);
  const colors = getColorsUsingStaticDefinition(woningen);

  customSpec.layer[0].encoding.color["field"] = "i";
  customSpec.layer[0].encoding.color.legend["labelExpr"] =
    "datum.value == 0 ? 'Eenpersoonshuishoudens (%hh)' : datum.value == 1 ? 'Stel zonder kinderen (%hh)' : datum.value == 2 ? 'Stel met kinderen (%hh)' : datum.value == 3 ? 'Eenoudergezin (%hh)' : 'Huishoudens overig (%hh)'";
  customSpec.layer[0].encoding.color["scale"] = {
    range: colors,
  };
  customSpec.config.legend.columns = 3;

  return (
    <StackedHorizontalBarChart
      title="Huishoudenssamenstelling"
      config={[
        {
          indicatorDefinitieId: "BEVALLEENHH_P",
        },
        {
          indicatorDefinitieId: "BEVPAARZKINDHH_P",
        },
        {
          indicatorDefinitieId: "BEVPAARMKINDHH_P",
        },
        {
          indicatorDefinitieId: "BEVEENOUDERHH_P",
        },
        {
          indicatorDefinitieId: "BEVOVERIGHH_P",
        },
      ]}
      gwb={gwb}
      customVegaSpec={customSpec}
    />
  );
};

export default HuishoudensamenstellingStackedBar;
