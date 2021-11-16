import { useEffect, useState } from "react";
import { TableContainer, Table, TableHeader, TableRow, TableCell, TableBody } from "@amsterdam/asc-ui";
import util from "../services/util";
import { getColor, getColorGivenValueAndColorPalet } from "../services/colorcoding";

const DataTable = ({
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
        const cityData = await util.getConfigCijfers(await util.getCity(), config);

        setCityAvgData(cityData);
      }

      const data = await util.getConfigCijfers(gwb, config);
      const sdvars = await util.getStd();
      const cijfers = util.getYearCijfers(data);
      const maxYear = util.getMaxYear(cijfers);

      setSd(sdvars);
      setYears([4, 3, 2, 1, 0].map((i) => maxYear - i));
      setData(data);
    }

    getData();
  }, [gwb]);

  const getSd = (indicator) => {
    return sd?.find((s) => s.indicatorDefinitieId === indicator);
  };

  const getFirstYearData = (indicator): { waarde: any; jaar: number } | null => {
    let dataFirstYear;
    for (let index = 0; index < years.length; index++) {
      const year = years[index];

      dataFirstYear = indicator.cijfers.find((c) => c.jaar === year && c.waarde !== null);

      if (dataFirstYear !== undefined) {
        break;
      }
    }

    return dataFirstYear;
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

  const getIndicatorDevelopment = (indicator) => {
    if (!indicator || !indicator?.cijfers) {
      return "-";
    }

    const dataFirstYear = getFirstYearData(indicator);
    const dataFinalYear = getFinalYearsData(indicator);

    if (dataFirstYear?.jaar === dataFinalYear?.jaar) {
      return 0;
    }

    return Math.round((dataFinalYear?.waarde - dataFirstYear?.waarde) * 100) / 100;
  };

  return (
    <>
      {data && years && sd && (
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell colSpan={8 + (needCityAverage ? 1 : 0)} style={{ borderBottom: "none", textAlign: "right" }}>
                  Ontwikkeling laatste {years.length} jaar
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell as="th">&nbsp;</TableCell>
                <TableCell as="th">&nbsp;</TableCell>
                {years.map((year) => (
                  <TableCell as="th" key={year}>
                    {year}
                  </TableCell>
                ))}
                {gwb?.code !== "STAD" && <TableCell as="th">Selectie</TableCell>}
                <TableCell as="th">Amsterdam</TableCell>
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

                  const symbool = indicator?.meta?.symbool;

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

                  console.log(indicator);

                  return (
                    <TableRow key={c.indicatorDefinitieId}>
                      <TableCell as="th">{c.categorie}</TableCell>
                      <TableCell>{c.label}</TableCell>
                      {years.map((year) => {
                        const yearData = indicator.cijfers.find((c) => c.jaar === year && c.waarde !== null);

                        if (!yearData) {
                          return <TableCell key={year}>-</TableCell>;
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
                            [stdevs],
                          );

                        return (
                          <TableCell
                            key={year}
                            style={{ backgroundColor: needCityAverage ? colors?.color : "#ffffff" }}
                          >
                            {`${yearData?.waarde}${symbool ? symbool : ""}` || "-"}
                          </TableCell>
                        );
                      })}
                      {needCityAverage && (
                        <TableCell
                          style={{
                            color: developmentColor,
                          }}
                        >
                          {indicatorDevelopment}
                          {symbool}
                        </TableCell>
                      )}
                      <TableCell
                        style={{
                          color: cityDevelopmentColor,
                        }}
                      >
                        {cityIndicatorDevelopment}
                        {symbool}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default DataTable;
