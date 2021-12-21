import styled from "styled-components";
import { Heading, List, ListItem, TableBody, TableCell, TableHeader, TableRow, themeSpacing } from "@amsterdam/asc-ui";
import { SmallTable } from "./tables/SmallTable";
import kleurencodetabel from "../static/kleurcodetabel.json";

const LegendWrapper = styled.div`
  margin: ${themeSpacing(4)};
`;

const ColorLegend = () => {
  const hoogIsGroen = kleurencodetabel.kleur.hoog_is_groen;
  const hoogIsBlauw = kleurencodetabel.kleur.hoog_is_blauw;

  return (
    <LegendWrapper>
      <Heading as="h4">Betekenis kleuren</Heading>

      <List variant="bullet">
        <ListItem>
          De kleuren beschrijven de spreiding over de stad van de geselecteerde indicator. De kleur geeft aan hoe een
          gebied het doet in vergelijking met de andere gebieden in de stad en het gemiddelde van Amsterdam.
        </ListItem>
        <ListItem>
          De kleuren geven NIET aan of de score goed of slecht is t.o.v. beleidsdoelen van de gemeente Amsterdam en of
          de verschillen tussen de gebieden significant zijn.
        </ListItem>
      </List>

      <SmallTable>
        <TableHeader>
          <TableRow>
            <TableCell colSpan={2} as="th" style={{ borderBottom: "2px solid black" }}>
              Betekenis van kleur
            </TableCell>
            <TableCell as="th" style={{ borderBottom: "2px solid black" }}>
              Wanneer deze kleur
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell style={{ backgroundColor: hoogIsGroen[0], color: "#ffffff" }}>
              Veel beter dan gemiddeld
            </TableCell>
            <TableCell style={{ backgroundColor: hoogIsBlauw[0], color: "#ffffff" }}>Veel meer dan gemiddeld</TableCell>
            <TableCell>Minstens 1 standaarddeviatie onder of boven het stedelijk gemiddelde</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ backgroundColor: hoogIsGroen[1] }}>Beter dan gemiddeld</TableCell>
            <TableCell style={{ backgroundColor: hoogIsBlauw[1] }}>Meer dan gemiddeld</TableCell>
            <TableCell>&nbsp;</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ backgroundColor: hoogIsGroen[2] }}>Gemiddeld</TableCell>
            <TableCell style={{ backgroundColor: hoogIsBlauw[2] }}>Gemiddeld</TableCell>
            <TableCell>Tot een halve standaarddeviatie onder of boven het stedelijk gemiddelde</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ backgroundColor: hoogIsGroen[3] }}>Slechter dan gemiddeld</TableCell>
            <TableCell style={{ backgroundColor: hoogIsBlauw[3] }}>Minder dan gemiddeld</TableCell>
            <TableCell>&nbsp;</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ backgroundColor: hoogIsGroen[4], color: "#ffffff" }}>
              Veel slechter dan gemiddeld
            </TableCell>
            <TableCell style={{ backgroundColor: hoogIsBlauw[4], color: "#ffffff" }}>
              Veel minder dan gemiddeld
            </TableCell>
            <TableCell>Minstens 1 standaarddeviatie onder of boven het stedelijk gemiddelde</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Zwarte streep</TableCell>
            <TableCell>Amsterdams gemiddelde</TableCell>
          </TableRow>
        </TableBody>
      </SmallTable>
    </LegendWrapper>
  );
};

export default ColorLegend;
