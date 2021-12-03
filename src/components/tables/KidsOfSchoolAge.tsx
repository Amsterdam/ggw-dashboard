import { Spinner } from "@amsterdam/asc-ui";
import useGetLatestConfigCijfers from "../../hooks/useGetLatestConfigCijfers";
import SingleIndicatorTable from "./SingleIndicatorTable";

const localConfig = [
  {
    indicatorDefinitieId: "OVVEINDI",
  },
  {
    indicatorDefinitieId: "BEV4_11",
  },
  {
    indicatorDefinitieId: "BEV12_17",
  },
  {
    indicatorDefinitieId: "OBOVENLEERPL",
  },
];

const KidsOfSchoolAge = ({ gwb, config = localConfig }) => {
  const { data, isLoading } = useGetLatestConfigCijfers({ gwb, config });

  return (
    <>
      {isLoading ? <Spinner /> : null}
      {data && <SingleIndicatorTable config={localConfig} gwb={gwb} title="Inwoners" />}
    </>
  );
};

export default KidsOfSchoolAge;
