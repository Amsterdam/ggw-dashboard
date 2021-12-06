import cloneDeep from "lodash/cloneDeep";

import StackedHorizontalBarChart from "../StackedHorizontalBarChart";
import gemmInkomen from "../../static/links/gemm_besteedbaar_inkomen.json";
import stackedVegaSpec from "../../static/charts/stackedhorizontalbar.json";

const InkomenNaarLandelijkStackedBar = ({ gwb }) => {
  const customSpec = cloneDeep(stackedVegaSpec);

  customSpec.config.legend.columns = 3;

  return (
    <StackedHorizontalBarChart
      title="Inkomen naar landelijke 20% groepen"
      config={gemmInkomen}
      gwb={gwb}
      customVegaSpec={customSpec}
    ></StackedHorizontalBarChart>
  );
};

export default InkomenNaarLandelijkStackedBar;
