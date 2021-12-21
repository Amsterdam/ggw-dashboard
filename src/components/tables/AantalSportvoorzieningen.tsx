import SingleIndicatorTable from "./SingleIndicatorTable";

const localConfig = [
  {
    indicatorDefinitieId: "SRSPORTACCOM",
  },
  {
    indicatorDefinitieId: "SRSPORTBUITEN",
  },
  {
    indicatorDefinitieId: "SRFITNESS",
  },
  {
    indicatorDefinitieId: "SRSPORTBINNEN",
  },
  {
    indicatorDefinitieId: "SRSPORTWATER",
  },
  {
    indicatorDefinitieId: "SRSPORTOVERIG",
  },
  {
    indicatorDefinitieId: "SRSPORT",
  },
];

const AantalSportvoorzieningen = ({ gwb, config = localConfig }) => {
  return <SingleIndicatorTable config={config} gwb={gwb} title="Aantal vestigingen sport" withTotalRow />;
};

export default AantalSportvoorzieningen;
