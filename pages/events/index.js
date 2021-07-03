import { useRouter } from "next/router";
import Head from "next/head";
import { getAllEvents } from "../../helpers/api-util";
import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/EventsSearch";

function AllEventList(props) {
  const { events } = props;
  const router = useRouter();

  function findEventsHandler(year, month) {
    const path = `/events/${year}/${month}`;
    router.push(path);
  }
  // onClick={findEventsHandler.bind(function "this" keyword, params)}
  return (
    <>
      <Head>
        <title>Nextjs Car event</title>
        <meta name="description" content="find your closest car events" />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList list={events} />
    </>
  );
}

export async function getStaticProps() {
  const res = await getAllEvents();
  return {
    props: {
      events: res,
    },
    revalidate: 60,
  };
}

export default AllEventList;
