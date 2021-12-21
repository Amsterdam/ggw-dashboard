import cloneDeep from "lodash/cloneDeep";

import StackedHorizontalBarChart from "../StackedHorizontalBarChart";
import stackedVegaSpec from "../../static/charts/stackedhorizontalbar";

const InwonersNaarLeeftijdStackedBar = ({ gwb }) => {
  const customSpec = cloneDeep(stackedVegaSpec);

  return (
    <StackedHorizontalBarChart
      title="Inwoners naar leeftijd"
      config={[
        {
          indicatorDefinitieId: "BEV0_17_P",
        },
        {
          indicatorDefinitieId: "BEV18_26_P",
        },
        {
          indicatorDefinitieId: "BEV27_65_P",
        },
        {
          indicatorDefinitieId: "BEV66PLUS_P",
        },
      ]}
      gwb={gwb}
      customVegaSpec={customSpec}
    />
  );
};

export default InwonersNaarLeeftijdStackedBar;
