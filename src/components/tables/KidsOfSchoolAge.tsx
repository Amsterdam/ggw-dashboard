import SingleIndicatorTable from "./SingleIndicatorTable";

const localConfig = [
  {
    indicatorDefinitieId: "OVVEINDI",
  },
  {
    indicatorDefinitieId: "BEV4_11",
  },
  {
    indicatorDefinitieId: "BEV12_17",
  },
  {
    indicatorDefinitieId: "OBOVENLEERPL",
  },
];

const KidsOfSchoolAge = ({ gwb, config = localConfig }) => {
  return <SingleIndicatorTable config={config} gwb={gwb} title="Inwoners" />;
};

export default KidsOfSchoolAge;
