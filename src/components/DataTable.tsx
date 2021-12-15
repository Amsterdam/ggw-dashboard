import { useEffect, useState } from "react";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "@amsterdam/asc-ui";
import util from "../services/util";
import { getColor, getColorGivenValueAndColorPalet } from "../services/colorcoding";
import { StdType } from "../types";

const DataTable = ({
  gwb,
  config,
}: {
  gwb: any;
  config: {
    label: string;
    categorie?: string;
    indicatorDefinitieId: string;
  }[];
}) => {
  const [data, setData] = useState<any[]>();
  const [cityAvgData, setCityAvgData] = useState<any[]>();
  const [sd, setSd] = useState<
    {
      jaar: number;
      gemiddelde: number;
      standaardafwijking: number;
      indicatorDefinitieId: string;
    }[]
  >();
  const [years, setYears] = useState<number[]>([]);
  const needCityAverage = gwb?.code !== "STAD";

  useEffect(() => {
    if (!gwb) {
      return;
    }

    async function getData() {
      if (needCityAverage) {
        const cityData = await util.getConfigCijfers(util.getCity(), config);

        setCityAvgData(cityData);
      }

      const data = await util.getConfigCijfers(gwb, config);
      const sdvars = await util.getStd();
      const cijfers = util.getYearCijfers(data);
      const maxYear = util.getMaxYear(cijfers);

      setSd(sdvars as StdType[]);
      setYears([6, 5, 4, 3, 2, 1, 0].map((i) => maxYear - i));
      setData(data);
    }

    getData();
  }, [gwb, needCityAverage, config]);

  const getSd = (indicator) => {
    return sd?.filter((s) => s.indicatorDefinitieId === indicator);
  };

  const getFirstYearData = (indicator, finalYear): { waarde: any; jaar: number } | null => {
    return indicator.cijfers.find((c) => c.jaar === finalYear - 4 && c.waarde !== null);
  };

  const getFinalYearsData = (indicator): { waarde: any; jaar: number } | null => {
    let dataLastYear;
    for (let index = years.length - 1; index >= 0; index--) {
      const year = years[index];

      dataLastYear = indicator.cijfers.find((c) => c.jaar === year && c.waarde !== null);

      if (dataLastYear !== undefined) {
        break;
      }
    }

    return dataLastYear;
  };

  /**
   * Get indicator development in past 4 years.
   * @param indicator
   * @returns
   */
  const getIndicatorDevelopment = (indicator) => {
    if (!indicator || !indicator?.cijfers) {
      return "-";
    }

    const dataFinalYear = getFinalYearsData(indicator);
    const dataFirstYear = getFirstYearData(indicator, dataFinalYear?.jaar);

    if (dataFirstYear === undefined) {
      return "n.b.";
    }

    if (dataFirstYear?.jaar === dataFinalYear?.jaar) {
      return "-";
    }

    return Math.round((dataFinalYear?.waarde - dataFirstYear?.waarde) * 100) / 100;
  };

  return (
    <>
      {data && gwb && years && sd && (
        <Table style={{ borderBottom: "2px solid black" }}>
          <TableHeader>
            <TableRow>
              <TableCell
                colSpan={10 + (needCityAverage ? 1 : 0)}
                style={{ borderBottom: "none", textAlign: "right", paddingBottom: "0px" }}
              >
                Ontwikkeling laatste 4 jaar
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell as="th" style={{ borderBottom: "2px solid black" }}>
                &nbsp;
              </TableCell>
              <TableCell as="th" style={{ borderBottom: "2px solid black" }}>
                &nbsp;
              </TableCell>
              {years.map((year) => (
                <TableCell as="th" key={year} style={{ textAlign: "right", borderBottom: "2px solid black" }}>
                  {year}
                </TableCell>
              ))}
              {gwb?.code !== "STAD" && (
                <TableCell as="th" style={{ textAlign: "right", borderBottom: "2px solid black" }}>
                  {gwb?.naam}
                </TableCell>
              )}
              <TableCell as="th" style={{ textAlign: "right", borderBottom: "2px solid black" }}>
                Amsterdam
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {config &&
              config.map((c) => {
                const indicator = data.find((d) => d?.meta?.variabele === c.indicatorDefinitieId);
                const stdevs = getSd(c.indicatorDefinitieId);

                if (!indicator) {
                  return;
                }

                const indicatorDevelopment = getIndicatorDevelopment(indicator);
                const developmentColor = getColorGivenValueAndColorPalet(
                  indicator.meta.kleurenpalet,
                  indicatorDevelopment,
                );

                const cityIndicatorDevelopment = needCityAverage
                  ? getIndicatorDevelopment(cityAvgData?.find((d) => d?.meta?.variabele === c.indicatorDefinitieId))
                  : indicatorDevelopment;
                const cityDevelopmentColor = getColorGivenValueAndColorPalet(
                  indicator.meta.kleurenpalet,
                  cityIndicatorDevelopment,
                );

                // console.log("stdevs", stdevs);
                // console.log(indicator);

                return (
                  <TableRow key={c.indicatorDefinitieId}>
                    <TableCell as="th">{c?.categorie}</TableCell>
                    <TableCell>{indicator?.meta?.labelKort}</TableCell>
                    {years.map((year) => {
                      const yearData = indicator.cijfers.find((c) => c.jaar === year && c.waarde !== null);

                      if (!yearData) {
                        return (
                          <TableCell key={year} style={{ textAlign: "right" }}>
                            -
                          </TableCell>
                        );
                      }

                      const colors =
                        stdevs &&
                        getColor(
                          {
                            indicatorDefinitieId: c.indicatorDefinitieId,
                            kleurenpalet: indicator?.meta?.kleurenpalet,
                          },
                          yearData?.waarde,
                          year,
                          stdevs,
                        );

                      return (
                        <TableCell
                          key={year}
                          style={{
                            backgroundColor: needCityAverage ? colors?.color : "#ffffff",
                            color: colors?.textColor,
                            textAlign: "right",
                          }}
                        >
                          {util.formatNumber(yearData?.waarde) || "-"}
                        </TableCell>
                      );
                    })}
                    {needCityAverage && (
                      <TableCell
                        style={{
                          color: developmentColor,
                          textAlign: "right",
                        }}
                      >
                        {indicatorDevelopment > 0
                          ? `+${util.formatNumber(indicatorDevelopment)}`
                          : util.formatNumber(indicatorDevelopment)}
                      </TableCell>
                    )}
                    <TableCell
                      style={{
                        color: cityDevelopmentColor,
                        textAlign: "right",
                      }}
                    >
                      {cityIndicatorDevelopment > 0
                        ? `+${util.formatNumber(cityIndicatorDevelopment)}`
                        : util.formatNumber(cityIndicatorDevelopment)}
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

export default DataTable;
