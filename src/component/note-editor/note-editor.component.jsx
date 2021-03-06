import { useState } from "react";
import { connect } from "react-redux";

import RichEditor from "../card-view/rich-editor/rich-editor.component";

import { Form, Button } from "react-bootstrap";

import { editNoteRequest, cancelNote } from "../../redux/notes/notes.action";

import EmojiPicker from "../card-view/emoji/emoji-picker.component";

const NoteEditor = ({
  selectedNoteCollection,
  selectedNote,
  errorMessage,
  requestUpdateNote,
  cancelUpdateNote,
}) => {
  const [title, setTitle] = useState(selectedNote.title);
  const [contentHTML, setContentHTML] = useState(selectedNote.content);

  return (
    <Form>
      {errorMessage ? (
        <Form.Text className="text-danger font-weight-bold">
          {errorMessage}
        </Form.Text>
      ) : null}
      <Form.Label className="m-2 font-weight-bold">New Title</Form.Label>
      <RichEditor contentHTML={title} onChange={setTitle} />

      {/* <Form.Control
        className="m-2"
        type="text"
        name="title"
        defaultValue={title}
        onChange={(event) => setTitle(event.target.value)}
      /> */}
      {/* <EmojiPicker></EmojiPicker> */}
      <Form.Label className="m-2 font-weight-bold">New Content</Form.Label>
      <RichEditor contentHTML={contentHTML} onChange={setContentHTML} />
      <Button
        className="m-2"
        size="sm"
        variant="primary"
        onClick={() =>
          requestUpdateNote({
            noteCollectionId: selectedNoteCollection.id,
            note: selectedNote,
            newTitle: title,
            newContent: contentHTML,
          })
        }
      >
        Update
      </Button>
      <Button className="m-2" size="sm" onClick={() => cancelUpdateNote()}>
        Cancel
      </Button>
    </Form>
  );
};

const mapStateToProps = (state) => ({
  selectedNoteCollection: state.noteCollectionCRUD.selectedNoteCollection,
  selectedNote: state.notes.selectedNote,
  errorMessage: state.notes.errorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  requestUpdateNote: (noteCollectionId, note, newTitle, newContent) =>
    dispatch(editNoteRequest(noteCollectionId, note, newTitle, newContent)),
  cancelUpdateNote: () => dispatch(cancelNote()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteEditor);
