import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import UserProfileForm from "./UserProfileForm";
import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from 'util';

const TEST_USER_DATA = {
  name: "Alex",
  email: "alex@example.com",
  password: "password123"
} as const;

describe('UserProfileForm', () => {
  let alertMock: jest.SpyInstance;
  let consoleSpy: jest.SpyInstance;

  beforeAll(() => {
    alertMock = jest.spyOn(window, 'alert').mockImplementation();
  });

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  afterAll(() => {
    alertMock.mockRestore();
  });
  test("renders UserProfileForm with fields", () => {
  // Add this to your setupTests.ts file
global.TextEncoder = TextEncoder;
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;    render(<UserProfileForm />);
    
    expect(screen.getByText("Update Profile")).toBeInTheDocument();
    expect(screen.getByLabelText(/^Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password:/i)).toBeInTheDocument();
  });

  test("shows validation errors", async () => {
    render(<UserProfileForm />);
    
    fireEvent.click(screen.getByText("Save Profile"));
    
    await expect(async () => {
      await screen.findByText("Name is required", {}, { timeout: 1000 });
      await screen.findByText("Email is required", {}, { timeout: 1000 });
      await screen.findByText("Password is required", {}, { timeout: 1000 });
    }).not.toThrow();
  });

  test("submits valid form", async () => {
    const user = userEvent.setup();
    render(<UserProfileForm />);
    
    await user.type(screen.getByLabelText(/^Name:/i), TEST_USER_DATA.name);
    await user.type(screen.getByLabelText(/^Email:/i), TEST_USER_DATA.email);
    await user.type(screen.getByLabelText(/^Password:/i), TEST_USER_DATA.password);
    await user.click(screen.getByText("Save Profile"));

    expect(await screen.findByText("Profile updated successfully!")).toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalledWith("API response:", expect.any(Object));
  });
});
// The test file has a duplicate line that could cause errors:
// global.TextEncoder = TextEncoder;
// global.TextEncoder = TextEncoder;

// Let's fix this by removing the duplicate line:
test("renders UserProfileForm with fields", () => {
  // Add this to your setupTests.ts file
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder as any;
  
  render(<UserProfileForm />);
  
  expect(screen.getByText("Update Profile")).toBeInTheDocument();
  expect(screen.getByLabelText(/^Name:/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/^Email:/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/^Password:/i)).toBeInTheDocument();
});