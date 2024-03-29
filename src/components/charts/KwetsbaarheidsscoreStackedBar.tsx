import cloneDeep from "lodash/cloneDeep";

import StackedHorizontalBarChart from "../StackedHorizontalBarChart";
import kwetsbaarheid from "../../static/links/kwetsbaarheid.json";

import stackedVegaSpec from "../../static/charts/stackedhorizontalbar";

const KwetsbaarheidsscoreStackedBar = ({ gwb }) => {
  const customSpec = cloneDeep(stackedVegaSpec);

  return (
    <StackedHorizontalBarChart
      title="Kwetsbaarheidsscore bewoners"
      config={kwetsbaarheid}
      gwb={gwb}
      customVegaSpec={customSpec}
    />
  );
};

export default KwetsbaarheidsscoreStackedBar;
