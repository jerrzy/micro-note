import { DropdownButton, Dropdown } from "react-bootstrap";

const EmojiPicker = () => {
  return (
    <DropdownButton title="Emoji">
      <Dropdown.Item href="#/action-1">
        {String.fromCodePoint(0x1f354)}
      </Dropdown.Item>
    </DropdownButton>
  );
};

export default EmojiPicker;
