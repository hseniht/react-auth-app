import { Suspense } from "react";
import { Await, defer, json, useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

function EventsPage() {
  // const data = useLoaderData();
  const { events } = useLoaderData();

  //ALT WAY: for error
  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }
  // const events = data.events;
  // return <EventsList events={events} />;

    /* <Await> will return function once promise resolve */
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading ...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
    //   status: 500,
    // });
    throw json({ message: "Could not fetch events." }, { status: 500 });
    //ALT WAY: for error
    // return { isError: true, message: "Could not fetch events" };
  } else {
    const resData = await response.json(); //must await and parse if using 'defer()'
    // return response;
    return resData.events;
  }
}

// Note: loader functions is not a react component, so no hooks, and states
// However,this executes in the browser, so we can use browser API's
export function loader() {
  return defer({
    events: loadEvents(), //returns value
  });
}
