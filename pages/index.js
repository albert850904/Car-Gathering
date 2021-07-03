import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../helpers/api-util";
import NewsletterRegistration from "../components/input/newsletter-registration";

export default function Home(props) {
  const { featuredEvents } = props;
  return (
    <div>
      <Head>
        <title>Nextjs Car event</title>
        <meta name="description" content="find your closest car events" />
      </Head>
      <NewsletterRegistration />
      <EventList list={featuredEvents} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents,
    },
    revalidate: 1800,
  };
  // const filePath = path.join(process.cwd(), "data", "dummy-backend");
  // current working directory >> 會是overall project folder (因為next 會把所有file當作是在root下面)
  // data 是 data directory, dummy-backend為取用file name
}
