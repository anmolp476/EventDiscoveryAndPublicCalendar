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
          display: "grid",
          gridTemplateColumns: "1.4fr .9fr .9fr .9fr .8fr",
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


        {/*TODO: @Yanny and @Deep, please replace this with the custom Calendar Component, thanks!*/}
        <input
            type="date"
            value={date}
            onChange={(e) => onChange("date", e.target.value)}
        />

    </div>
  );
}

