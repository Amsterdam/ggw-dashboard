import { useEffect, useState } from "react";
import styled from "styled-components";
import { List, ListItem, Paragraph, themeColor, themeSpacing } from "@amsterdam/asc-ui";

import util from "../services/util";
import { getColor } from "../services/colorcoding";
import kleurenTabel from "../static/kleurcodetabel.json";

const colorLegend = kleurenTabel.kleur.hoog_is_groen;

const LegendWrapper = styled.div`
  border: 1px solid ${themeColor("tint", "level7")};
`;

const LegendColumn = styled.div`
  width: 20%;
  padding: ${themeSpacing(2)};
  border-right: 1px solid ${themeColor("tint", "level7")};
`;

const LegendRow = styled.div`
  display: flex;
  flex-direction: row;

  ${LegendColumn}:last-child {
    border-right: none;
  }
`;

const ColumnHeading = styled(Paragraph)`
  text-align: center;
  margin-bottom: 0px;
  font-weight: 500;
`;

const listItems = colorLegend.map((color) => {
  return styled(ListItem)`
    &::before {
      background-color: ${color} !important;
    }
  `;
});

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
  const [dataTable, setDataTable] = useState<{ [key: string]: string[] }>();

  useEffect(() => {
    if (!gwb || gwb?.code === "STAD") {
      return;
    }

    const newRow = () => {
      const row = {};
      colorLegend.forEach((color) => {
        row[color] = null;
      });
      return row;
    };

    async function fetchData() {
      const sdvars = await util.getStd();
      const data = await util.getLatestConfigCijfers(gwb, config);
      const row = newRow();

      config.map((c) => {
        const indicator = data.find((d) => d?.meta?.variabele === c.indicatorDefinitieId);
        const stdevs = sdvars.find((s) => s.indicatorDefinitieId === c.indicatorDefinitieId);
        const filterdData = indicator?.cijfers?.filter((c) => c.waarde !== null);

        if (!stdevs || !filterdData) {
          return;
        }

        const yearData = filterdData[filterdData?.length - 1];

        if (!yearData || !yearData?.waarde) {
          return;
        }

        const colorDef = getColor(
          {
            indicatorDefinitieId: c.indicatorDefinitieId,
            kleurenpalet: indicator?.meta?.kleurenpalet,
          },
          yearData?.waarde,
          yearData?.jaar,
          [stdevs],
        );

        if (row[colorDef.color] !== null) {
          return row[colorDef.color].push(indicator.label);
        }

        return (row[colorDef.color] = [indicator.label]);
      });

      setDataTable(row);
    }

    fetchData();
  }, [gwb, config]);

  return (
    <>
      {dataTable && (
        <LegendWrapper>
          <LegendRow>
            <LegendColumn style={{ backgroundColor: colorLegend[0], color: "white" }}>
              <ColumnHeading>Veel beter dan Amsterdam gemiddeld</ColumnHeading>
            </LegendColumn>
            <LegendColumn style={{ backgroundColor: colorLegend[1] }}>
              <ColumnHeading>Beter</ColumnHeading>
            </LegendColumn>
            <LegendColumn style={{ backgroundColor: colorLegend[2] }}>
              <ColumnHeading>Gemiddeld voor Amsterdam</ColumnHeading>
            </LegendColumn>
            <LegendColumn style={{ backgroundColor: colorLegend[3] }}>
              <ColumnHeading>Slechter</ColumnHeading>
            </LegendColumn>
            <LegendColumn style={{ backgroundColor: colorLegend[4], color: "white" }}>
              <ColumnHeading>Veel slechter dan Amsterdam gemiddeld</ColumnHeading>
            </LegendColumn>
          </LegendRow>

          <LegendRow>
            {Object.keys(dataTable).map((key, index) => {
              const row = dataTable[key];
              const ColoredListItem = listItems[index];

              return (
                <LegendColumn key={key}>
                  <List variant="bullet">
                    {row?.map((label) => (
                      <ColoredListItem key={label}>{label}</ColoredListItem>
                    ))}
                  </List>
                </LegendColumn>
              );
            })}
          </LegendRow>
        </LegendWrapper>
      )}
    </>
  );
};

export default LegendTable;