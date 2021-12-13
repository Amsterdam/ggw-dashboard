import styled from "styled-components";
import { Spinner, TableBody, TableCell, TableHeader, TableRow } from "@amsterdam/asc-ui";
import useGetLatestConfigCijfers from "../../hooks/useGetLatestConfigCijfers";
import util from "../../services/util";
import { SmallTable } from "./SmallTable";

const TableCellRight = styled(TableCell)`
  text-align: right;
`;

const FinalRow = ({ data, config }) => {
  const finalIndicator = data.find(
    (d) => d.meta.indicatorDefinitieId === config[config.length / 2 - 1].indicatorDefinitieId,
  );
  const secondFinalIndicator = data.find(
    (d) => d.meta.indicatorDefinitieId === config[config.length - 1].indicatorDefinitieId,
  );

  return (
    <TableRow>
      <TableCell as="th" style={{ borderTop: "1px solid black" }}>
        {finalIndicator.meta.labelKort}
      </TableCell>
      <TableCellRight style={{ borderTop: "1px solid black" }}>
        {util.formatNumber(finalIndicator.cijfers[finalIndicator.cijfers.length - 1].waarde)}
      </TableCellRight>
      <TableCellRight style={{ borderTop: "1px solid black" }}>
        {util.formatNumber(secondFinalIndicator.cijfers[secondFinalIndicator.cijfers.length - 1].waarde)}
      </TableCellRight>
    </TableRow>
  );
};

const DoubleIndicatorTable = ({ gwb, config, headerTitles, withTotalRow = false }) => {
  const { data, isLoading } = useGetLatestConfigCijfers({ gwb, config });

  return (
    <>
      {isLoading ? <Spinner /> : null}
      {data && (
        <SmallTable>
          <TableHeader>
            <TableRow>
              <TableCellRight as="th" colSpan={2} style={{ borderBottom: "2px solid black" }}>
                {headerTitles[0]}
              </TableCellRight>
              <TableCellRight as="th" style={{ borderBottom: "2px solid black" }}>
                {headerTitles[1]}
              </TableCellRight>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array((withTotalRow ? config.length - 2 : config.length) / 2)].map((_, index) => {
              const indicator = data.find((d) => d.meta.indicatorDefinitieId === config[index].indicatorDefinitieId);
              const secondIndicator = data.find(
                (d) => d.meta.indicatorDefinitieId === config[index + config.length / 2].indicatorDefinitieId,
              );

              if (!indicator || !secondIndicator) {
                return;
              }

              return (
                <TableRow key={index}>
                  <TableCell as="th">{indicator.meta.labelKort}</TableCell>
                  <TableCellRight>
                    {util.formatNumber(indicator.cijfers[indicator.cijfers.length - 1]?.waarde)}
                  </TableCellRight>
                  <TableCellRight>
                    {util.formatNumber(secondIndicator.cijfers[indicator.cijfers.length - 1]?.waarde)}
                  </TableCellRight>
                </TableRow>
              );
            })}
            {withTotalRow && <FinalRow data={data} config={config} />}
          </TableBody>
        </SmallTable>
      )}
    </>
  );
};

export default DoubleIndicatorTable;
