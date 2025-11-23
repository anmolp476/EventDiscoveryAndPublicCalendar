import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SearchMessages from "../components/SearchMessages";

describe("SearchMessages (search functionality)", () => {
  test("shows an error when the search query is too short", () => {
    render(
      <SearchMessages
        query="a"
        shortQueryError={true}
        filteredCount={0}
      />
    );

    const alertMessage = screen.getByRole("alert");

    // Check the text content manually instead of using toHaveTextContent
    const text = alertMessage.textContent || "";
    expect(text.toLowerCase()).toContain("type at least 2 characters");
  });

  test("shows results count when query is valid and results exist", () => {
    render(
      <SearchMessages
        query="concert"
        shortQueryError={false}
        filteredCount={3}
      />
    );

    // Just make sure an element with that text exists
    const resultElement = screen.getByText(/3 result/i);
    expect(resultElement).toBeTruthy(); // built-in matcher, no jest-dom needed
  });
});
