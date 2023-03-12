import { useParams } from "react-router-dom";

const EventDetailPage = () => {
  const params = useParams();
    //field's name must follow what we define in LinkParameter
  return (
    <>
      <h1>EventDetailPage</h1>
      <p>Event Id {params.eventId}</p>
    </>
  );
};

export default EventDetailPage;
