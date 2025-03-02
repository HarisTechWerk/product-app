import { render, screen, fireEvent, act } from "@testing-library/react";
import ProductDetail from "./ProductDetail";
import "@testing-library/jest-dom";

test("renders ProductDetail with loading state", () => {
  render(<ProductDetail productId={1} />);
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

test("renders product details after loading", async () => {
  jest.useFakeTimers(); // Mock timers to control setTimeout
  render(<ProductDetail productId={1} />);

  // Wrap state updates in act for React 18
  await act(async () => {
    jest.advanceTimersByTime(1000); // Simulate the 1-second delay
  });

  expect(await screen.findByText("Cool Book")).toBeInTheDocument();
  expect(screen.getByText("A great read!")).toBeInTheDocument();
  expect(screen.getByText("Price: $19.99")).toBeInTheDocument();
  expect(screen.getByText("Rating: 4/5")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /add to cart/i })).toBeInTheDocument();

  jest.useRealTimers(); // Restore real timers
}, 3000); // Increase timeout to 3000ms for async

test("handles Add to Cart click", async () => {
  jest.useFakeTimers(); // Mock timers for loading
  const alertMock = jest.spyOn(window, "alert").mockImplementation();
  render(<ProductDetail productId={1} />);

  // Wait for product to load with act
  await act(async () => {
    jest.advanceTimersByTime(1000); // Simulate the 1-second delay
  });

  fireEvent.click(screen.getByRole("button", { name: /add to cart/i }));
  expect(alertMock).toHaveBeenCalledWith("Added to cart!");

  jest.useRealTimers(); // Restore real timers
  alertMock.mockRestore();
});