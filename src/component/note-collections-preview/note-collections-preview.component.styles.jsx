import styled from "styled-components";

export const NoteCollectionNameContainer = styled.span`
  display: block;
  cursor: pointer;
  font-weight: bolder;
`;

export const NoteCollectionCreatedDays = styled.span`
  display: block;
  font-size: 0.75em;
  padding-top: 3px;
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

export const NoteCollectionDetailContainer = styled.div`
  display: block;
  float: right;
`;
