import { connect } from "react-redux";

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
} from "./header.component.styles";
import { ReactComponent as Logo } from "../../assets/crown.svg";

import NoteCollectionModal from "../note-collection-modal/note-collection-modal.component";
import NoteModal from "../note-modal/note-modal.component";
import { signOutStart } from "../../redux/user/user.actions";
import {
  addNoteCollectionStart,
  editNoteCollectionStart,
} from "../../redux/note-collection-crud/note-collection-crud.action";

import { addNoteStart } from "../../redux/notes/notes.action";

const Header = ({
  currentUser,
  selectedNoteCollection,
  signOutStart,
  addNoteCollectionStart,
  editNoteCollectionStart,
  addNoteStart,
}) => {
  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo />
      </LogoContainer>
      {currentUser ? (
        <OptionsContainer>
          <OptionLink to="/home">Collections</OptionLink>
          <OptionLink onClick={addNoteCollectionStart}>
            New Collection
          </OptionLink>
          {selectedNoteCollection ? (
            <>
              <OptionLink onClick={addNoteStart}>New Note</OptionLink>
            </>
          ) : null}

          <OptionLink as="div" onClick={signOutStart}>
            Sign Out
          </OptionLink>
          <OptionLink>Welcom {currentUser.display_name}</OptionLink>
        </OptionsContainer>
      ) : (
        <OptionsContainer>
          <OptionLink to="/login">Sign In</OptionLink>
        </OptionsContainer>
      )}
      <NoteCollectionModal />
      <NoteModal />
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
  addNoteStart: () => dispatch(addNoteStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
