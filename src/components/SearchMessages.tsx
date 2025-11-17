interface SearchMessagesProps {
    query: string;
    shortQueryError: boolean;
    filteredCount: number;
}

export default function SearchMessages({ query, shortQueryError, filteredCount }: SearchMessagesProps) {
    const trimmed = query.trim();
    const showEmpty = !shortQueryError && trimmed !== "" && filteredCount === 0;

    return (
        <div style={{ minHeight: "1.5rem" }}>
            {shortQueryError && (
                <p role="alert">Type at least 2 characters to search.</p>
            )}

            {!shortQueryError && trimmed !== "" && !showEmpty && filteredCount > 0 && (
                <p>
                    {filteredCount} result{filteredCount !== 1 ? "s" : ""} found
                </p>
            )}
        </div>
    );
}