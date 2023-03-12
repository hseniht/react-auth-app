import { useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

function EventsPage() {
  const data = useLoaderData();

  //ALT WAY: for error
  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }
  const events = data.events;
  return <EventsList events={events} />;
}

export default EventsPage;

// Note: loader functions is not a react component, so no hooks, and states
// However,this executes in the browser, so we can use browser API's
export async function loader() {
  const response = await fetch("http://localhost:8080/events1");

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
      status: 500,
    });
    //ALT WAY: for error
    // return { isError: true, message: "Could not fetch events" };
  } else {
    return response;
  }
}
