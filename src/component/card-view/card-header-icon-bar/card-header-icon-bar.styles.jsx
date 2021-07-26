import styled from "styled-components";

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
