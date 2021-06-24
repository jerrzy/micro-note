import React from "react";
import { Card, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  selectNoteCollection,
  editNoteCollectionStart,
  deleteNoteCollectionSendRequest,
} from "../../redux/note-collection-crud/note-collection-crud.action";
import { fetchNotesStart } from "../../redux/notes/notes.action";

import {
  NoteCollectionNameContainer,
  NoteCollectionCreatedDays,
  NoteCollectionIconBar,
} from "./note-collections-preview.component.styles";
import { getDaysFromToday } from "../../utils/date.util";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class NoteCollectionsPreview extends React.Component {
  handleSelection = (event) => {
    const selectedNoteCollectionId = event.target.id;
    const selectedNoteCollections = this.props.noteCollections.filter(
      (noteCollection) => noteCollection.id === selectedNoteCollectionId
    );
    const selectedNoteCollection = selectedNoteCollections[0];
    const { selectNoteCollection, fetchNotesInCollection, history, match } =
      this.props;
    history.push(`${match.path}/${selectedNoteCollection.id}`);
    selectNoteCollection(selectedNoteCollection);
    fetchNotesInCollection(selectedNoteCollection);
  };

  render() {
    const {
      noteCollections,
      selectedNoteCollection,
      editNoteCollectionStart,
      deleteNoteCollectionSendRequest,
    } = this.props;
    if (noteCollections.length === 0) {
      return (
        <Alert variant="info">
          No Note Collections yet. Please click "New Collection" to start.
        </Alert>
      );
    } else {
      return noteCollections.map(({ id, name, description, createDate }) => {
        const style = {
          bg: "light",
          text: "dark",
        };
        if (selectedNoteCollection && selectedNoteCollection.id === id) {
          style.bg = "success";
          style.text = "white";
        }
        const daysCreated = getDaysFromToday(createDate);
        return (
          <Card key={id} bg={style.bg} text={style.text} className="mb-2">
            <Card.Header>
              <NoteCollectionNameContainer
                id={id}
                onClick={this.handleSelection}
              >
                {name}
              </NoteCollectionNameContainer>

              <NoteCollectionCreatedDays>
                {daysCreated === 0
                  ? "Created today"
                  : `Created ${daysCreated} ${
                      daysCreated > 1 ? "days" : "day"
                    } ago`}
              </NoteCollectionCreatedDays>
              {selectedNoteCollection && selectedNoteCollection.id === id ? (
                <NoteCollectionIconBar>
                  <FontAwesomeIcon
                    icon={["far", "edit"]}
                    onClick={editNoteCollectionStart}
                  />
                  <FontAwesomeIcon
                    icon={["far", "trash-alt"]}
                    onClick={() =>
                      deleteNoteCollectionSendRequest(selectedNoteCollection)
                    }
                  />
                </NoteCollectionIconBar>
              ) : null}
            </Card.Header>
            <Card.Body>
              <Card.Text>{description}</Card.Text>
            </Card.Body>
          </Card>
        );
      });
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  selectNoteCollection: (selectedNoteCollection) =>
    dispatch(selectNoteCollection(selectedNoteCollection)),
  fetchNotesInCollection: (selectedNoteCollection) =>
    dispatch(fetchNotesStart(selectedNoteCollection)),
  // pre-selecting a collection is not needed for editing
  editNoteCollectionStart: () => dispatch(editNoteCollectionStart()),
  deleteNoteCollectionSendRequest: (selectedNoteCollection) =>
    dispatch(deleteNoteCollectionSendRequest(selectedNoteCollection)),
});

const mapStateToProps = (state) => {
  return {
    noteCollections: state.noteCollections.noteCollections,
    selectedNoteCollection: state.noteCollectionCRUD.selectedNoteCollection,
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NoteCollectionsPreview)
);
