import { connect } from "react-redux";
import { Alert, Card } from "react-bootstrap";

import CardHeaderDatesTile from "../card-view/card-header-dates-tile/card-header-dates-tile.component";
import CardHeaderIconBar from "../card-view/card-header-icon-bar/card-header-icon-bar.component";

import {
  deleteNoteRequest,
  updateNoteStart,
  editNoteStart,
} from "../../redux/notes/notes.action";

import NoteEditor from "../note-editor/note-editor.component";

import parse from "html-react-parser";

// import NoteDetailBG from "../../assets/bg1.png";

const NoteDetail = ({
  selectedNote,
  selectedNoteCollection,
  deleteNoteRequest,
  editNoteStart,
  isEditing,
}) => {
  return selectedNote ? (
    <Card key={selectedNote.id} className="mb-2">
      <Card.Header>
        {selectedNote.title}
        <CardHeaderDatesTile
          createDate={selectedNote.createDate}
          updateDate={selectedNote.updateDate}
        />
        <CardHeaderIconBar
          handleUpdate={() => editNoteStart()}
          handleDelete={() =>
            deleteNoteRequest(selectedNoteCollection.id, selectedNote.id)
          }
        />
      </Card.Header>
      {isEditing ? (
        <NoteEditor></NoteEditor>
      ) : (
        <Card.Body>{parse(selectedNote.content)}</Card.Body>
      )}
    </Card>
  ) : (
    <Alert variant="info">Please select a Note.</Alert>
  );
};

const mapStateToProps = (state) => ({
  selectedNoteCollection: state.noteCollectionCRUD.selectedNoteCollection,
  selectedNote: state.notes.selectedNote,
  isEditing: state.notes.isEditing,
});

const mapDispatchToProps = (dispatch) => ({
  deleteNoteRequest: (selectedNoteCollection, selectedNoteId) =>
    dispatch(deleteNoteRequest(selectedNoteCollection, selectedNoteId)),
  updateNoteStart: (note) => dispatch(updateNoteStart(note)),
  editNoteStart: () => dispatch(editNoteStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteDetail);
