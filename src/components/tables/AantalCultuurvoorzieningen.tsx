import SingleIndicatorTable from "./SingleIndicatorTable";

const localConfig = [
  {
    indicatorDefinitieId: "SRCULTAMATEUR_P",
  },
  {
    indicatorDefinitieId: "SRCULTUURPODIA_P",
  },
  {
    indicatorDefinitieId: "SRMUSEA",
  },
  {
    indicatorDefinitieId: "SRUITLEEN_P",
  },
  {
    indicatorDefinitieId: "SRCULTUUR",
  },
];

const AantalCultuurvoorzieningen = ({ gwb, config = localConfig }) => {
  return <SingleIndicatorTable config={config} gwb={gwb} title="Aantal cultuurvoorzieningen" />;
};

export default AantalCultuurvoorzieningen;
