import styled from "styled-components";
import { Table } from "@amsterdam/asc-ui";

export const SmallTable = styled(Table)`
  padding-right: 0;
  border-bottom: 2px solid black;
  font-size: 16px;

  @media print {
    break-before: avoid;
    break-after: avoid;
    break-inside: avoid-page;

    box-decoration-break: clone;
  }
`;
