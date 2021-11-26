import DoubleIndicatorTable from "./DoubleIndicatorTable";

const config = [
  {
    indicatorDefinitieId: "SK017_SES234",
  },
  {
    indicatorDefinitieId: "SK1826_SES234",
  },
  {
    indicatorDefinitieId: "SK2765_SES234",
  },
  {
    indicatorDefinitieId: "SK66PLUS_SES234",
  },
  {
    indicatorDefinitieId: "SKSES234",
  },
  {
    indicatorDefinitieId: "SK017_SES234_P",
  },
  {
    indicatorDefinitieId: "SK1826_SES234_P",
  },
  {
    indicatorDefinitieId: "SK2765_SES234_P",
  },
  {
    indicatorDefinitieId: "SK66PLUS_SES234_P",
  },
  {
    indicatorDefinitieId: "SKSES234_P",
  },
];

const CitizensWithLowCES = ({ gwb }) => {
  return <DoubleIndicatorTable gwb={gwb} config={config} headerTitles={["Aantal", "%"]} />;
};

export default CitizensWithLowCES;
