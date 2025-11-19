import type { Event } from "../types/events";

interface EventListProps {
  events: Event[];
}

export default function EventList({ events }: EventListProps) {
    if (events.length === 0) {
        return <p>No events found.</p>;
    }

    return (
        <ul>
            {events.map((ev) => (
                <li key={ev.id} style={{ marginBottom: "10px" }}>
                    <strong>{ev.title}</strong> ({ev.category}) <br />
                    {ev.date} – {ev.location} – {ev.organization}
                    <br />
                    <span>{ev.description}</span>
                    <br />
                    <span>Catering Selected: </span>
                    <span>{ev.cateringSelected ? "True" : "False"}</span>
                </li> 
            ))}
        </ul>
    );
}