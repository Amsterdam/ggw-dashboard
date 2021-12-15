import cloneDeep from "lodash/cloneDeep";

import StackedHorizontalBarChart from "../StackedHorizontalBarChart";
import stackedVegaSpec from "../../static/charts/stackedhorizontalbar";

const HuishoudensamenstellingStackedBar = ({ gwb }) => {
  const customSpec = cloneDeep(stackedVegaSpec);

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
