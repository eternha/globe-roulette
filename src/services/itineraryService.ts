/**
 * Itinerary generation service.
 *
 * Provides mock itinerary generation based on destination data,
 * and a prompt builder for future AI API integration.
 *
 * When a real AI provider is connected:
 *  1. Use `buildItineraryPrompt()` to construct the prompt
 *  2. Send it to OpenAI / Anthropic / Gemini
 *  3. Parse the response into the `TravelItinerary` structure
 */

import type { Destination } from "../data/types";
import type {
  ItineraryOptions,
  ItineraryStyle,
  TravelItinerary,
  ItineraryDay,
  ItineraryItem,
} from "../types/itinerary";
import { isItineraryFlagEnabled } from "../config/features";
import { getStyleMeta } from "../config/itinerary";

/* ── Prompt builder (for future AI integration) ─────────────── */

/**
 * Build a structured prompt for an AI model to generate an itinerary.
 *
 * This is ready to be sent to any LLM API. The prompt instructs
 * the model to return structured JSON matching our TravelItinerary type.
 */
export function buildItineraryPrompt(
  destination: Destination,
  options: ItineraryOptions,
): string {
  const styleMeta = getStyleMeta(options.style);

  return [
    `Create a ${options.duration}-day travel itinerary for ${destination.name}, ${destination.country}.`,
    ``,
    `Style: ${styleMeta.label} — ${styleMeta.description}`,
    `Vibe: ${destination.vibe}`,
    `Best season: ${destination.bestSeason}`,
    `Highlights to incorporate: ${destination.highlights.join(", ")}`,
    ``,
    `About this destination: ${destination.shortDescription}`,
    `Why visit: ${destination.whyVisit}`,
    ``,
    `Return a JSON object with this exact structure:`,
    `{`,
    `  "days": [`,
    `    {`,
    `      "dayNumber": 1,`,
    `      "theme": "Day theme title",`,
    `      "items": [`,
    `        {`,
    `          "timeOfDay": "Morning" | "Afternoon" | "Evening",`,
    `          "title": "Activity name",`,
    `          "description": "Brief description",`,
    `          "emoji": "relevant emoji",`,
    `          "duration": "estimated time",`,
    `          "tip": "optional insider tip"`,
    `        }`,
    `      ]`,
    `    }`,
    `  ]`,
    `}`,
    ``,
    `Guidelines:`,
    `- 3 items per day (morning, afternoon, evening)`,
    `- Include practical tips where relevant`,
    `- Match the ${styleMeta.label.toLowerCase()} travel style`,
    `- Use the destination's actual highlights and attractions`,
    `- Keep descriptions concise (1-2 sentences)`,
  ].join("\n");
}

/* ── Real AI generation (stub) ──────────────────────────────── */

/**
 * Generate an itinerary using a real AI API.
 *
 * Currently throws — not implemented until an AI provider is connected.
 * When ready, this will:
 *  1. Call buildItineraryPrompt()
 *  2. Send to the configured AI API
 *  3. Parse and validate the response
 *  4. Return a TravelItinerary
 */
export async function generateItinerary(
  destination: Destination,
  options: ItineraryOptions,
): Promise<TravelItinerary> {
  if (isItineraryFlagEnabled("enable_mock_itinerary")) {
    return generateMockItinerary(destination, options);
  }

  // Future: real AI call
  // const prompt = buildItineraryPrompt(destination, options);
  // const response = await callAIProvider(prompt);
  // return parseItineraryResponse(response, destination, options);

  throw new Error(
    "AI itinerary generation is not yet available. " +
    "Enable mock_itinerary flag for testing.",
  );
}

/* ── Mock generation ────────────────────────────────────────── */

/** Time-of-day templates per style. */
const STYLE_TEMPLATES: Record<
  ItineraryStyle,
  readonly { timeOfDay: string; prefix: string; emoji: string }[]
> = {
  first_time: [
    { timeOfDay: "Morning", prefix: "Explore", emoji: "🏛" },
    { timeOfDay: "Afternoon", prefix: "Discover", emoji: "🚶" },
    { timeOfDay: "Evening", prefix: "Experience", emoji: "🌅" },
  ],
  romantic: [
    { timeOfDay: "Morning", prefix: "Stroll through", emoji: "🌸" },
    { timeOfDay: "Afternoon", prefix: "Share", emoji: "💕" },
    { timeOfDay: "Evening", prefix: "Dine at", emoji: "🕯" },
  ],
  budget: [
    { timeOfDay: "Morning", prefix: "Visit free", emoji: "🆓" },
    { timeOfDay: "Afternoon", prefix: "Wander", emoji: "🗺" },
    { timeOfDay: "Evening", prefix: "Find local", emoji: "🍜" },
  ],
  food: [
    { timeOfDay: "Morning", prefix: "Start with", emoji: "☕" },
    { timeOfDay: "Afternoon", prefix: "Sample", emoji: "🍽" },
    { timeOfDay: "Evening", prefix: "Feast on", emoji: "🥘" },
  ],
  adventure: [
    { timeOfDay: "Morning", prefix: "Hike to", emoji: "🥾" },
    { timeOfDay: "Afternoon", prefix: "Try", emoji: "🧗" },
    { timeOfDay: "Evening", prefix: "Unwind at", emoji: "🏕" },
  ],
  family: [
    { timeOfDay: "Morning", prefix: "Take the family to", emoji: "👨‍👩‍👧‍👦" },
    { timeOfDay: "Afternoon", prefix: "Enjoy", emoji: "🎠" },
    { timeOfDay: "Evening", prefix: "Relax at", emoji: "🍕" },
  ],
  luxury: [
    { timeOfDay: "Morning", prefix: "Indulge in", emoji: "🥂" },
    { timeOfDay: "Afternoon", prefix: "Private tour of", emoji: "👑" },
    { timeOfDay: "Evening", prefix: "Reserve", emoji: "✨" },
  ],
  weekend: [
    { timeOfDay: "Morning", prefix: "Hit", emoji: "⚡" },
    { timeOfDay: "Afternoon", prefix: "Quick visit to", emoji: "📸" },
    { timeOfDay: "Evening", prefix: "Cap off at", emoji: "🍸" },
  ],
};

/** Day theme templates based on day position. */
const DAY_THEMES = [
  "Arrival & first impressions",
  "Deep dive",
  "Hidden gems",
  "Local favorites",
  "Culture & history",
  "Nature & outdoors",
  "Final highlights",
];

/**
 * Generate a deterministic mock itinerary from destination data.
 *
 * Uses the destination's highlights, vibe, and name to build
 * a plausible-looking plan without any AI API call.
 */
export function generateMockItinerary(
  destination: Destination,
  options: ItineraryOptions,
): TravelItinerary {
  const templates = STYLE_TEMPLATES[options.style];
  const highlights = destination.highlights;

  const days: ItineraryDay[] = [];

  for (let d = 0; d < options.duration; d++) {
    const theme = DAY_THEMES[d % DAY_THEMES.length];
    const items: ItineraryItem[] = templates.map((tmpl, i) => {
      const highlightIndex = (d * 3 + i) % Math.max(highlights.length, 1);
      const highlight = highlights[highlightIndex] ?? destination.name;

      return {
        timeOfDay: tmpl.timeOfDay,
        title: `${tmpl.prefix} ${highlight}`,
        description: buildMockDescription(
          destination,
          highlight,
          tmpl.timeOfDay,
          options.style,
        ),
        emoji: tmpl.emoji,
        duration: tmpl.timeOfDay === "Evening" ? "2-3 hours" : "2-4 hours",
        tip: buildMockTip(destination, d, i),
      };
    });

    days.push({
      dayNumber: d + 1,
      theme: d === 0
        ? "Arrival & first impressions"
        : d === options.duration - 1
          ? "Final highlights & departure"
          : theme,
      items,
    });
  }

  return {
    destination: destination.name,
    country: destination.country,
    style: options.style,
    duration: options.duration,
    days,
    generatedAt: Date.now(),
    isMock: true,
  };
}

/* ── Mock content helpers ───────────────────────────────────── */

function buildMockDescription(
  dest: Destination,
  highlight: string,
  timeOfDay: string,
  style: ItineraryStyle,
): string {
  const styleMeta = getStyleMeta(style);

  if (timeOfDay === "Morning") {
    return `Start your day with ${highlight.toLowerCase()} in ${dest.name}. ${styleMeta.description.charAt(0).toLowerCase()}${styleMeta.description.slice(1)} await.`;
  }
  if (timeOfDay === "Afternoon") {
    return `Continue to ${highlight.toLowerCase()}, one of ${dest.name}'s standout experiences. The ${dest.vibe.toLowerCase()} atmosphere makes this unforgettable.`;
  }
  return `Wind down with ${highlight.toLowerCase()} as the day ends. ${dest.name} truly shines in the evening.`;
}

function buildMockTip(
  dest: Destination,
  dayIndex: number,
  itemIndex: number,
): string | undefined {
  /* Only add tips to ~40% of items for variety */
  if ((dayIndex + itemIndex) % 3 !== 0) return undefined;

  const tips = [
    `Best during ${dest.bestSeason.toLowerCase()}.`,
    `Book in advance during peak season.`,
    `Locals recommend visiting early to avoid crowds.`,
    `Ask your hotel concierge for the latest recommendations.`,
    `Consider a guided tour for deeper insights.`,
    `Free entry on certain days — check the local calendar.`,
  ];

  return tips[(dayIndex * 3 + itemIndex) % tips.length];
}
