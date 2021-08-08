import styled from "styled-components";
import { PinIcon } from "../card-header-icon-bar/card-header-icon-bar.styles";

export const TitleContainer = styled.div`
  cursor: pointer;
  width: 100%;

  & * {
    margin: 0;
  }
`;

export const PinIconContainer = styled(PinIcon)`
  float: right;
`;
