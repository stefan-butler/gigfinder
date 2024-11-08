import React, { useContext, useEffect, useState } from "react";
import './events-list-page.css';
import EventCard from "../../components/event-card/event-card";
import { LocationContext } from "../../context/location-context";
import ScaleLoader from "react-spinners/ScaleLoader";
// events map import 

function EventsListPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { location } = useContext(LocationContext);

  //fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3001/api/events?lat=${location.latitude}&long=${location.longitude}`);
        const data = await response.json();
        console.log(data.events);
        setEvents(data.events);
        
      } catch (error) {
        console.error('error fetching events:  ', error);
      } finally {
        setLoading(false);
      }
    }
    if (location.latitude && location.longitude) fetchEvents();
  }, [location]);


  //add to favourites

  return (
    // NAVBAR
    <div className="events-list-page">
      {loading ? (
        <ScaleLoader />
      ) : (
        <div className="events-list-container">
          {events.length > 0 ? (
            events.map((event) => (
              <EventCard key={event.id} event={event} /> // Render EventCard for each event
            ))
          ) : (
            <p>No events found.</p>
          )}
        </div>
      )}
      {/* Insert map component here */}
    </div>
  );
        }

export default EventsListPage;