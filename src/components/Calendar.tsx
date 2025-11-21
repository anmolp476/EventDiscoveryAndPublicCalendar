import React from "react";
import FullCalendar from "@fullcalendar/react";
import { type EventInput } from "@fullcalendar/core"
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { type Event, events } from "../types/events"

const Calendar: React.FC = () => {
    const formattedEvents: EventInput[] = events.map((event: Event) => ({
        id: event.id.toString(),
        title: event.title,
        start: event.date,
        ...(event.end && {end: event.end}),
        allDay: true, 
        extendedProps: {
            description: event.description,
            location: event.location, 
            organization: event.organization, 
            category: event.category,
            ...(event.cateringSelected && {cateringSelected: event.cateringSelected}),
            ...(event.additionalResources && {additionalResources: event.additionalResources}),
            ...(event.bookedAt && {bookedAt: event.bookedAt}),
            ...(event.projectorNum && {projectorNum: event.projectorNum}),
            ...(event.micNum && {micNum: event.micNum}),
            ...(event.status && {status: event.status}),
        }
    }));
    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay"
            }}
            events={formattedEvents}
            eventClick={(info) => {
            // Display extra info when an event is clicked
            alert(`
                Title: ${info.event.title}
                Description: ${info.event.extendedProps?.description ?? "N/A"}
                Location: ${info.event.extendedProps?.location ?? "N/A"}
                Organization: ${info.event.extendedProps?.organization ?? "N/A"}
                Status: ${info.event.extendedProps?.status ?? "N/A"}
                Additional Resources: ${info.event.extendedProps?.additionalResources ?? "N/A"}
                Catering Selected: ${info.event.extendedProps?.cateringSelected ?? "N/A"}
                Mic(s): ${info.event.extendedProps?.micNum ?? "N/A"}
                Projector(s): ${info.event.extendedProps?.projectorNum ?? "N/A"}
                Booked At: ${info.event.extendedProps?.bookedAt ?? "N/A"}
            `);
            }}
        />
    );
}

export default Calendar;