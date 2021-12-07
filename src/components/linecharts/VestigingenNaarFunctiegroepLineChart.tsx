import cloneDeep from "lodash/cloneDeep";
import LineChart from "../LineChart";
import vestigingenOntwikkeling from "../../static/links/vestigingen_ontwikkeling.json";
import vegaSpec from "../../static/charts/linechart";

const VestigingenNaarFunctiegroepLineChart = ({ gwb }) => {
  const spec = cloneDeep(vegaSpec);

  spec.config.legend.columns = 3;

  return (
    <LineChart
      title="Aantal vestigingen naar functiegroep"
      config={vestigingenOntwikkeling}
      gwb={gwb}
      customVegaSpec={spec}
    ></LineChart>
  );
};

export default VestigingenNaarFunctiegroepLineChart;
