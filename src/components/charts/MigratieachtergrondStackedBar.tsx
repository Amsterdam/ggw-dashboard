import cloneDeep from "lodash/cloneDeep";

import StackedHorizontalBarChart from "../StackedHorizontalBarChart";
import migratieachtergrond from "../../static/links/migratieachtergrond.json";
import stackedVegaSpec from "../../static/charts/stackedhorizontalbar";

const MigratieachtergrondStackedBar = ({ gwb }) => {
  const customSpec = cloneDeep(stackedVegaSpec);

  return (
    <StackedHorizontalBarChart
      title="Migratieachtergrond"
      config={migratieachtergrond}
      gwb={gwb}
      customVegaSpec={customSpec}
    />
  );
};

export default MigratieachtergrondStackedBar;
