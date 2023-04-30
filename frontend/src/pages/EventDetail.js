import { Suspense } from "react";
import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { getAuthToken } from "../util/auth";

const EventDetailPage = () => {
  const { event, events } = useRouteLoaderData("event-detail"); //must follow id defined in route
  // const params = useParams();
  //field's name must follow what we define in LinkParameter
  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading ...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ alignItems: "center" }}>Loading ...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
};

export default EventDetailPage;

async function loadEvent(id) {
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected event." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json(); //must await and parse if using 'defer()'
    return resData.event;
  }
}

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

export async function loader({ request, params }) {
  const id = params.eventId;
  return defer({
    event: await loadEvent(id), //await here let single event laod 1st before navigate page
    events: loadEvents(), //loads after page loads
  });

  //ALT-WAY: react-router dom automaitcally waits for fetch, so can return directly
  // return  fetch("http://localhost:3000/events/" + id);
}

export const action = async ({ params, request }) => {
  const eventId = params.eventId;

  const token = getAuthToken();
  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: request.method, //dynamic way to get 'DELETE'
    headers: {
      "Authorization" : "Bearer " + token, //backend expects it
    },
  });
  if (!response.ok) {
    throw json(
      { message: "Could not delete event." },
      {
        status: 500,
      }
    );
  }
  return redirect("/events");
};
