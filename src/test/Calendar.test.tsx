import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { events } from "../types/events";

// Mock FullCalendar so we don't rely on the real heavy UI component
vi.mock("@fullcalendar/react", () => {
  return {
    __esModule: true,
    default: ({ events, eventClick }: any) => (
      <div>
        {events.map((e: any) => (
          <button
            key={e.id}
            onClick={() =>
              eventClick({
                event: {
                  title: e.title,
                  extendedProps: e.extendedProps ?? {},
                },
              })
            }
          >
            {e.title}
          </button>
        ))}
      </div>
    ),
  };
});

// Import Calendar AFTER the mock
import Calendar from "../components/Calendar";

describe("Calendar (integrated calendar view)", () => {
  test("renders events from the shared events array", () => {
    render(<Calendar />);

    const firstTitle = events[0].title;
    const eventButton = screen.getByText(firstTitle);

    // instead of .toBeInTheDocument()
    expect(eventButton).toBeTruthy();
  });

  test("shows an alert with event title when an event is clicked", () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

    render(<Calendar />);

    const firstTitle = events[0].title;
    const eventButton = screen.getByText(firstTitle);

    fireEvent.click(eventButton);

    // Vitest's own matcher, this is fine
    expect(alertSpy).toHaveBeenCalled();

    const message = alertSpy.mock.calls[0][0] as string;
    expect(message).toContain(`Title: ${firstTitle}`);

    alertSpy.mockRestore();
  });
});
