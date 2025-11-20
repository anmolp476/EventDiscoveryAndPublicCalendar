interface FilterPanelProps {
  query: string;
  category: string;
  location: string;
  organization: string;
  date: string;
  onChange: (field: string, value: string) => void;
}

export default function FilterPanel({
  query,
  category,
  location,
  organization,
  date,
  onChange,
}: FilterPanelProps) {
  return (
    <div
        className="search-row"
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: 'wrap',
          gap: ".5rem",
          margin: "1rem 0",

        }}
    >
        <input
            id="search"
            type="search"
            placeholder="Search by title"
            value={query}
            onChange={(e) => onChange("query", e.target.value)}
        />

        <select
            value={category}
            onChange={(e) => onChange("category", e.target.value)}
        >
            <option value="">All Categories</option>
            <option value="academic">Academic</option>
            <option value="social">Social</option>
            <option value="sports">Sports</option>
        </select>

        <input
            placeholder="Filter by location"
            value={location}
            onChange={(e) => onChange("location", e.target.value)}
        />

        <input
            placeholder="Filter by organization"
            value={organization}
            onChange={(e) => onChange("organization", e.target.value)}
        />

        <input
            type="date"
            value={date}
            onChange={(e) => onChange("date", e.target.value)}
        />

    </div>
  );
}

