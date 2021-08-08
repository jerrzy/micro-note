import { DropdownButton, Dropdown } from "react-bootstrap";

const EmojiPicker = () => {
  return (
    <DropdownButton title="Emoji">
      <Dropdown.Item>{String.fromCodePoint(0x1f354)}</Dropdown.Item>
    </DropdownButton>
  );
};

export default EmojiPicker;
