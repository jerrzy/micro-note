import styled from "styled-components";

export const NoteCollectionNameContainer = styled.span`
  display: inline-block;
  width: 60%;
  cursor: pointer;
  font-weight: bolder;
`;

export const NoteCollectionCreatedDays = styled.span`
  font-size: 0.75em;
  padding-top: 3px;
  float: right;
`;

export const NoteCollectionIconBar = styled.span`
  font-size: 0.75em;
  padding-top: 3px;
  float: right;

  & > * {
    margin: 0 5px;
    cursor: pointer;
  }
`;
