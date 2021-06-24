import React from "react";
import { connect } from "react-redux";
import {
  addNoteCollectionSendRequest,
  noteCollectionCRUDCancel,
  editNoteCollectionSendRequest,
} from "../../redux/note-collection-crud/note-collection-crud.action";

import { Button, Modal, Form } from "react-bootstrap";

class NoteCollectionModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
    };
  }

  handleSubmit = () => {
    const { isEditing } = this.props;
    let { name, description } = this.state;
    if (isEditing) {
      const { selectedNoteCollection, sendEditNoteCollectionRequest } =
        this.props;
      if (!name) {
        name = selectedNoteCollection.name;
      }
      if (!description) {
        description = selectedNoteCollection.description;
      }
      sendEditNoteCollectionRequest(selectedNoteCollection, name, description);
    } else {
      const { sendAddNoteCollectionRequest } = this.props;
      sendAddNoteCollectionRequest(name, description);
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      selectedNoteCollection,
      isEditing,
      showModal,
      errorMessage,
      noteCollectionCRUDCancel,
    } = this.props;
    return (
      <div>
        <Modal
          backdrop="static"
          show={showModal}
          onHide={noteCollectionCRUDCancel}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {isEditing ? "Edit selected" : "Create new"} Note Collection
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {errorMessage ? (
              <Form.Text className="text-danger">{errorMessage}</Form.Text>
            ) : null}

            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                defaultValue={
                  selectedNoteCollection ? selectedNoteCollection.name : ""
                }
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                defaultValue={
                  selectedNoteCollection
                    ? selectedNoteCollection.description
                    : ""
                }
                onChange={this.handleChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleSubmit}>
              {isEditing ? "Edit" : "Create"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isEditing: state.noteCollectionCRUD.isEditing,
  showModal: state.noteCollectionCRUD.showModal,
  selectedNoteCollection: state.noteCollectionCRUD.selectedNoteCollection,
  errorMessage: state.noteCollectionCRUD.errorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  noteCollectionCRUDCancel: () => dispatch(noteCollectionCRUDCancel()),
  sendAddNoteCollectionRequest: (name, description) =>
    dispatch(addNoteCollectionSendRequest({ name, description })),
  sendEditNoteCollectionRequest: (
    selectedNoteCollection,
    newName,
    newDescription
  ) =>
    dispatch(
      editNoteCollectionSendRequest(
        selectedNoteCollection,
        newName,
        newDescription
      )
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteCollectionModal);
