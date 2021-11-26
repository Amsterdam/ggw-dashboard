import cloneDeep from "lodash/cloneDeep";
import util from "../../services/util";

import StackedHorizontalBarChart from "../StackedHorizontalBarChart";
import bodemgebruik from "../../static/links/bodemgebruik.json";

import stackedVegaSpec from "../../static/charts/stackedhorizontalbar.json";
import { getColorsUsingStaticDefinition } from "../../services/colorcoding";

const BasisschooladviezenStackedBar = ({ gwb }) => {
  const customSpec = cloneDeep(stackedVegaSpec);
  const colors = getColorsUsingStaticDefinition(bodemgebruik);

  util.setVegaLocale();

  customSpec.layer[0].encoding.color["field"] = "i";
  customSpec.layer[0].encoding.color.legend["labelExpr"] =
    "datum.value == 0 ? 'Advies PRO/VMBO-BK (%)' : datum.value == 1 ? 'Advies VMBO -GT' : 'PO: % Basisschooladvies Havo/VWO'";
  customSpec.layer[0].encoding.color["scale"] = {
    range: colors,
  };

  return (
    <StackedHorizontalBarChart
      title="Basisschooladviezen"
      config={[
        {
          indicatorDefinitieId: "OPROVMBOBK_P",
        },
        {
          indicatorDefinitieId: "OVMBOGT_P",
        },
        {
          indicatorDefinitieId: "OHVWO_P",
        },
      ]}
      gwb={gwb}
      scaleToHundred
      customVegaSpec={customSpec}
    />
  );
};

export default BasisschooladviezenStackedBar;
