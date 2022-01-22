import cloneDeep from "lodash/cloneDeep";
import StackedHorizontalBarChart from "../StackedHorizontalBarChart";

import stackedVegaSpec from "../../static/charts/stackedhorizontalbar";

const StatusBovenleerplichtigenStackedBar = ({ gwb }) => {
  const config = [
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
  ];
  const customSpec = cloneDeep(stackedVegaSpec);

  customSpec.config.legend.columns = 3;

  return (
    <StackedHorizontalBarChart
      title="Status bovenleerplichtigen"
      config={config}
      gwb={gwb}
      customVegaSpec={customSpec}
    />
  );
};

export default StatusBovenleerplichtigenStackedBar;
