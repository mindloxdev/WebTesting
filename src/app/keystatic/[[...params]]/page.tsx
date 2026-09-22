/**
 * The Keystatic editor UI. Client-only and outside the marketing site's
 * layout on purpose: it ships its own shell, and none of the site chrome,
 * fonts or motion belong in an admin screen.
 *
 * Not linked from anywhere and disallowed in robots.ts — it is a tool for
 * the people who write, not a page.
 */
"use client";

import { makePage } from "@keystatic/next/ui/app";
import config from "../../../../keystatic.config";

export default makePage(config);
