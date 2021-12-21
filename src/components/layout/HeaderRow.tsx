import styled from "styled-components";
import { themeSpacing, themeColor, Heading } from "@amsterdam/asc-ui";
import Modal from "../Modal";
import { useState } from "react";
import ColorLegend from "../ColorLegend";
import { LinkButton } from "../Button";

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
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <HeadingDiv>
        <Heading as="h2">
          {title}
          <LinkButton onClick={() => setShowModal(true)}>Kleuren</LinkButton>
        </Heading>
      </HeadingDiv>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <ColorLegend />
      </Modal>
    </>
  );
};

export default HeaderRow;
