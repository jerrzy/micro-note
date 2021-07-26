import React from "react";
import { connect } from "react-redux";
import { Alert } from "react-bootstrap";

import {
  selectNote,
  deleteNoteRequest,
  updateNoteStart,
} from "../../redux/notes/notes.action";

import CardHeaderIconBar from "../card-view/card-header-icon-bar/card-header-icon-bar.component";
import { CardBodyContainer } from "./notes-preview.component.styles";

import SelectableCard from "../card-view/selectable-card/selectable-card.component";
import CardHeaderDatesTile from "../card-view/card-header-dates-tile/card-header-dates-tile.component";

import parse from "html-react-parser";

class NotesPreview extends React.Component {
  handleUpdateNote = () => {
    const { selectedNote, updateNoteStart } = this.props;
    updateNoteStart(selectedNote);
  };

  handleSelectNote = (event) => {
    const { notes, selectNote } = this.props;
    const selectedNoteId = event.target.id;
    const selectedNote = notes.filter((note) => note.id === selectedNoteId);
    selectNote(selectedNote[0]);
  };

  render() {
    const {
      notes,
      selectedNoteCollection,
      selectedNote,
      deleteNoteRequest,
      updateNoteStart,
    } = this.props;
    if (!selectedNoteCollection) {
      return <Alert variant="info">Please select a Note Collection.</Alert>;
    }
    if (notes.length === 0) {
      return <Alert variant="info">This Collection is empty.</Alert>;
    } else {
      return notes.map((note) => {
        return (
          <SelectableCard
            isSelected={selectedNote && selectedNote.id === note.id}
            id={note.id}
            title={note.title}
            handleSelect={this.handleSelectNote}
            headerComponents={
              <>
                <CardHeaderDatesTile
                  createDate={note.createDate}
                  updateDate={note.updateDate}
                />

                {selectedNote && selectedNote.id === note.id ? (
                  <CardHeaderIconBar
                    handleDelete={() =>
                      deleteNoteRequest(
                        this.props.selectedNoteCollection.id,
                        this.props.selectedNote.id
                      )
                    }
                    handleUpdate={() => updateNoteStart(selectedNote)}
                  />
                ) : null}
              </>
            }
          >
            <CardBodyContainer>{parse(note.content)}</CardBodyContainer>
          </SelectableCard>
        );
      });
    }
  }
}

const mapStateToProps = (state) => ({
  selectedNoteCollection: state.noteCollectionCRUD.selectedNoteCollection,
  selectedNote: state.notes.selectedNote,
  notes: state.notes.notes,
});

const mapDispatchToProps = (dispatch) => ({
  selectNote: (selectedNote) => dispatch(selectNote(selectedNote)),
  deleteNoteRequest: (selectedNoteCollection, selectedNoteId) =>
    dispatch(deleteNoteRequest(selectedNoteCollection, selectedNoteId)),
  updateNoteStart: (note) => dispatch(updateNoteStart(note)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesPreview);
