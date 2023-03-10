import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../HomePage/Home";

describe("Home component", () => {
  it("renders the correct elements", () => {
    render(<Home />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Astroid Id")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Random Asteroid" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "submit" })).toBeInTheDocument();
  });

  it("updates the input value correctly", () => {
    render(<Home />);
    const input = screen.getByPlaceholderText("Enter Astroid Id") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "12345" } });
    expect(input.value).toBe("12345");
  });

  it("sets local storage and navigates to asteroid page on submit button click", () => {
    const navigate = jest.fn();
    Object.defineProperty(window, "localStorage", {
      value: {
        setItem: jest.fn(),
      },
      writable: true,
    });
    render(<Home />);
    const input = screen.getByPlaceholderText("Enter Astroid Id") as HTMLInputElement;
    const submitButton = screen.getByRole("button", { name: "submit" });
    fireEvent.change(input, { target: { value: "12345" } });
    fireEvent.click(submitButton);
    expect(window.localStorage.setItem).toHaveBeenCalledWith("astId", "12345");
    expect(navigate).toHaveBeenCalledWith("/asteroid");
  });

  it("updates the input value with a random asteroid ID on random button click", async () => {
    jest.mock("axios");
    const { default: axios } = await import("axios");
    axios.get.mockResolvedValue({
      data: {
        near_earth_objects: [
          { id: "2000433" },
      ],
      },
    });
    render(<Home />);
    const randomButton = screen.getByRole("button", { name: "Random Asteroid" });
    fireEvent.click(randomButton);
    expect(axios.get).toHaveBeenCalledWith("https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY");
    expect(screen.getByPlaceholderText("Enter Astroid Id")).toHaveValue(expect.any(String));
  });
});
