import SingleIndicatorTable from "./SingleIndicatorTable";

const localConfig = [
  {
    indicatorDefinitieId: "SRFITNESS_P",
  },
  {
    indicatorDefinitieId: "SRSPORTACCOM_P",
  },
  {
    indicatorDefinitieId: "SRSPORTBINNEN_P",
  },
  {
    indicatorDefinitieId: "SRSPORTBUITEN_P",
  },
  {
    indicatorDefinitieId: "SRSPORTOVERIG_P",
  },
  {
    indicatorDefinitieId: "SRSPORTWATER_P",
  },
  {
    indicatorDefinitieId: "SRSPORT",
  },
];

const AantalSportvoorzieningen = ({ gwb, config = localConfig }) => {
  return <SingleIndicatorTable config={config} gwb={gwb} title="Aantal sportvoorzieningen" />;
};

export default AantalSportvoorzieningen;
