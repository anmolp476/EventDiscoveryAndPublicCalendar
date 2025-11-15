import { useState } from "react";
import "./App.css";
import { type Event, events } from "./types/events";
import { useDebouncedValue } from "./hooks/useDebouncedValue";

function App() {
  // controls
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [organization, setOrganization] = useState("");
  const [date, setDate] = useState("");

  // debounce typing so we don't re-filter on every keypress
  const debounced = useDebouncedValue(query, 300);

  // simple validation for rubric (clear message for short queries)
  const shortQueryError =
    debounced.trim().length > 0 && debounced.trim().length < 2;

  // filtering (title + your four filters)
  const filteredEvents = events.filter((event: Event) => {
    const matchesQuery =
      debounced.trim() === "" ||
      event.title.toLowerCase().includes(debounced.toLowerCase());

    const matchesCategory = category === "" || event.category === category;

    const matchesLocation =
      location === "" ||
      event.location.toLowerCase().includes(location.toLowerCase());

    const matchesOrganization =
      organization === "" ||
      event.organization.toLowerCase().includes(organization.toLowerCase());

    // exact date match (keep as-is; change to >= for "on/after" behavior)
    const matchesDate = date === "" || event.date === date;

    return (
      matchesQuery &&
      matchesCategory &&
      matchesLocation &&
      matchesOrganization &&
      matchesDate
    );
  });

  const showEmpty =
    !shortQueryError &&
    debounced.trim() !== "" &&
    filteredEvents.length === 0;

  return (
    <main style={{ padding: "24px" }}>
      <h1>Browse &amp; Filter Events</h1>

      {/* Search + Filters */}
      <div
        className="search-row"
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr .9fr .9fr .9fr .8fr",
          gap: ".5rem",
          margin: "1rem 0",
        }}
      >
        <label htmlFor="search" className="sr-only">
          Search by title
        </label>
        <input
          id="search"
          type="search"
          placeholder="Search by title"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-describedby="search-help"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Filter by category"
        >
          <option value="">All Categories</option>
          <option value="academic">Academic</option>
          <option value="social">Social</option>
          <option value="sports">Sports</option>
        </select>

        <input
          placeholder="Filter by location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          aria-label="Filter by location"
        />

        <input
          placeholder="Filter by organization"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          aria-label="Filter by organization"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          aria-label="Filter by date (exact match)"
        />
      </div>

      <div id="search-help" className="visually-hidden">
        Type at least 2 characters. Results update automatically.
      </div>

      {/* Friendly messages (Error Handling rubric) */}
      <div aria-live="polite" aria-atomic="true" style={{ minHeight: "1.5rem" }}>
        {shortQueryError && (
          <p role="alert">Type at least 2 characters to search.</p>
        )}

        {!shortQueryError && debounced.trim() !== "" && showEmpty && (
          <p>No events match “{debounced}”. Try different keywords.</p>
        )}

        {!shortQueryError &&
          debounced.trim() !== "" &&
          !showEmpty &&
          filteredEvents.length > 0 && (
            <p>
              {filteredEvents.length} result
              {filteredEvents.length !== 1 ? "s" : ""} found
            </p>
          )}
      </div>

      {/* Results */}
      <ul>
        {filteredEvents.map((ev) => (
          <li key={ev.id} style={{ marginBottom: "10px" }}>
            <strong>{ev.title}</strong> ({ev.category}) <br />
            {ev.date} – {ev.location} – {ev.organization}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
