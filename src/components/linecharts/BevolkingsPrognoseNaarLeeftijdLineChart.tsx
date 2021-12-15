import cloneDeep from "lodash/cloneDeep";
import LineChart from "../LineChart";
import vegaSpec from "../../static/charts/linechart";

const BevolkingsPrognoseNaarLeeftijdLineChart = ({ gwb }) => {
  const spec = cloneDeep(vegaSpec);

  spec.config.legend.columns = 3;
  spec.legends[0].legendX = -60;
  spec.legends[0].legendY = -80;

  return (
    <LineChart
      title="Bevolkingsprognose naar leeftijd"
      config={[
        {
          indicatorDefinitieId: "BEV0_17",
          prognoseIndicator: "BEV0_17_PROG",
        },
        {
          indicatorDefinitieId: "BEV18_64",
          prognoseIndicator: "BEV18_64_PROG",
        },
        {
          indicatorDefinitieId: "BEV65PLUS",
          prognoseIndicator: "BEV65PLUS_PROG",
        },
        {
          indicatorDefinitieId: "BEVTOTAAL",
          prognoseIndicator: "BEV_PROG",
        },
      ]}
      withPrognosis
      gwb={gwb}
      customVegaSpec={spec}
    ></LineChart>
  );
};

export default BevolkingsPrognoseNaarLeeftijdLineChart;
