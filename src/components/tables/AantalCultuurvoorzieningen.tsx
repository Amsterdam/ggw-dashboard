import SingleIndicatorTable from "./SingleIndicatorTable";

const localConfig = [
  {
    indicatorDefinitieId: "SRCULTUURPODIA",
  },
  {
    indicatorDefinitieId: "SRCULTAMATEUR",
  },
  {
    indicatorDefinitieId: "SRUITLEEN",
  },
  {
    indicatorDefinitieId: "SRMUSEA",
  },
  {
    indicatorDefinitieId: "SRCULTUUR",
  },
];

const AantalCultuurvoorzieningen = ({ gwb, config = localConfig }) => {
  return <SingleIndicatorTable config={config} gwb={gwb} title="Aantal vestigingen cultuur" withTotalRow />;
};

export default AantalCultuurvoorzieningen;
