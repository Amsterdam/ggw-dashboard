import styled from "styled-components";
import { themeSpacing, themeColor, Heading } from "@amsterdam/asc-ui";

const HeadingDiv = styled.div`
  background-color: ${themeColor("tint", "level2")};
  padding-left: ${themeSpacing(2)};
  padding-right: ${themeSpacing(2)};
  padding-top: ${themeSpacing(2)};

  margin-top: ${themeSpacing(10)};
  margin-bottom: ${themeSpacing(4)};

  width: 100%;
`;

const HeaderRow = ({ title }: { title: string }) => {
  return (
    <HeadingDiv>
      <Heading as="h2">{title}</Heading>
    </HeadingDiv>
  );
};

export default HeaderRow;
