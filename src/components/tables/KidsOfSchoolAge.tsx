import { Spinner, Table, TableBody, TableCell, TableHeader, TableRow } from "@amsterdam/asc-ui";
import useGetLatestConfigCijfers from "../../hooks/useGetLatestConfigCijfers";

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
      {data && (
        <Table style={{ borderBottom: "2px solid black", paddingRight: 0 }}>
          <TableHeader>
            <TableRow>
              <TableCell as="th" colSpan={2} style={{ textAlign: "right", borderBottom: "2px solid black" }}>
                Inwoners
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {config.map((c) => {
              const indicator = data.find((d) => d.meta.indicatorDefinitieId === c.indicatorDefinitieId);

              if (!indicator) {
                return;
              }

              return (
                <TableRow key={c.indicatorDefinitieId}>
                  <TableCell as="th">{indicator.meta.labelKort}</TableCell>
                  <TableCell style={{ textAlign: "right" }}>
                    {indicator.cijfers[indicator.cijfers.length - 1].waarde}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default KidsOfSchoolAge;
