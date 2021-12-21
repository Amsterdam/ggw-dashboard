import cloneDeep from "lodash/cloneDeep";

import StackedHorizontalBarChart from "../StackedHorizontalBarChart";
import migratieachtergrond from "../../static/links/migratieachtergrond65+.json";
import stackedVegaSpec from "../../static/charts/stackedhorizontalbar";

const Migratieachtergrond65PlusStackedBar = ({ gwb }) => {
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

export default Migratieachtergrond65PlusStackedBar;
