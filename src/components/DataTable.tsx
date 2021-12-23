import { useEffect, useState } from "react";
import styled from "styled-components";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "@amsterdam/asc-ui";
import util from "../services/util";
import { getColor, getColorGivenValueAndColorPalet } from "../services/colorcoding";
import { StdType } from "../types";
import Modal from "../components/Modal";
import { Button } from "../components/Button";

const HiddenOnPrint = styled.span`
  @media print {
    display: none;
  }
`;

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
      return {
        value: "-",
      };
    }

    const dataFinalYear = getFinalYearsData(indicator);
    const dataFirstYear = getFirstYearData(indicator, dataFinalYear?.jaar);

    if (dataFirstYear === undefined) {
      return {
        value: "n.b.",
      };
    }

    if (dataFirstYear?.jaar === dataFinalYear?.jaar) {
      return {
        value: "-",
      };
    }

    return {
      firstYear: dataFirstYear?.jaar,
      firstYearValue: dataFirstYear?.waarde,
      finalYear: dataFinalYear?.jaar,
      finalYearValue: dataFinalYear?.waarde,
      value: Math.round((dataFinalYear?.waarde - dataFirstYear?.waarde) * 100) / 100,
    };
  };

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(<></>);

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
                  indicatorDevelopment.value,
                );

                const cityIndicator = cityAvgData?.find((d) => d?.meta?.variabele === c.indicatorDefinitieId);
                const cityIndicatorDevelopment = needCityAverage
                  ? getIndicatorDevelopment(cityIndicator)
                  : indicatorDevelopment;
                const cityDevelopmentColor = getColorGivenValueAndColorPalet(
                  indicator.meta.kleurenpalet,
                  cityIndicatorDevelopment.value,
                );

                const getOnDataCellClick =
                  (amsValue = null) =>
                  () => {
                    setShowModal(true);
                    setModalContent(
                      <>
                        <p>
                          <strong>Definitie:</strong>&nbsp;{indicator?.meta?.definitie}
                        </p>
                        <p>
                          <strong>Bron:</strong>&nbsp;{indicator?.meta?.bron}
                        </p>
                        {amsValue && (
                          <p>
                            <strong>Waarde Amsterdam:</strong>&nbsp;{amsValue}
                          </p>
                        )}
                      </>,
                    );
                  };

                const getOnDevelopmentCellClick =
                  (firstYear, finalYear, firstYearData = null, finalYearData = null) =>
                  () => {
                    setShowModal(true);
                    setModalContent(
                      <>
                        <p>
                          <strong>Peiljaar meest recente meting:</strong>&nbsp;{firstYear}
                        </p>
                        {firstYearData && (
                          <p>
                            <strong>Waarde meest recente meting:</strong>&nbsp;{firstYearData}
                          </p>
                        )}

                        <p>
                          <strong>Peiljaar -4:</strong>&nbsp;{finalYear}
                        </p>
                        {finalYearData && (
                          <p>
                            <strong>Waarde peiljaar -4:</strong>&nbsp;{finalYearData}
                          </p>
                        )}
                      </>,
                    );
                  };

                return (
                  <TableRow key={c.indicatorDefinitieId}>
                    <TableCell as="th">
                      <HiddenOnPrint>{c?.categorie}</HiddenOnPrint>
                    </TableCell>
                    <TableCell>
                      <Button onClick={getOnDataCellClick()}>{indicator?.meta?.labelKort}</Button>
                    </TableCell>
                    {years.map((year) => {
                      const yearData = indicator.cijfers.find((c) => c.jaar === year && c.waarde !== null);
                      const cityData = cityIndicator.cijfers.find((c) => c.jaar === year && c.waarde !== null);

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
                          <Button onClick={getOnDataCellClick(cityData?.waarde)}>
                            {util.formatNumber(yearData?.waarde) || "-"}
                          </Button>
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
                        {typeof indicatorDevelopment.value === "number" ? (
                          <Button
                            onClick={getOnDevelopmentCellClick(
                              indicatorDevelopment?.finalYear,
                              indicatorDevelopment?.firstYear,
                            )}
                          >
                            {indicatorDevelopment.value > 0
                              ? `+${util.formatNumber(indicatorDevelopment.value)}`
                              : util.formatNumber(indicatorDevelopment.value)}
                          </Button>
                        ) : (
                          indicatorDevelopment.value
                        )}
                      </TableCell>
                    )}
                    <TableCell
                      style={{
                        color: cityDevelopmentColor,
                        textAlign: "right",
                      }}
                    >
                      {typeof cityIndicatorDevelopment.value === "number" ? (
                        <Button
                          onClick={getOnDevelopmentCellClick(
                            cityIndicatorDevelopment?.finalYear,
                            cityIndicatorDevelopment?.firstYear,
                            cityIndicatorDevelopment?.finalYearValue,
                            cityIndicatorDevelopment?.firstYearValue,
                          )}
                        >
                          {cityIndicatorDevelopment.value > 0
                            ? `+${util.formatNumber(cityIndicatorDevelopment.value)}`
                            : util.formatNumber(cityIndicatorDevelopment.value)}
                        </Button>
                      ) : (
                        cityIndicatorDevelopment.value
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      )}

      <Modal showModal={showModal} setShowModal={setShowModal}>
        {modalContent}
      </Modal>
    </>
  );
};

export default DataTable;
