import React from "react";
import { connect } from "react-redux";
import { Card, Alert } from "react-bootstrap";
import { getDaysFromToday } from "../../utils/date.util";

import {
  deleteNoteRequest,
  updateNoteStart,
} from "../../redux/notes/notes.action";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NoteIconBar, NoteCreatedDays } from "./notes-preview.component.styles";

import parse from "html-react-parser";

class NotesPreview extends React.Component {
  handleDeleteNote = (event) => {
    let noteIdToDelete = event.target.getAttribute("data-note-id");
    if (!noteIdToDelete) {
      noteIdToDelete = event.target.parentNode.getAttribute("data-note-id");
    }
    const { selectedNoteCollection, deleteNoteRequest } = this.props;
    deleteNoteRequest(selectedNoteCollection.id, noteIdToDelete);
  };

  handleUpdateNote = (event) => {
    let noteId = event.target.getAttribute("data-note-id");
    if (!noteId) {
      noteId = event.target.parentNode.getAttribute("data-note-id");
    }
    const { notes, updateNoteStart } = this.props;
    const noteToUpdate = notes.filter((note) => note.id === noteId);
    updateNoteStart(noteToUpdate[0]);
  };

  render() {
    const { notes, selectedNoteCollection } = this.props;
    if (!selectedNoteCollection) {
      return <Alert variant="info">Please select a Note Collection.</Alert>;
    }
    if (notes.length === 0) {
      return <Alert variant="info">This Collection is empty.</Alert>;
    } else {
      return notes.map((note) => {
        const daysCreated = getDaysFromToday(note.createDate);
        return (
          <Card key={note.id} className="mb-2">
            <Card.Header>
              {note.title}
              <NoteCreatedDays>
                {daysCreated === 0
                  ? "Created Today"
                  : `Created ${daysCreated} days ago`}
              </NoteCreatedDays>
              <NoteIconBar>
                <FontAwesomeIcon
                  icon={["far", "edit"]}
                  data-note-id={note.id}
                  onClick={this.handleUpdateNote}
                />
                <FontAwesomeIcon
                  icon={["far", "trash-alt"]}
                  data-note-id={note.id}
                  onClick={this.handleDeleteNote}
                />
              </NoteIconBar>
            </Card.Header>
            <Card.Body>{parse(note.content)}</Card.Body>
          </Card>
        );
      });
    }
  }
}

const mapStateToProps = (state) => ({
  selectedNoteCollection: state.noteCollectionCRUD.selectedNoteCollection,
  notes: state.notes.notes,
});

const mapDispatchToProps = (dispatch) => ({
  deleteNoteRequest: (selectedNoteCollection, selectedNoteId) =>
    dispatch(deleteNoteRequest(selectedNoteCollection, selectedNoteId)),
  updateNoteStart: (note) => dispatch(updateNoteStart(note)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesPreview);
