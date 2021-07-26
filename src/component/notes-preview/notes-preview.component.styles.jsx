import styled from "styled-components";
import { Card } from "react-bootstrap";

export const NoteTitleContainer = styled.span`
  display: inline-block;
  cursor: pointer;
  width: 100%;
`;

export const NoteCreatedDays = styled.span`
  font-size: 0.75em;
  padding-top: 3px;
  float: right;
`;

export const NoteIconBar = styled.span`
  font-size: 0.75em;
  padding-top: 3px;
  float: right;

  & > * {
    margin: 0 5px;
    cursor: pointer;
  }
`;

export const CardBodyContainer = styled(Card.Body)`
  max-height: 150px;
  overflow: hidden;
`;
