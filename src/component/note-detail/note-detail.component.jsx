import { connect } from "react-redux";
import { Alert, Card } from "react-bootstrap";

import CardHeaderDatesTile from "../card-view/card-header-dates-tile/card-header-dates-tile.component";
import CardHeaderIconBar from "../card-view/card-header-icon-bar/card-header-icon-bar.component";

import {
  deleteNoteRequest,
  updateNoteStart,
} from "../../redux/notes/notes.action";

import parse from "html-react-parser";

// import NoteDetailBG from "../../assets/bg1.png";

const NoteDetail = ({
  selectedNote,
  selectedNoteCollection,
  deleteNoteRequest,
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
          handleDelete={() =>
            deleteNoteRequest(selectedNoteCollection.id, selectedNote.id)
          }
          handleUpdate={null}
        />
      </Card.Header>
      <Card.Body>{parse(selectedNote.content)}</Card.Body>
    </Card>
  ) : (
    <Alert variant="info">Please select a Note.</Alert>
  );
};

const mapStateToProps = (state) => ({
  selectedNoteCollection: state.noteCollectionCRUD.selectedNoteCollection,
  selectedNote: state.notes.selectedNote,
});

const mapDispatchToProps = (dispatch) => ({
  deleteNoteRequest: (selectedNoteCollection, selectedNoteId) =>
    dispatch(deleteNoteRequest(selectedNoteCollection, selectedNoteId)),
  updateNoteStart: (note) => dispatch(updateNoteStart(note)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteDetail);
