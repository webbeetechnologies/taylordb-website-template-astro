import { createQueryBuilder } from "@taylordb/query-builder";
import type { TaylorDatabase } from "../taylordb/types";

/**
 * Create a TaylorDB query builder instance.
 *
 * Pass an optional `apiKey` to override the server-level key —
 * useful when forwarding a user's `app_access_token` from a cookie.
 */
export function createDb(apiKey?: string) {
  return createQueryBuilder<TaylorDatabase>({
    baseUrl: process.env.TAYLORDB_BASE_URL!,
    baseId: process.env.TAYLORDB_SERVER_ID!,
    apiKey: apiKey ?? process.env.TAYLORDB_API_KEY!,
  });
}

/** Module-level instance using the server API key (suitable for server-only operations). */
export const db = createDb();
