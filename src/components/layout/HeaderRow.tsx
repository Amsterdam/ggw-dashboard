import styled from "styled-components";
import { themeSpacing, themeColor } from "@amsterdam/asc-ui";

const HeadingDiv = styled.div`
  background-color: ${themeColor("tint", "level2")};
  padding-left: ${themeSpacing(2)};
  padding-right: ${themeSpacing(2)};

  margin-top: ${themeSpacing(10)};
  margin-bottom: ${themeSpacing(4)};

  width: 100%;
`;

const HeaderRow = ({ title }: { title: string }) => {
  return (
    <HeadingDiv>
      <h2>{title}</h2>
    </HeadingDiv>
  );
};

export default HeaderRow;
