import cloneDeep from "lodash/cloneDeep";

import StackedHorizontalBarChart from "../StackedHorizontalBarChart";
import beroepsbevolking from "../../static/links/potentiele_beroepsbevolking.json";
import stackedVegaSpec from "../../static/charts/stackedhorizontalbar.json";

const SocialeKlasseStackedBar = ({ gwb }) => {
  const customSpec = cloneDeep(stackedVegaSpec);

  customSpec.config.legend.columns = 3;

  return (
    <StackedHorizontalBarChart
      title="18 t/m 74 jarigen naar sociale klasse"
      config={beroepsbevolking}
      gwb={gwb}
      customVegaSpec={customSpec}
    />
  );
};

export default SocialeKlasseStackedBar;
