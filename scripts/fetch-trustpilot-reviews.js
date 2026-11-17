#!/usr/bin/env node
"use strict";

// Fetches Blue Pits Housing Action's Trustpilot reviews through Apify and
// writes them to _data/reviews.json for the Jekyll build.
//
// Uses the same Apify actor and normalised review shape as the renegade-solar
// importer, with reviews ordered newest first.

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.join(__dirname, "..");
const OUTPUT_PATH = path.join(ROOT, "_data", "reviews.json");
const PROFILE_URL =
  "https://uk.trustpilot.com/review/bluepitshousingaction.co.uk";
const APIFY_ACTOR_ID = "4AQb7n4pXPxFQQ2w5";
const MAX_REVIEWS = 9999;

function normalizeReview(review) {
  const date = review.date ? new Date(review.date) : null;
  const validDate = date && !Number.isNaN(date.getTime());

  return {
    id: review.reviewId || "",
    author: (review.name || "Anonymous").trim(),
    rating: Number.parseInt(review.ratingValue, 10) || 0,
    title: (review.reviewTitle || "").trim(),
    text: (review.reviewText || "").trim(),
    date: validDate ? date.toISOString() : "",
    url: review.url || "",
  };
}

function sortNewestFirst(a, b) {
  return b.date.localeCompare(a.date);
}

async function fetchReviews() {
  const token = process.env.APIFY_API_TOKEN;

  if (!token) {
    throw new Error("APIFY_API_TOKEN is not set");
  }

  const url =
    `https://api.apify.com/v2/acts/${APIFY_ACTOR_ID}` +
    `/run-sync-get-dataset-items?token=${encodeURIComponent(token)}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      startUrls: [{ url: PROFILE_URL }],
      maxReviews: MAX_REVIEWS,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Apify request failed (${response.status}): ${body}`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Unexpected Apify response: expected an array of reviews");
  }

  return data
    .map(normalizeReview)
    .filter((review) => review.text.length > 0)
    .sort(sortNewestFirst);
}

function summarise(reviews) {
  const total = reviews.length;
  const averageRating =
    total === 0
      ? 0
      : Math.round(
          (reviews.reduce((sum, review) => sum + review.rating, 0) / total) * 10,
        ) / 10;

  return { total, averageRating };
}

function readExisting() {
  try {
    return JSON.parse(fs.readFileSync(OUTPUT_PATH, "utf8"));
  } catch {
    return null;
  }
}

function sameReviews(existing, next) {
  if (!existing || existing.total !== next.total) return false;
  if (existing.averageRating !== next.averageRating) return false;
  return JSON.stringify(existing.reviews) === JSON.stringify(next.reviews);
}

async function main() {
  const reviews = await fetchReviews();
  const summary = summarise(reviews);
  const existing = readExisting();

  if (sameReviews(existing, { ...summary, reviews })) {
    console.log(
      `Trustpilot reviews unchanged (${summary.total} reviews, ${summary.averageRating}/5)`,
    );
    return;
  }

  const output = {
    profileUrl: PROFILE_URL,
    total: summary.total,
    averageRating: summary.averageRating,
    lastUpdated: new Date().toISOString(),
    reviews,
  };

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(output, null, 2)}\n`, "utf8");

  console.log(
    `Wrote ${summary.total} Trustpilot reviews (${summary.averageRating}/5) to ${path.relative(ROOT, OUTPUT_PATH)}`,
  );
}

main().catch((error) => {
  console.error(`Failed to update Trustpilot reviews: ${error.message}`);
  process.exit(1);
});
