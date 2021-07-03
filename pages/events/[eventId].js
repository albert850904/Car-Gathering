import Head from "next/Head";
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/error-alert/error-alert";
import Comments from "../../components/input/comments";

function EventDetail(props) {
  const { selectedEvent } = props;

  if (!selectedEvent)
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  return (
    <>
      <Head>
        <title>{selectedEvent.title}</title>
        <meta name="description" content={selectedEvent.description} />
      </Head>
      <EventSummary title={selectedEvent.title} />
      <EventLogistics
        date={selectedEvent.date}
        address={selectedEvent.location}
        image={selectedEvent.image}
        imageAlt={selectedEvent.imageAlt}
      />
      <EventContent>
        <p>{selectedEvent.description}</p>
      </EventContent>
      <Comments eventId={selectedEvent.id} />
    </>
  );
}

export async function getStaticPaths() {
  const res = await getFeaturedEvents();
  const paths = res.map((data) => ({ params: { eventId: data.id } }));
  return {
    paths,
    fallback: true, // 因為現在只有pre render feature events
  };
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const res = await getEventById(eventId);
  return {
    props: {
      selectedEvent: res,
    },
    revalidate: 600,
  };
}

export default EventDetail;
