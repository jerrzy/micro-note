import { getDaysFromToday } from "../../../utils/date.util";

import {
  NoteCollectionCreatedDays,
  NoteCollectionDetailContainer,
} from "./card-header-dates-tile.styles";

const CardHeaderDatesTile = ({ createDate, updateDate, ...props }) => {
  const daysCreated = getDaysFromToday(createDate);
  const daysUpdated = updateDate ? getDaysFromToday(updateDate) : null;
  return (
    <NoteCollectionDetailContainer>
      <NoteCollectionCreatedDays>
        {daysCreated === 0
          ? "Created today"
          : `Created ${daysCreated} ${daysCreated > 1 ? "days" : "day"} ago`}
      </NoteCollectionCreatedDays>
      <NoteCollectionCreatedDays>
        {daysUpdated !== null
          ? daysUpdated === 0
            ? "Updated today"
            : `Updated ${daysUpdated} ${daysUpdated > 1 ? "days" : "day"} ago`
          : ""}
      </NoteCollectionCreatedDays>
      {props.children}
    </NoteCollectionDetailContainer>
  );
};

export default CardHeaderDatesTile;
