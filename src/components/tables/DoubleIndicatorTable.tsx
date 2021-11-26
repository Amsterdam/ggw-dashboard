import styled from "styled-components";
import { Spinner, Table, TableBody, TableCell, TableHeader, TableRow } from "@amsterdam/asc-ui";
import useGetLatestConfigCijfers from "../../hooks/useGetLatestConfigCijfers";

const SmallTable = styled(Table)`
  padding-right: 0;
`;

const DoubleIndicatorTable = ({ gwb, config, headerTitles }) => {
  const { data, isLoading } = useGetLatestConfigCijfers({ gwb, config });

  return (
    <>
      {isLoading ? <Spinner /> : null}
      {data && (
        <SmallTable>
          <TableHeader>
            <TableRow>
              <TableCell as="th" colSpan={2} style={{ textAlign: "right", borderBottom: "2px solid black" }}>
                {headerTitles[0]}
              </TableCell>
              <TableCell as="th" style={{ textAlign: "right", borderBottom: "2px solid black" }}>
                {headerTitles[1]}
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(config.length / 2)].map((_, index) => {
              const indicator = data.find((d) => d.meta.indicatorDefinitieId === config[index].indicatorDefinitieId);
              const secondIndicator = data.find(
                (d) => d.meta.indicatorDefinitieId === config[index + 4].indicatorDefinitieId,
              );

              if (!indicator) {
                return;
              }

              return (
                <TableRow key={index}>
                  <TableCell as="th">{indicator.meta.labelKort}</TableCell>
                  <TableCell style={{ textAlign: "right" }}>
                    {indicator.cijfers[indicator.cijfers.length - 1].waarde}
                  </TableCell>
                  <TableCell style={{ textAlign: "right" }}>
                    {secondIndicator.cijfers[indicator.cijfers.length - 1].waarde}
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

export default DoubleIndicatorTable;
