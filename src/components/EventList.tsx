import type { Event } from "../types/events";

interface EventListProps {
  events: Event[];
}

export default function EventList({ events }: EventListProps) {
    if (events.length === 0) {
        return <p>No events found.</p>;
    }

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          maxWidth: "900px",
          height: "500px",
          overflow: "scroll",
        }}
      >
        <ul>
          {events.map((ev) => (
            <li key={ev.id} style={{ marginBottom: "10px" }}>
              <strong>{ev.title}</strong> ({ev.category}) <br />
              {ev.date} {ev.location && `– ${ev.location}`}{" "}
              {ev.organization && `– ${ev.organization}`}
              <br />
              {ev.description && <span>{ev.description}</span>}
              <br />
              {ev.status && (
                <>
                  <span>Status: </span>
                  <span>{ev.status}</span>
                  <br />
                </>
              )}
              {ev.additionalResources && (
                <>
                  <span>Additional Resources: </span>
                  <span>{ev.additionalResources}</span>
                  <br />
                </>
              )}
              {typeof ev.cateringSelected !== "undefined" && (
                <>
                  <span>Catering Selected: </span>
                  <span>{ev.cateringSelected ? "Yes" : "No"}</span>
                  <br />
                </>
              )}
              {ev.micNum && (
                <>
                  <span>Mic(s): </span>
                  <span>{ev.micNum}</span>
                  <br />
                </>
              )}
              {ev.projectorNum && (
                <>
                  <span>Projector(s): </span>
                  <span>{ev.projectorNum}</span>
                  <br />
                </>
              )}
              {ev.bookedAt && (
                <>
                  <span>Booked At: </span>
                  <span>{new Date(ev.bookedAt).toLocaleString()}</span>
                  <br />
                </>
              )}
              {ev.end && (
                <>
                  <span>End Date: </span>
                  <span>{new Date(ev.end).toLocaleString()}</span>
                  <br />
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
}