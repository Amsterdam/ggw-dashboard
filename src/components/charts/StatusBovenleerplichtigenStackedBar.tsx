import cloneDeep from "lodash/cloneDeep";
import util from "../../services/util";

import StackedHorizontalBarChart from "../StackedHorizontalBarChart";
import bodemgebruik from "../../static/links/bodemgebruik.json";

import stackedVegaSpec from "../../static/charts/stackedhorizontalbar.json";
import { getColorsUsingStaticDefinition } from "../../services/colorcoding";

const StatusBovenleerplichtigenStackedBar = ({ gwb }) => {
  const customSpec = cloneDeep(stackedVegaSpec);
  const colors = getColorsUsingStaticDefinition(bodemgebruik);

  util.setVegaLocale();

  customSpec.layer[0].encoding.color["field"] = "i";
  customSpec.layer[0].encoding.color.legend["labelExpr"] =
    "datum.value == 0 ? 'Schoolgaand (% 18-22)' : datum.value == 1 ? 'Startkwalificatie (%18-22)' : datum.value == 2 ? 'Arbeid kennis migranten (% 18-22)' : 'LSV (%18-22 )'";
  customSpec.layer[0].encoding.color["scale"] = {
    range: colors,
  };

  return (
    <StackedHorizontalBarChart
      title="Status bovenleerplichtigen"
      config={[
        {
          indicatorDefinitieId: "OSCHGAAND_P",
        },
        {
          indicatorDefinitieId: "OSTARTKWAL_P",
        },
        {
          indicatorDefinitieId: "OARBKENMIGR_P",
        },
        {
          indicatorDefinitieId: "OLSV_P",
        },
      ]}
      gwb={gwb}
      scaleToHundred
      customVegaSpec={customSpec}
    />
  );
};

export default StatusBovenleerplichtigenStackedBar;
