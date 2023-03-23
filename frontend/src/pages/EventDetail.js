import { useRouteLoaderData, json } from "react-router-dom";
import EventItem from "../components/EventItem";

const EventDetailPage = () => {
  const data = useRouteLoaderData("event-detail"); //must follow id defined in route
  // const params = useParams();
  //field's name must follow what we define in LinkParameter
  return <EventItem event={data.event} />;
};

export default EventDetailPage;

export async function loader({ request, params }) {
  const id = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected event." },
      {
        status: 500,
      }
    );
  } else {
    return response;
  }

  //ALT-WAY: react-router dom automaitcally waits for fetch, so can return directly
  // return  fetch("http://localhost:3000/events/" + id);
}
