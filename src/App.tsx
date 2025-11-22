import { useEffect, useState } from "react"
import "./App.css"
import { type Event, events } from "./types/events"
import { useDebouncedValue } from "./hooks/useDebouncedValue"
import FilterPanel from "./components/FilterPanel"
import SearchMessages from "./components/SearchMessages"
import EventList from "./components/EventList"
import Calender from "./components/Calendar"

function App() {

  const [firebaseBookings, setFirebaseBookings] = useState<any[]>([])

  useEffect(() => {
    async function fetchRoomLocations() {
      try {
          const response = await fetch("https://cps714-b56c0-default-rtdb.firebaseio.com/roomBookings.json")
        
          const data = await response.json()
          if(!data) return;

          const values = Object.values(data);
          const locations = values.map((event: any) => ({
            roomSelected: event.roomSelected,
            startDate: event.startDate.substring(0, 10), // Extract YYYY-MM-DD
            endDate: event.endDate.substring(0, 10), // Extract YYYY-MM-DD
            cateringSelected: event.cateringSelected,
            additonalResources: event.additionalResources,
            projectorNum: event.projectorNum,
            micNum: event.micNum,
            bookedAt: event.bookedAt,
            status: event.status,
          }));

          setFirebaseBookings(locations);
      } catch (error) {
        console.error("Error fetching room locations:", error)
      }
    }
    fetchRoomLocations();
  }, []);

  const [filters, setFilters] = useState({
    query: "",
    category: "",
    location: "",
    organization: "",
    date: "",
    catering: "",
  })

  const handleChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }))
  }

  // debounce search input to improve performance
  const debounced = useDebouncedValue(filters.query, 300)

  // validation for friendly messages
  const shortQueryError =
    debounced.trim().length > 0 && debounced.trim().length < 2

  const mergedEvents = events.map((event, index) => {
    const firebaseBooking = firebaseBookings[index];

    return {
      ...event,
      location: firebaseBooking?.roomSelected ?? event.location,
      cateringSelected: firebaseBooking?.cateringSelected ?? false,
      date: firebaseBooking?.startDate ?? event.date,
      end: firebaseBooking?.endDate ?? event.end,
      additionalResources: firebaseBooking?.additonalResources ?? event.additionalResources,
      bookedAt: firebaseBooking?.bookedAt ?? event.bookedAt,
      projectorNum: firebaseBooking?.projectorNum ?? event.projectorNum,
      micNum: firebaseBooking?.micNum ?? event.micNum,
      status: firebaseBooking?.status ?? event.status,
    };
  });

  // filtering logic (title + description + other filters)
  const filteredEvents = mergedEvents.filter((event: Event) => {

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
    <main id="mainContainer">
      <div id="eventView">
        <h1 style={{textAlign:'center'}}>Browse &amp; Filter Events</h1>

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
      </div>
      <div id="calenderView"> 
        <h1 style={{textAlign:'center'}}>
          Event Calendar
        </h1>
        <Calender/>
      </div>
        
        
    </main>
  )
}

export default App
