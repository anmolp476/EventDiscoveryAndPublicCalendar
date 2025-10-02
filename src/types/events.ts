export type Event = {
  id: number
  title: string
  date: string
  category: "academic" | "social" | "sports"
  location: string
  organization: string
}

export const events: Event[] = [
  {
    id: 1,
    title: "Math Workshop",
    date: "2023-10-15",
    category: "academic",
    location: "Room 101",
    organization: "Math Club"
  },
  {
    id: 2,
    title: "Football Match",
    date: "2023-10-20",
    category: "sports",
    location: "Main Stadium",
    organization: "Sports Committee"
  },
  {
    id: 3,
    title: "Cultural Fest",
    date: "2023-11-05",
    category: "social",
    location: "Auditorium",
    organization: "Cultural Society"
  }
] 