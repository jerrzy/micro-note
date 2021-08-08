import { connect } from "react-redux";

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
} from "./header.component.styles";
import { ReactComponent as Logo } from "../../assets/crown.svg";

import NoteCollectionModal from "../note-collection-modal/note-collection-modal.component";
import { signOutStart } from "../../redux/user/user.actions";
import {
  addNoteCollectionStart,
  editNoteCollectionStart,
} from "../../redux/note-collection-crud/note-collection-crud.action";

import { addNoteRequest } from "../../redux/notes/notes.action";

const Header = ({
  currentUser,
  selectedNoteCollection,
  signOutStart,
  addNoteCollectionStart,
  addNoteRequest,
}) => {
  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo />
      </LogoContainer>
      {currentUser ? (
        <OptionsContainer>
          <OptionLink onClick={addNoteCollectionStart}>
            New Collection
          </OptionLink>
          {selectedNoteCollection ? (
            <>
              <OptionLink
                onClick={() => addNoteRequest(selectedNoteCollection.id)}
              >
                New Note {String.fromCodePoint(0x1f354)}
              </OptionLink>
            </>
          ) : null}

          <OptionLink as="div" onClick={signOutStart}>
            Sign Out
          </OptionLink>
          <span className="mr-2">Welcom {currentUser.display_name}</span>
          <span>[{process.env.NODE_ENV}]</span>
        </OptionsContainer>
      ) : (
        <OptionsContainer>
          <OptionLink to="/login">Sign In</OptionLink>
        </OptionsContainer>
      )}
      <NoteCollectionModal />
    </HeaderContainer>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.user.currentUser,
    selectedNoteCollection: state.noteCollectionCRUD.selectedNoteCollection,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
  addNoteCollectionStart: () => dispatch(addNoteCollectionStart()),
  editNoteCollectionStart: () => dispatch(editNoteCollectionStart()),
  addNoteRequest: (selectedNoteCollectionId) =>
    dispatch(addNoteRequest(selectedNoteCollectionId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
