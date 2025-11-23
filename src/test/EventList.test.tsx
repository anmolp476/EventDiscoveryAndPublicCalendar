import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import EventList from "../components/EventList";
import type { Event } from "../types/events";

describe("EventList (browse & filter events)", () => {
  test("shows only events that match the filtered category", () => {
    const mockEvents: Event[] = [
      {
        id: 1,
        title: "Academic Event",
        category: "academic",
        date: "2025-11-20",
        description: "An academic session",
        location: "Room 101",
        organization: "TMU",
      },
      {
        id: 2,
        title: "Social Event",
        category: "social",
        date: "2025-11-21",
        description: "A social gathering",
        location: "Quad",
        organization: "TMU",
      },
    ];

    // simulate filtering by category = "academic"
    const filtered = mockEvents.filter((ev) => ev.category === "academic");

    render(<EventList events={filtered} />);

    // element for "Academic Event" should exist
    const academicEl = screen.getByText(/academic event/i);
    expect(academicEl).toBeTruthy();

    // "Social Event" should NOT be found
    const socialEl = screen.queryByText(/social event/i);
    expect(socialEl).toBeNull();
  });

  test("shows a helpful message when no events match the filters", () => {
    // empty list -> EventList should render its empty-state message
    render(<EventList events={[]} />);

    const emptyMsg = screen.getByText(/no events found/i);
    expect(emptyMsg).toBeTruthy();
  });
});
