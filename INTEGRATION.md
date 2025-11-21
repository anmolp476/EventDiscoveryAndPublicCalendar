## INTEGRATION DOCUMENTATION
Sub-Project 2 (Event Discovery & Public Calendar)
Integration with Sub-Project 9 (Room Booking System – Firebase)

### Overview
--------
This .md file explains how Sub-Project 2 integrates with data owned by Sub-Project 9. Originally, Sub-Project 2 used fully static dummy event data. After integration, we now pull ALL the fields from Sub-Project 9's Firebase Realtime Database and merge them into our existing Event objects. The new merged Event objects array are then used in the filtering process in `App.tsx`

However, not all the fields provided from the database gave important info, so we still kept some hard-coded information. 

### Firebase Database
--------------------
If you want to access the firebase database, here's the URL:

https://cps714-b56c0-default-rtdb.firebaseio.com/roomBookings.json

However, permission and auth may be required!

### Data Structure From Firebase
----------------------------
The Firebase endpoint returns an object like:

```json
{
  "roomBookings": {
    "-Od553mZJK2qA-PywBQH": {
      "additionalResources": "testing additional resources",
      "bookedAt": 1762112589005,
      "cateringSelected": true,
      "endDate": "2025-11-02T21:00:00.000Z",
      "micNum": "10",
      "projectorNum": "2",
      "roomSelected": "SLC-831",
      "startDate": "2025-11-02T19:00:00.000Z",
      "status": "Pending"
    },
    ...
  }
}
```

### Fields Used By Sub-Project 2
----------------------------
While Sub-Project 9 stores many fields, Sub-Project 2 integrates only the ones relevant 
to event discovery UI:

- roomSelected          → used to replace our event.location
- startDate             → used to replace our event.date
- endDate               → used to replace our event.end (if exists)
- cateringSelected      → appended to the event object
- additionalResources   → appended to the event object
- bookedAt              → appended to the event object
- micNum                → appended to the event object
- projectorNum          → appended to the event object
- status                → appended to the event object

Merging Strategy
----------------
We keep our base event list (10 dummy events) in src/types/events.ts with only core fields:
- id
- title
- description
- category
- organization

Every optional field is then overwritten with Firebase values (if available) based on index ordering.

Example merge:

```javascript
const mergedEvents = events.map((event, index) => {
    const fb = firebaseBookings[index] || {};
    return {
        ...event,
        location: fb.roomSelected || event.location,
        date: fb.startDate || event.date,
        end: fb.end || event.end,
        cateringSelected: fb.cateringSelected || false,
        additionalResources: fb.additionalResources || "",
        bookedAt: fb.bookedAt || undefined,
        micNum: fb.micNum || undefined,
        projectorNum: fb.projectorNum || undefined,
        status: fb.status || undefined
    };
});
```
This can be found in `App.tsx`, and also that `firebaseBookings` variable has been initialized with the values from the databse in a `useEffect()` hook. 
