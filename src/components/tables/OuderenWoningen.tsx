import DoubleIndicatorTable from "./DoubleIndicatorTable";

const localConfig = [
  {
    indicatorDefinitieId: "WLIFTBG",
  },
  {
    indicatorDefinitieId: "WSENIOREN",
  },
  {
    indicatorDefinitieId: "nvt",
  },
  {
    indicatorDefinitieId: "nvt",
  },
  {
    indicatorDefinitieId: "WZVENV",
  },
  {
    indicatorDefinitieId: "WZVENVEENH",
  },
  {
    indicatorDefinitieId: "WLIFTBG_P",
  },
  {
    indicatorDefinitieId: "WSENIOREN_P",
  },
  {
    indicatorDefinitieId: "WNULTREDE_P",
  },
  {
    indicatorDefinitieId: "WNULSOCCOR_P",
  },
  {
    indicatorDefinitieId: "nvt",
  },
  {
    indicatorDefinitieId: "nvt",
  },
];

const OuderenWoningen = ({ gwb, config = localConfig }) => {
  return <DoubleIndicatorTable config={config} gwb={gwb} headerTitles={["aantal", "woningen %"]} withTotalRow />;
};

export default OuderenWoningen;
