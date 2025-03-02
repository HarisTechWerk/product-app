import { setupWorker } from "msw/browser"; // Use the browser-specific import
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);