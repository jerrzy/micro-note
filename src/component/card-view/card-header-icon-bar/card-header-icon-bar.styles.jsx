import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const IconBar = styled.span`
  font-size: 0.75em;
  font-weight: bold;
  padding-top: 3px;
  float: right;

  & > * {
    margin: 0 5px;
    cursor: pointer;
  }
`;

export const PinIcon = styled(FontAwesomeIcon).attrs({
  icon: ["fas", "thumbtack"],
})`
  transform: rotate(45deg);
  color: red;
`;

export const UnPinIcon = styled(FontAwesomeIcon).attrs({
  icon: ["fas", "thumbtack"],
})``;
