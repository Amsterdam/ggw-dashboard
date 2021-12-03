import cloneDeep from "lodash/cloneDeep";

import StackedHorizontalBarChart from "../StackedHorizontalBarChart";
import bodemgebruik from "../../static/links/bodemgebruik.json";

import stackedVegaSpec from "../../static/charts/stackedhorizontalbar.json";

const BodemgebruikStackedBar = ({ gwb }) => {
  const customSpec = cloneDeep(stackedVegaSpec);

  return (
    <StackedHorizontalBarChart
      title="Bodemgebruik"
      config={bodemgebruik}
      gwb={gwb}
      scaleToHundred
      customVegaSpec={customSpec}
    />
  );
};

export default BodemgebruikStackedBar;
