import { Spinner } from "@amsterdam/asc-ui";
import useGetLatestConfigCijfers from "../../hooks/useGetLatestConfigCijfers";
import SingleIndicatorTable from "./SingleIndicatorTable";

const localConfig = [
  {
    indicatorDefinitieId: "BEV0_17",
  },
  {
    indicatorDefinitieId: "BEV18_26",
  },
  {
    indicatorDefinitieId: "IMINJONG120",
  },
  {
    indicatorDefinitieId: "BEVEENOUDERHH",
  },
  {
    indicatorDefinitieId: "BEVPAARMKINDHH",
  },
];

const AantalKinderen = ({ gwb, config = localConfig }) => {
  const { data, isLoading } = useGetLatestConfigCijfers({ gwb, config });

  return (
    <>
      {isLoading ? <Spinner /> : null}
      {data && <SingleIndicatorTable config={localConfig} gwb={gwb} title="Inwoners" />}
    </>
  );
};

export default AantalKinderen;
