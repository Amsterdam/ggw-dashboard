import { useEffect, useState } from "react";
import { TableContainer, Table, TableHeader, TableRow, TableCell, TableBody } from "@amsterdam/asc-ui";

import util from "../services/util";
import { getColor } from "../services/colorcoding";

import kleurenTabel from "../static/kleurcodetabel.json";

type DataTable = { [key: string]: string | null }[];

const LegendTable = ({
  gwb,
  config,
}: {
  gwb: any;
  config: {
    label: string;
    categorie: string;
    indicatorDefinitieId: string;
  }[];
}) => {
  const colorLegend = kleurenTabel.kleur.hoog_is_groen;
  const [dataTable, setDataTable] = useState<DataTable>();

  /*
   * {
        0: {k1: waarde, k2: waarde2, k3: null, ...},
        1: [0,1,2,3,4],
    }
   *
   */

  const newRow = () => {
    const row = {};
    colorLegend.forEach((color) => {
      row[color] = null;
    });
    return row;
  };

  useEffect(() => {
    if (!gwb || gwb?.code === "STAD") {
      return;
    }

    async function fetchData() {
      const sdvars = await util.getStd();
      const data = await util.getLatestConfigCijfers(gwb, config);
      const newDataTable = [] as DataTable;

      newDataTable.push(newRow());

      config.map((c) => {
        const indicator = data.find((d) => d?.meta?.variabele === c.indicatorDefinitieId);
        const stdevs = sdvars.find((s) => s.indicatorDefinitieId === c.indicatorDefinitieId);
        const filterdData = indicator?.cijfers?.filter((c) => c.waarde !== null);

        if (!stdevs || !filterdData) {
          return;
        }

        const yearData = filterdData[filterdData?.length - 1];
        const colorDef = getColor(
          {
            indicatorDefinitieId: c.indicatorDefinitieId,
            kleurenpalet: indicator?.meta?.kleurenpalet,
          },
          yearData?.waarde,
          yearData?.jaar,
          [stdevs],
        );

        // Search first empty row

        const row = newDataTable.find((row) => row[colorDef.color] === null);

        if (row === undefined) {
          const rowToAdd = newRow();
          rowToAdd[colorDef.color] = indicator.label;

          return newDataTable.push(rowToAdd);
        }

        return (row[colorDef.color] = indicator.label);
      });

      console.log(newDataTable);

      setDataTable(newDataTable);
    }

    fetchData();
  }, [gwb, config, colorLegend]);

  return (
    <>
      {dataTable && (
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell style={{ backgroundColor: colorLegend[0] }} as="th">
                  Veel beter dan Amsterdam gemiddeld
                </TableCell>
                <TableCell style={{ backgroundColor: colorLegend[1] }} as="th">
                  Beter
                </TableCell>
                <TableCell style={{ backgroundColor: colorLegend[2] }} as="th">
                  Gemiddeld voor Amsterdam
                </TableCell>
                <TableCell style={{ backgroundColor: colorLegend[3] }} as="th">
                  Slechter
                </TableCell>
                <TableCell style={{ backgroundColor: colorLegend[4] }} as="th">
                  Veel slechter dan Amsterdam gemiddeld
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataTable.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row[colorLegend[0]]}</TableCell>
                  <TableCell>{row[colorLegend[1]]}</TableCell>
                  <TableCell>{row[colorLegend[2]]}</TableCell>
                  <TableCell>{row[colorLegend[3]]}</TableCell>
                  <TableCell>{row[colorLegend[4]]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default LegendTable;
