import { useState } from 'react'
import './App.css'
import { type Event, events } from './types/events'


function App() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("")
  const [location, setLocation] = useState("")
  const [organization, setOrganization] = useState("")
  const [date, setDate] = useState("")

  const filteredEvents = events.filter((event: Event) => {
    return (
      (query === "" || event.title.toLowerCase().includes(query.toLowerCase())) &&
      (category === "" || event.category === category) &&
      (location === "" || event.location.toLowerCase().includes(location.toLowerCase())) &&
      (organization === "" || event.organization.toLowerCase().includes(organization.toLowerCase())) &&
      (date === "" || event.date === date)
    )
  })

  return (
    <div>
      <h1>Browse & Filter Events</h1>

      <input 
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by title"
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="academic">Academic</option>
        <option value="social">Social</option>
        <option value="sports">Sports</option>
      </select>

      <input 
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Filter by location"
      />

      <input 
        type="text"
        value={organization}
        onChange={(e) => setOrganization(e.target.value)}
        placeholder="Filter by organization"
      />

      <input 
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <ul>
        {filteredEvents.map(ev => (
          <li key={ev.id}>
            <strong>{ev.title}</strong> ({ev.category}) <br/>
            {ev.date} – {ev.location} – {ev.organization}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App