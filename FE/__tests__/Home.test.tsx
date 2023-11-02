import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Sample Test", () => {
  it("Home test", () => {
    render(<Home />);
    const myElement = screen.getByText(/GO TO community/i);
    expect(myElement).toBeInTheDocument();
  });
});

describe("", () => {
  it("", () => {
    // given
    // when
    // then
  });
});
