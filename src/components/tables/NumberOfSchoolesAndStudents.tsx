import DoubleIndicatorTable from "./DoubleIndicatorTable";

const config = [
  {
    indicatorDefinitieId: "OSCHBAO",
  },
  {
    indicatorDefinitieId: "OSCHVO",
  },
  {
    indicatorDefinitieId: "OSCHSBO",
  },
  {
    indicatorDefinitieId: "OSCHSO",
  },
  {
    indicatorDefinitieId: "OLLBAO",
  },
  {
    indicatorDefinitieId: "OLLVO",
  },
  {
    indicatorDefinitieId: "OLLSBO",
  },
  {
    indicatorDefinitieId: "OLLSO",
  },
];

const NumberOfSchoolesAndStudents = ({ gwb }) => {
  return <DoubleIndicatorTable gwb={gwb} config={config} headerTitles={["Scholen", "Leerlingen"]} />;
};

export default NumberOfSchoolesAndStudents;
