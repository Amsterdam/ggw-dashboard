import DoubleIndicatorTable from "./DoubleIndicatorTable";

const config = [
  {
    indicatorDefinitieId: "SK017_KWETS34",
  },
  {
    indicatorDefinitieId: "SK1826_KWETS34",
  },
  {
    indicatorDefinitieId: "SK2765_KWETS34",
  },
  {
    indicatorDefinitieId: "SK66PLUS_KWETS34",
  },
  {
    indicatorDefinitieId: "SKKWETS34",
  },
  {
    indicatorDefinitieId: "SK017_KWETS34_P",
  },
  {
    indicatorDefinitieId: "SK1826_KWETS34_P",
  },
  {
    indicatorDefinitieId: "SK2765_KWETS34_P",
  },
  {
    indicatorDefinitieId: "SK66PLUS_KWETS34_P",
  },
  {
    indicatorDefinitieId: "SKKWETS34_P",
  },
];

const MostVulnerableCitizens = ({ gwb }) => {
  return <DoubleIndicatorTable gwb={gwb} config={config} headerTitles={["Aantal", "%"]} />;
};

export default MostVulnerableCitizens;
