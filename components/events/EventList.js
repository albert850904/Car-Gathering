import EventItem from "./EventItem";
import classes from "./EventList.module.css";

function EventList(props) {
  const { list } = props;

  return (
    <ul className={classes.list}>
      {Array.isArray(list) &&
        list.map((event) => {
          return (
            <EventItem
              key={event.id}
              id={event.id}
              title={event.title}
              date={event.date}
              location={event.location}
              image={event.image}
            />
          );
        })}
    </ul>
  );
}

export default EventList;
