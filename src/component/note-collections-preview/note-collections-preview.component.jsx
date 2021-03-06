import React from "react";
import { Card, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  selectNoteCollection,
  editNoteCollectionStart,
  deleteNoteCollectionSendRequest,
  pinSelectedNoteCollection,
  unpinSelectedNoteCollection,
} from "../../redux/note-collection-crud/note-collection-crud.action";
import { fetchNotesStart } from "../../redux/notes/notes.action";

import CardHeaderDatesTile from "../card-view/card-header-dates-tile/card-header-dates-tile.component";
import SelectableCard from "../card-view/selectable-card/selectable-card.component";
import CardHeaderIconBar from "../card-view/card-header-icon-bar/card-header-icon-bar.component";

class NoteCollectionsPreview extends React.Component {
  handleSelection = (objectId) => {
    // const selectedNoteCollectionId = event.target.id;
    const selectedNoteCollections = this.props.noteCollections.filter(
      (noteCollection) => noteCollection.id === objectId
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
      pinSelectedNoteCollection,
      unpinSelectedNoteCollection,
    } = this.props;
    if (noteCollections.length === 0) {
      return (
        <Alert variant="info">
          No Note Collections yet. Please click "New Collection" to start.
        </Alert>
      );
    } else {
      return noteCollections.map(
        ({ id, name, description, createDate, updateDate, isPinned }) => {
          return (
            <SelectableCard
              isSelected={
                selectedNoteCollection && selectedNoteCollection.id === id
              }
              id={id}
              title={name}
              isPinned={isPinned}
              handleSelect={this.handleSelection}
              headerComponents={
                <>
                  <CardHeaderDatesTile
                    createDate={createDate}
                    updateDate={updateDate}
                  />
                  {selectedNoteCollection &&
                  selectedNoteCollection.id === id ? (
                    <CardHeaderIconBar
                      handleDelete={() =>
                        deleteNoteCollectionSendRequest(selectedNoteCollection)
                      }
                      handleUpdate={editNoteCollectionStart}
                      handlePin={() =>
                        pinSelectedNoteCollection(selectedNoteCollection)
                      }
                      handleUnPin={() =>
                        unpinSelectedNoteCollection(selectedNoteCollection)
                      }
                      isPinned={isPinned}
                    />
                  ) : null}
                </>
              }
            >
              <Card.Body>
                <Card.Text>{description}</Card.Text>
              </Card.Body>
            </SelectableCard>
          );
        }
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  selectNoteCollection: (selectedNoteCollection) =>
    dispatch(selectNoteCollection(selectedNoteCollection)),
  fetchNotesInCollection: (selectedNoteCollection) =>
    dispatch(fetchNotesStart(selectedNoteCollection)),
  editNoteCollectionStart: () => dispatch(editNoteCollectionStart()),
  deleteNoteCollectionSendRequest: (selectedNoteCollection) =>
    dispatch(deleteNoteCollectionSendRequest(selectedNoteCollection)),
  pinSelectedNoteCollection: (selectedNoteCollection) =>
    dispatch(pinSelectedNoteCollection(selectedNoteCollection)),
  unpinSelectedNoteCollection: (selectedNoteCollection) =>
    dispatch(unpinSelectedNoteCollection(selectedNoteCollection)),
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
