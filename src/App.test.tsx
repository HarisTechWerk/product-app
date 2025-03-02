import { render, screen, act } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";

test("renders Product App heading", () => {
  render(<App />);
  const headingElement = screen.getByText("Product App");
  expect(headingElement).toBeInTheDocument();
});

test("renders ProductDetail component with loading state", () => {
  render(<App />);
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

test("renders product details after loading", async () => {
  jest.useFakeTimers(); // Mock timers to control setTimeout
  render(<App />);

  // Wait for ProductDetail to load
  await act(async () => {
    jest.advanceTimersByTime(1000); // Simulate the 1-second delay
  });

  expect(await screen.findByText("Cool Book")).toBeInTheDocument();
  expect(screen.getByText("A great read!")).toBeInTheDocument();
  expect(screen.getByText("Price: $19.99")).toBeInTheDocument();
  expect(screen.getByText("Rating: 4/5")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /add to cart/i })).toBeInTheDocument();

  jest.useRealTimers(); // Restore real timers
}, 3000); // Increase timeout for async