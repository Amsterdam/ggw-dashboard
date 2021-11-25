import { useEffect, useState } from "react";
import { Spinner, Table, TableBody, TableCell, TableHeader, TableRow } from "@amsterdam/asc-ui";
import util from "../../services/util";

const config = [
  {
    indicatorDefinitieId: "OSCHBAO",
  },
  {
    indicatorDefinitieId: "OSCHVO",
  },
  {
    indicatorDefinitieId: "OSCHSBO",
  },
  {
    indicatorDefinitieId: "OSCHSO",
  },
  {
    indicatorDefinitieId: "OLLBAO",
  },
  {
    indicatorDefinitieId: "OLLVO",
  },
  {
    indicatorDefinitieId: "OLLSBO",
  },
  {
    indicatorDefinitieId: "OLLSO",
  },
];

const NumberOfSchoolesAndStudents = ({ gwb }) => {
  const [data, setData] = useState<any[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!gwb) {
      return;
    }

    async function getData() {
      setIsLoading(true);
      const data = await util.getLatestConfigCijfers(gwb, config);

      console.log(data);

      setIsLoading(false);
      setData(data);
    }

    getData();
  }, [gwb]);

  return (
    <>
      {isLoading ? <Spinner /> : null}
      {data && (
        <Table style={{ borderBottom: "2px solid black", paddingRight: 0 }}>
          <TableHeader>
            <TableRow>
              <TableCell as="th" colSpan={2} style={{ textAlign: "right", borderBottom: "2px solid black" }}>
                Scholen
              </TableCell>
              <TableCell as="th" style={{ textAlign: "right", borderBottom: "2px solid black" }}>
                Leerlingen
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(4)].map((_, index) => {
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
        </Table>
      )}
    </>
  );
};

export default NumberOfSchoolesAndStudents;
