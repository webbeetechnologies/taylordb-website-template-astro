import { Hono } from "hono";
import { z } from "zod";
import { db } from "../lib/db";

const contact = new Hono();

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().optional(),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

/**
 * POST /api/contact
 *
 * Validates the request body and persists it to TaylorDB.
 *
 * QueryBuilder examples:
 *
 *   // Insert a row
 *   await db.insertInto("contacts").values({ firstName, lastName, email, message }).execute();
 *
 *   // Select all rows
 *   const rows = await db.from("contacts").select("*");
 *
 *   // Select with a filter
 *   const rows = await db.from("contacts").where({ email: { "=": email } }).select("*");
 *
 *   // Update a row
 *   await db.from("contacts").where({ id: { "=": 1 } }).update({ message: "updated" });
 *
 *   // Delete a row
 *   await db.from("contacts").where({ id: { "=": 1 } }).delete();
 */
contact.post("/", async (c) => {
  const body = await c.req.json();
  const result = contactSchema.safeParse(body);

  if (!result.success) {
    return c.json({ success: false, errors: result.error.flatten().fieldErrors }, 400);
  }

  const { firstName, lastName, email, message } = result.data;

  // Persist to TaylorDB — uncomment once the "contacts" table exists in your schema:
  //
  // await db.insertInto("contacts").values({ firstName, lastName, email, message }).execute();

  console.log(`📬 Contact from ${firstName} ${lastName} <${email}>: ${message}`);

  return c.json({
    success: true,
    message: `Thanks ${firstName}! We'll get back to you at ${email} soon.`,
  });
});

/**
 * GET /api/contact
 *
 * Returns all submitted contacts from TaylorDB.
 */
contact.get("/", async (c) => {
  // Fetch from TaylorDB — uncomment once the "contacts" table exists in your schema:
  //
  // const rows = await db.from("contacts").select("*");
  // return c.json(rows);

  return c.json({ message: "QueryBuilder example — add your contacts table to TaylorDB first." });
});

export default contact;
