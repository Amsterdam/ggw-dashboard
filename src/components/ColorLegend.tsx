import { Heading, TableBody, TableCell, TableHeader, TableRow } from "@amsterdam/asc-ui";
import { SmallTable } from "./tables/SmallTable";
// import kleurencodetabel from "../static/kleurcodetabel.json";

const ColorLegend = () => {
  // const labelsLeft = kleurencodetabel;

  return (
    <div>
      <Heading as="h4">Betekenis kleuren</Heading>

      <SmallTable>
        <TableHeader>
          <TableRow>
            <TableCell></TableCell>
          </TableRow>
        </TableHeader>
        <TableBody></TableBody>
      </SmallTable>
    </div>
  );
};

export default ColorLegend;
