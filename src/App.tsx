import { useState } from "react"
import "./App.css"
import { type Event, events } from "./types/events"
import { useDebouncedValue } from "./hooks/useDebouncedValue"
import FilterPanel from "./components/FilterPanel"
import SearchMessages from "./components/SearchMessages"
import EventList from "./components/EventList"

function App() {
  const [filters, setFilters] = useState({
    query: "",
    category: "",
    location: "",
    organization: "",
    date: "",
  })

  const handleChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }))
  }

  // debounce search input to improve performance
  const debounced = useDebouncedValue(filters.query, 300)

  // validation for friendly messages
  const shortQueryError =
    debounced.trim().length > 0 && debounced.trim().length < 2

  // filtering logic (title + description + other filters)
  const filteredEvents = events.filter((event: Event) => {

    // We're getting the title & description, and making a haystack to search within.
    const title = event.title.toLowerCase() ?? ""
    const description = event.description.toLowerCase() ?? ""
    const haystack = `${title} ${description}` // a string value combined with title & description
    const query = debounced.trim().toLowerCase() // here is the current search query thts also trimmed & lowercased


    // Now here are all the filtering variables we will check against the current query
    const matchesQuery = query === "" || haystack.includes(query)
    const matchesCategory =
      filters.category === "" || event.category === filters.category
    const matchesLocation =
      filters.location === "" ||
      event.location?.toLowerCase().includes(filters.location.toLowerCase())
    const matchesOrganization =
      filters.organization === "" ||
      event.organization
        ?.toLowerCase()
        .includes(filters.organization.toLowerCase())
    const matchesDate = filters.date === "" || event.date === filters.date

    return (
      matchesQuery &&
      matchesCategory &&
      matchesLocation &&
      matchesOrganization &&
      matchesDate
    )
  })

  return (
    <main style={{ padding: "24px" }}>
      <h1>Browse &amp; Filter Events</h1>

      {/* Filters and search bar */}
      <FilterPanel {...filters} onChange={handleChange} />

      {/* Search and validation messages */}
      <SearchMessages
        query={debounced}
        shortQueryError={shortQueryError}
        filteredCount={filteredEvents.length}
      />

      {/* Event list results */}
      <EventList events={filteredEvents} />
    </main>
  )
}

export default App
