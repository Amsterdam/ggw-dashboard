import { useState } from "react";
import styled from "styled-components";
import { Spinner, TableBody, TableCell, TableHeader, TableRow } from "@amsterdam/asc-ui";
import useGetLatestConfigCijfers from "../../hooks/useGetLatestConfigCijfers";
import util from "../../services/util";
import { Button } from "../Button";
import { SmallTable } from "./SmallTable";
import Modal from "../Modal";

const TableCellRight = styled(TableCell)`
  text-align: right;
`;

const DoubleIndicatorTable = ({ gwb, config, headerTitles, withTotalRow = false }) => {
  const { data, isLoading } = useGetLatestConfigCijfers({ gwb, config });
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(<></>);

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
            {[...Array(config.length / 2)].map((_, index) => {
              const indicator = data.find((d) => d.meta.indicatorDefinitieId === config[index].indicatorDefinitieId);
              const secondIndicator = data.find(
                (d) => d.meta.indicatorDefinitieId === config[index + config.length / 2].indicatorDefinitieId,
              );

              if (!indicator && !secondIndicator) {
                return;
              }

              const onClick = () => {
                setShowModal(true);
                setModalContent(
                  <>
                    <p>
                      <strong>Definitie:</strong>&nbsp;{(indicator || secondIndicator)?.meta?.definitie}
                    </p>
                    <p>
                      <strong>Bron:</strong>&nbsp;{(indicator || secondIndicator)?.meta?.bron}
                    </p>
                  </>,
                );
              };

              const cellStyle = withTotalRow && index === config.length / 2 - 1 ? { borderTop: "1px solid black" } : {};

              return (
                <TableRow key={(indicator || secondIndicator)?.meta?.indicatorDefinitieId}>
                  <TableCell as="th" style={cellStyle}>
                    <Button onClick={onClick}>{(indicator || secondIndicator)?.meta?.labelKort}</Button>
                  </TableCell>
                  <TableCellRight style={cellStyle}>
                    <Button onClick={onClick}>
                      {util.formatNumber(indicator?.cijfers[indicator?.cijfers?.length - 1]?.waarde)}
                    </Button>
                  </TableCellRight>
                  <TableCellRight style={cellStyle}>
                    <Button onClick={onClick}>
                      {util.formatNumber(secondIndicator?.cijfers[secondIndicator?.cijfers?.length - 1]?.waarde)}
                    </Button>
                  </TableCellRight>
                </TableRow>
              );
            })}
          </TableBody>
        </SmallTable>
      )}

      <Modal showModal={showModal} setShowModal={setShowModal}>
        {modalContent}
      </Modal>
    </>
  );
};

export default DoubleIndicatorTable;
