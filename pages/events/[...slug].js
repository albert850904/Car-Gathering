import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import useSWR from "swr";
import EventList from "../../components/events/EventList";
import ResultTitle from "../../components/results-title/results-title";
import { getFilteredEvents } from "../../helpers/api-util";
import Button from "../../components/UI/Button";
import ErrorAlert from "../../components/error-alert/error-alert";

function FilteredEventList(props) {
  // const { hasError, filteredEvents, date } = props;
  const [filteredLoadedEvents, setFilteredLoadedEvents] = useState(null);
  const router = useRouter();

  // 取得/events/ 後面的所有資訊，塞成array >> 在update lifecycle 執行，第一次
  const filterCondition = router.query.slug;

  const { data, error } = useSWR(
    "https://next-js-lesson-default-rtdb.firebaseio.com/events.json"
  );

  let pageHeadData = (
    <Head>
      <title>Nextjs Car event</title>
      <meta name="description" content="list of car events" />
    </Head>
  );

  useEffect(() => {
    if (!data) return;
    const events = [];
    for (const key in data) {
      events.push({
        id: key,
        ...data[key],
      });
    }
    setFilteredLoadedEvents(events);
  }, [data]);

  if (!filterCondition) {
    return (
      <>
        {pageHeadData}
        <p className="center">Loading...</p>
      </>
    );
  }

  const containerFilteredYear = filterCondition[0];
  const containerFilteredMonth = filterCondition[1];
  const loadedNumYear = +containerFilteredYear;
  const loadedNumMonth = +containerFilteredMonth;

  pageHeadData = (
    <Head>
      <title>Nextjs Car event</title>
      <meta
        name="description"
        content={`find your closest car events around ${loadedNumMonth}/${loadedNumYear}`}
      />
    </Head>
  );

  if (!filteredLoadedEvents) {
    return (
      <>
        {pageHeadData}
        <p className="center">Loading...</p>
      </>
    );
  }

  if (
    isNaN(loadedNumYear) ||
    isNaN(loadedNumMonth) ||
    loadedNumYear > 2030 ||
    loadedNumYear < 2021 ||
    loadedNumMonth > 12 ||
    loadedNumMonth < 1 ||
    error
  ) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid value</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </>
    );
  }

  let filteredEvents = filteredLoadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === loadedNumYear &&
      eventDate.getMonth() === loadedNumMonth - 1
    );
  });

  if (!Array.isArray(filteredEvents) || filteredEvents.length === 0) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>data not found</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </>
    );
  }

  const formatDate = new Date(loadedNumYear, loadedNumMonth - 1);

  return (
    <>
      {pageHeadData}
      <ResultTitle date={formatDate} />
      <EventList list={filteredEvents} />
    </>
  );
}
// 須考慮哪些paths要被 pre gen，這頁會有很多日期combination，
// pre gen 全部也不是好的做法 >> 可以嘗試用getServerSideProps
// 但通常不會是seaarch engine會去fetch的page，為了更快的反應也可以用clent side data fetching
// getServerSideProps不太跟client side fetching一起，getStaticProps才會一起用
// export async function getServerSideProps(context) {
//   const { params } = context;
//   const filterCondition = params.slug;

//   const filteredYear = filterCondition[0];
//   const filteredMonth = filterCondition[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   // 去handle /2021/abc/1 等異樣網址
//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth > 12 ||
//     numMonth < 1
//   ) {
//     return {
//       props: { hasError: true },
//       // notFound: true,
//       // redirect: {
//       //   destination: '/error'
//       // }
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: { filteredEvents, date: { numYear, numMonth } },
//   };
// }

export default FilteredEventList;
