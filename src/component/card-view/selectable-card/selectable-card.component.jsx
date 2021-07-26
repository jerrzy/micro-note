import { Card } from "react-bootstrap";

import { TitleContainer } from "./selectable-card.component.styles";

const SelectableCard = (props) => {
  const { isSelected, id, title, handleSelect } = props;
  const style = {
    bg: "light",
    text: "dark",
  };
  if (isSelected) {
    style.bg = "success";
    style.text = "white";
  }
  return (
    <Card key={id} className="mb-2" bg={style.bg} text={style.text}>
      <Card.Header>
        <TitleContainer id={id} onClick={handleSelect}>
          {title}
        </TitleContainer>
        {props.headerComponents}
      </Card.Header>
      {props.children}
    </Card>
  );
};

export default SelectableCard;
