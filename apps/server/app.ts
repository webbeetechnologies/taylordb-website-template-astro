import { Hono } from "hono";
import { cors } from "hono/cors";
import health from "./routes/health";
import contact from "./routes/contact";

const app = new Hono();

// CORS
const allowedOrigins = [
  process.env.FRONTEND_URL,
  // Common localhost ports for Astro / Vite dev servers
  "http://localhost:4321",
  "http://localhost:4322",
  "http://localhost:5173",
  "http://localhost:5174",
].filter(Boolean) as string[];

app.use("*", cors({ origin: allowedOrigins, credentials: true }));

// Routes
app.route("/api/health", health);
app.route("/api/contact", contact);

export default app;
