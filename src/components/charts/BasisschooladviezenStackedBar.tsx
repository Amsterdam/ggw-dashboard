import cloneDeep from "lodash/cloneDeep";
import StackedHorizontalBarChart from "../StackedHorizontalBarChart";
import stackedVegaSpec from "../../static/charts/stackedhorizontalbar";

const BasisschooladviezenStackedBar = ({ gwb }) => {
  const customSpec = cloneDeep(stackedVegaSpec);

  return (
    <StackedHorizontalBarChart
      title="Basisschooladviezen"
      config={[
        {
          indicatorDefinitieId: "OPROVMBOBK_P",
        },
        {
          indicatorDefinitieId: "OVMBOGT_P",
        },
        {
          indicatorDefinitieId: "OHVWO_P",
        },
      ]}
      gwb={gwb}
      scaleToHundred
      customVegaSpec={customSpec}
    />
  );
};

export default BasisschooladviezenStackedBar;
