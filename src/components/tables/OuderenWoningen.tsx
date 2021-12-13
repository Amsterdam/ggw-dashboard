import SingleIndicatorTable from "./SingleIndicatorTable";

const localConfig = [
  {
    indicatorDefinitieId: "WLIFTBG",
  },
  {
    indicatorDefinitieId: "WSENIOREN",
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
];

const OuderenWoningen = ({ gwb, config = localConfig }) => {
  return <SingleIndicatorTable config={config} gwb={gwb} title="Voorraad ouderenwoningen" />;
};

export default OuderenWoningen;
