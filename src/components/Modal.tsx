import styled from "styled-components";
import { Modal as ASCModal, themeSpacing } from "@amsterdam/asc-ui";

const ModalContent = styled.div`
  padding: ${themeSpacing(3)};
`;

const Modal = ({ showModal, setShowModal, children }) => {
  return (
    <ASCModal disablePortal open={showModal} backdropOpacity={0.3} onClose={() => setShowModal(false)}>
      <ModalContent>{children}</ModalContent>
    </ASCModal>
  );
};

export default Modal;
