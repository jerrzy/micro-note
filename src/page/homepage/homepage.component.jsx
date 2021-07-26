import React from "react";
import { connect } from "react-redux";

import NoteCollectionsPreview from "../../component/note-collections-preview/note-collections-preview.component";
import NotesPreview from "../../component/notes-preview/notes-preview.component";
import NoteDetail from "../../component/note-detail/note-detail.component";
import WithSpinner from "../../component/with-spinner/with-spinner.component";

import { fetchNoteCollectionsStart } from "../../redux/note-collections/note-collections.action";

import {
  HomePageContainer,
  NoteCollectionsContainer,
  NotesContainer,
  NoteDetailContainer,
} from "./homepage.component.styles";

const NoteCollectionsPreviewWithSpinner = WithSpinner(NoteCollectionsPreview);

class HomePage extends React.Component {
  componentDidMount() {
    const { fetchNoteCollectionsStart } = this.props;
    fetchNoteCollectionsStart();
  }

  render() {
    return (
      <HomePageContainer>
        <NoteCollectionsContainer>
          <NoteCollectionsPreviewWithSpinner {...this.props} />
        </NoteCollectionsContainer>
        <NotesContainer>
          <NotesPreview />
        </NotesContainer>
        <NoteDetailContainer>
          <NoteDetail />
        </NoteDetailContainer>
      </HomePageContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.noteCollections.isFetching,
});
const mapDispatchToProps = (dispatch) => ({
  fetchNoteCollectionsStart: () => dispatch(fetchNoteCollectionsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
