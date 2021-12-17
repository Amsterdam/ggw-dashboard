import { useState } from "react";
import { Spinner, TableBody, TableCell, TableHeader, TableRow } from "@amsterdam/asc-ui";
import { SmallTable } from "./SmallTable";
import useGetLatestConfigCijfers from "../../hooks/useGetLatestConfigCijfers";
import util from "../../services/util";
import { Config } from "../../types";
import Modal from "../Modal";
import { Button } from "../Button";

const SingleIndicatorTable = ({
  gwb,
  config,
  title,
  withTotalRow = false,
}: {
  gwb: any;
  config: Config[];
  title: string;
  withTotalRow?: boolean;
}) => {
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
              <TableCell as="th" colSpan={2} style={{ textAlign: "right", borderBottom: "2px solid black" }}>
                {title}
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {config.map((c, i) => {
              const indicator = data.find((d) => d.meta.indicatorDefinitieId === c.indicatorDefinitieId);

              if (!indicator) {
                return;
              }

              const onClick = () => {
                setShowModal(true);
                setModalContent(
                  <>
                    <p>
                      <strong>Definitie:</strong>&nbsp;{indicator?.meta?.definitie}
                    </p>
                    <p>
                      <strong>Bron:</strong>&nbsp;{indicator?.meta?.bron}
                    </p>
                  </>,
                );
              };

              const cellStyle = withTotalRow && i === config.length - 1 ? { borderTop: "1px solid black" } : {};

              return (
                <TableRow key={c.indicatorDefinitieId}>
                  <TableCell as="th" style={cellStyle}>
                    <Button onClick={onClick}>{indicator?.meta?.labelKort}</Button>
                  </TableCell>
                  <TableCell style={{ ...{ textAlign: "right" }, ...cellStyle }}>
                    <Button onClick={onClick}>
                      {util.formatNumber(indicator?.cijfers[indicator?.cijfers?.length - 1]?.waarde)}
                    </Button>
                  </TableCell>
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

export default SingleIndicatorTable;
