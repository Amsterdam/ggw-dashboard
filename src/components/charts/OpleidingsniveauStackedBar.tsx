import cloneDeep from "lodash/cloneDeep";

import StackedHorizontalBarChart from "../StackedHorizontalBarChart";
import stackedVegaSpec from "../../static/charts/stackedhorizontalbar.json";

const OpleidingsniveauStackedBar = ({ gwb }) => {
  const customSpec = cloneDeep(stackedVegaSpec);

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
