import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconBar, UnPinIcon, PinIcon } from "./card-header-icon-bar.styles";

const CardHeaderIconBar = ({
  handleUpdate,
  handleDelete,
  handlePin,
  handleUnPin,
  isPinned,
}) => {
  return (
    <IconBar>
      {handleUpdate ? (
        <FontAwesomeIcon icon={["far", "edit"]} onClick={handleUpdate} />
      ) : null}
      {handleDelete ? (
        <FontAwesomeIcon icon={["far", "trash-alt"]} onClick={handleDelete} />
      ) : null}
      {handlePin ? (
        isPinned ? (
          <PinIcon onClick={handleUnPin} />
        ) : (
          <UnPinIcon onClick={handlePin} />
        )
      ) : null}
    </IconBar>
  );
};

export default CardHeaderIconBar;
