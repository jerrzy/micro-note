import React from "react";
import { connect } from "react-redux";
import {
  cancelNote,
  addNoteRequest,
  updateNoteRequest,
} from "../../redux/notes/notes.action";

import { Button, Modal, Form } from "react-bootstrap";

import MUIEditor, {
  MUIEditorState,
  toolbarControlTypes,
  toHTML,
} from "react-mui-draft-wysiwyg";

import { convertFromHTML, ContentState } from "draft-js";

const config = {
  editor: {
    style: {
      padding: "10px",
      height: "300px",
      overflow: "auto",
    },
  },
  toolbar: {
    controls: [
      toolbarControlTypes.bold,
      toolbarControlTypes.italic,
      toolbarControlTypes.underline,
      toolbarControlTypes.fontColor,
      toolbarControlTypes.fontBackgroundColor,
      toolbarControlTypes.fontSize,
      toolbarControlTypes.fontFamily,
    ],
  },
};

class NoteModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      editorState: null,
    };
  }

  handleSubmit = () => {
    const {
      selectedNoteCollection,
      isUpdating,
      isAdding,
      selectedNote,
      sendUpdateNoteRequest,
      sendAddNoteRequest,
    } = this.props;
    let { title, editorState } = this.state;
    const content = editorState.getCurrentContent();
    const contentHTML = toHTML(content);
    if (isUpdating) {
      if (!title) {
        title = selectedNote.title;
      }

      sendUpdateNoteRequest(
        selectedNoteCollection.id,
        selectedNote,
        title,
        contentHTML
      );
    }
    if (isAdding) {
      sendAddNoteRequest(selectedNoteCollection.id, title, contentHTML);
    }
  };

  handleEditorChange = (newState) => {
    this.setState({
      editorState: newState,
    });

    console.log("editor tiggered update");
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  getEditorState() {
    if (this.state.editorState) {
      return this.state.editorState;
    }
    const { selectedNote } = this.props;
    if (selectedNote) {
      const contentHTML = selectedNote.content;
      const blocksFromHTML = convertFromHTML(contentHTML);
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      const editorInitialState = MUIEditorState.createWithContent(
        config,
        state
      );
      return editorInitialState;
    }
    return MUIEditorState.createEmpty();
  }

  render() {
    const { selectedNote, isUpdating, isAdding, errorMessage, cancelAddNote } =
      this.props;
    const showModal = isUpdating || isAdding;
    return (
      <div>
        <Modal
          dialogClassName="modal-lg"
          backdrop="static"
          show={showModal}
          onHide={() => {
            this.setState({
              editorState: null,
            });
            cancelAddNote();
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {isUpdating ? "Edit selected" : "Create new"} Note
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {errorMessage ? (
              <Form.Text className="text-danger">{errorMessage}</Form.Text>
            ) : null}

            <Form.Group controlId="formBasicName">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                defaultValue={selectedNote ? selectedNote.title : ""}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicDescription">
              <Form.Label>Content</Form.Label>
              <MUIEditor
                editorState={this.getEditorState()}
                onChange={this.handleEditorChange}
                config={config}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleSubmit}>
              {isUpdating ? "Edit" : "Create"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  selectedNoteCollection: state.noteCollectionCRUD.selectedNoteCollection,
  isUpdating: state.notes.isUpdating,
  isAdding: state.notes.isAdding,
  selectedNote: state.notes.selectedNote,
  errorMessage: state.notes.errorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  cancelAddNote: () => dispatch(cancelNote()),
  sendAddNoteRequest: (selectedNoteCollectionId, title, content) =>
    dispatch(addNoteRequest(selectedNoteCollectionId, title, content)),
  sendUpdateNoteRequest: (
    selectedNoteCollectionId,
    note,
    newTitle,
    newContent
  ) =>
    dispatch(
      updateNoteRequest(selectedNoteCollectionId, note, newTitle, newContent)
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteModal);
