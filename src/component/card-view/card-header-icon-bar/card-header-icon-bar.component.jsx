import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconBar } from "./card-header-icon-bar.styles";

const CardHeaderIconBar = ({ handleUpdate, handleDelete }) => {
  return (
    <IconBar>
      {handleUpdate ? (
        <FontAwesomeIcon icon={["far", "edit"]} onClick={handleUpdate} />
      ) : null}
      {handleDelete ? (
        <FontAwesomeIcon icon={["far", "trash-alt"]} onClick={handleDelete} />
      ) : null}
    </IconBar>
  );
};

export default CardHeaderIconBar;
