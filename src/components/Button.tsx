import styled from "styled-components";

/**
 * A styleless button which can be used to make elements clickable which normally shouldnt have an onclick attribute.
 * This makes our code more accessible.
 */

const Button = styled.button`
  background: inherit;
  border: none;
  font-size: inherit;
  color: inherit;
  font-weight: inherit;
  cursor: pointer;
`;

const LinkButton = styled(Button)`
  text-decoration: underline;
  font-size: 16px;
`;

export { Button, LinkButton };
