export type Event = {
  id: number;
  title: string;
  description: string;
  date?: string; // YYYY-MM-DD
  end?: string; //YYYY-MM-DD
  category: "academic" | "social" | "sports";
  location?: string;
  organization: string;
  cateringSelected?: boolean;
  additionalResources?: string;
  bookedAt?: number; 
  projectorNum?: string; 
  micNum?: string;
  status?:string;
};

export const events: Event[] = [
  {
    id: 1,
    title: "Math Workshop",
    description: "Algebra review and problem-solving session with tutors.",
    date: "2025-10-15",
    category: "academic",
    location: "Room 101",
    organization: "Math Club",
    additionalResources: "Calculators",
    bookedAt: 1763589475838,
    micNum: "2",
    projectorNum: "4",
    status: "Approved",
  },
  {
    id: 2,
    title: "Football Match",
    description: "Home game vs. York. Free student section and halftime snacks.",
    date: "2025-10-20",
    category: "sports",
    location: "Main Stadium",
    organization: "Sports Committee",
    additionalResources: "Scoreboard, Concession Stand",
    bookedAt: 1763689475838,
    micNum: "0",
    projectorNum: "0",
    status: "Approved",
  },
  {
    id: 3,
    title: "Cultural Fest",
    description: "Food, music, and performances from student groups.",
    date: "2025-11-05",
    category: "social",
    location: "Auditorium",
    organization: "Cultural Society",
    additionalResources: "Stage, Sound System",
    bookedAt: 1763789475838,
    micNum: "4",
    projectorNum: "2",
    status: "Pending",
  },
  {
    id: 4,
    title: "Science Fair",
    description: "Students present experiments and projects over 2 days.",
    date: "2025-11-12",
    end: "2025-11-13",
    category: "academic",
    location: "Science Building",
    organization: "Science Club",
    additionalResources: "Lab Equipment",
    bookedAt: 1763889475838,
    micNum: "3",
    projectorNum: "3",
    status: "Approved",
  },
  {
    id: 5,
    title: "Basketball Tournament",
    description: "Quarterfinals and semifinals across multiple days.",
    date: "2025-12-01",
    end: "2025-12-03",
    category: "sports",
    location: "Gymnasium",
    organization: "Sports Committee",
    additionalResources: "Scoreboard, Water Stations",
    bookedAt: 1763989475838,
    micNum: "1",
    projectorNum: "1",
    status: "Pending",
  },
  {
    id: 6,
    title: "Winter Gala",
    description: "Formal social gathering with music, food, and awards.",
    date: "2025-12-15",
    category: "social",
    location: "Main Hall",
    organization: "Cultural Society",
    additionalResources: "Stage, Decorations",
    bookedAt: 1764089475838,
    micNum: "2",
    projectorNum: "0",
    status: "Approved",
  },
];
