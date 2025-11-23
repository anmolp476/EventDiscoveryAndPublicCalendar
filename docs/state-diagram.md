# CampusConnect — Event Discovery: State Diagram

Mermaid UML for current `App.tsx` flow (Firebase fetch → debounce → validate → filter → results).

```mermaid
stateDiagram-v2
title CampusConnect – Event Discovery (App) State Machine

[*] --> Boot

state "Boot" as Boot
Boot --> FetchFirebase : mount/useEffect → fetchRoomLocations()

state "Fetch Firebase Bookings" as FetchFirebase {
  [*] --> Loading
  Loading --> Loaded : response.ok & data parsed\nsetFirebaseBookings()
  Loading --> Empty : response.ok & !data\nsetFirebaseBookings([])
  Loading --> Error : catch(error)
}
FetchFirebase --> Ready : Loaded | Empty | Error  \n// app is still usable with local events

state "Ready (interactive)" as Ready {
  [*] --> Idle

  Idle --> Typing : onChange(query)
  Idle --> FiltersChanged : onChange(category|location|organization|date|catering)

  state "Typing (user input)" as Typing {
    [*] --> Debouncing : keypress
    Debouncing --> Debouncing : keypress (reset 300ms)
    Debouncing --> Evaluate : 300ms elapsed (useDebouncedValue)
  }

  FiltersChanged --> Evaluate

  state "Evaluate" as Evaluate {
    [*] --> Validate
    Validate --> ShortQueryError : 0 < len(query) < 2
    Validate --> Compute : len(query) == 0 OR len(query) ≥ 2

    state "Compute filters" as Compute {
      [*] --> Merge
      Merge --> FilterResults : merge firebaseBookings → events
      FilterResults --> ResultsEmpty : filtered.length == 0
      FilterResults --> ResultsFound : filtered.length > 0
    }

    ShortQueryError --> Typing : onChange(query)
    ResultsEmpty --> Typing : onChange(query|filters)
    ResultsFound --> Typing : onChange(query|filters)
  }
}
