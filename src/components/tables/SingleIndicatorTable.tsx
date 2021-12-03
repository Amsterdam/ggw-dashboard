import { Spinner, TableBody, TableCell, TableHeader, TableRow } from "@amsterdam/asc-ui";
import { SmallTable } from "./SmallTable";
import useGetLatestConfigCijfers from "../../hooks/useGetLatestConfigCijfers";
import util from "../../services/util";
import { Config } from "../../types";

const SingleIndicatorTable = ({ gwb, config, title }: { gwb: any; config: Config[]; title: string }) => {
  const { data, isLoading } = useGetLatestConfigCijfers({ gwb, config });

  return (
    <>
      {isLoading ? <Spinner /> : null}
      {data && (
        <SmallTable>
          <TableHeader>
            <TableRow>
              <TableCell as="th" colSpan={2} style={{ textAlign: "right", borderBottom: "2px solid black" }}>
                {title}
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
                    {util.formatNumber(indicator.cijfers[indicator.cijfers.length - 1].waarde)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </SmallTable>
      )}
    </>
  );
};

export default SingleIndicatorTable;
