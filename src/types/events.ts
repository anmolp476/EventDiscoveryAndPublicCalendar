export type Event = {
  id: number;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  category: "academic" | "social" | "sports";
  location: string;
  organization: string;
  cateringSelected?: boolean;
};

export const events: Event[] = [
  {
    id: 1,
    title: "Math Workshop",
    description: "Algebra review and problem-solving session with tutors.",
    date: "2023-10-15",
    category: "academic",
    location: "Room 101",
    organization: "Math Club",
  },
  {
    id: 2,
    title: "Football Match",
    description: "Home game vs. York. Free student section and halftime snacks.",
    date: "2023-10-20",
    category: "sports",
    location: "Main Stadium",
    organization: "Sports Committee",
  },
  {
    id: 3,
    title: "Cultural Fest",
    description: "Food, music, and performances from student groups.",
    date: "2023-11-05",
    category: "social",
    location: "Auditorium",
    organization: "Cultural Society",
  },
];
