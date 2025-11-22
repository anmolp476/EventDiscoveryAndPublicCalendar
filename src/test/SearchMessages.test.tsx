import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SearchMessages from "../components/SearchMessages";

describe("SearchMessages", () => {
  test("shows an error when the search query is too short", () => {
    render(
      <SearchMessages
        query="a"
        shortQueryError={true}
        filteredCount={0}
      />
    );
    const alertMessage = screen.getByRole("alert");
    expect(alertMessage).toHaveTextContent(/type at least 2 characters/i);
  });

  test("shows results count when query is valid and results exist", () => {
    render(
      <SearchMessages
        query="concert"
        shortQueryError={false}
        filteredCount={3}
      />
    );
    expect(screen.getByText(/3 result/i)).toBeInTheDocument();
  });
});
