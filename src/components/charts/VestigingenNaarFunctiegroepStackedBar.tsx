import cloneDeep from "lodash/cloneDeep";

import StackedHorizontalBarChart from "../StackedHorizontalBarChart";
import vestigingen from "../../static/links/vestigingen_hoofdfunctie.json";
import stackedVegaSpec from "../../static/charts/stackedhorizontalbar";

const VestigingenNaarFunctiegroep = ({ gwb }) => {
  const customSpec = cloneDeep(stackedVegaSpec);

  customSpec.config.legend.columns = 3;

  return (
    <StackedHorizontalBarChart
      title="Vestigingen naar functiegroep"
      config={vestigingen}
      gwb={gwb}
      customVegaSpec={customSpec}
    />
  );
};

export default VestigingenNaarFunctiegroep;
