import type { HighlightDetail } from "../highlightDetails";

export const highlightsQ: Record<string, HighlightDetail> = {
  "queen victoria market": {
    title: "Queen Victoria Market",
    description:
      "Queen Victoria Market in Melbourne is Australia's largest open-air market and one of the Southern Hemisphere's great urban food markets, operating since 1878 across 7 hectares of sheds and open stalls selling fresh produce, meat, seafood, deli goods, clothing, and household items to more than a million visitors per year. Its historic 19th-century shed architecture is heritage-listed, and the market remains a genuinely functioning daily market rather than a tourist attraction — beloved by Melburnians for its produce, its noise, and its ethnic food stalls.",
    facts: [
      { label: "Established", value: "1878" },
      { label: "Area", value: "~7 ha" },
      { label: "Annual visitors", value: "~1 million+" },
      { label: "Location", value: "Melbourne, Victoria, Australia" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Queen_Victoria_Market",
  },

  "quinta avenida": {
    title: "Quinta Avenida (5th Avenue, Playa del Carmen)",
    description:
      "La Quinta Avenida (5th Avenue) is Playa del Carmen's famous pedestrianised main street, stretching over 5 km along the Caribbean coast and lined with boutiques, open-air restaurants, cenote bars, artisan shops, and beach clubs. Once a dirt track between a small fishing village and the ferry to Cozumel, it grew through the 1990s into the Riviera Maya's social spine and is busiest in the evening when the street fills with music, mezcal, and wandering travellers.",
    facts: [
      { label: "Length", value: "~5 km (pedestrianised)" },
      { label: "Start", value: "By the ferry pier to Cozumel" },
      { label: "Peak hours", value: "Evening (6 pm onwards)" },
      { label: "Location", value: "Playa del Carmen, Quintana Roo, Mexico" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Playa_del_Carmen",
  },

  quiraing: {
    title: "Quiraing",
    description:
      "The Quiraing is a dramatic landslip landscape on the Trotternish Ridge of the Isle of Skye, Scotland — a tortured terrain of pinnacles, needles, plateaus, and hidden grassy ledges created by a massive ongoing landslide that began after the last Ice Age. The 6.8-km circular hike past the Needle (37 m), the Prison, and the Table (a flat grassy platform hidden within the chaos of rock) is considered one of Scotland's finest walks and most otherworldly landscapes.",
    facts: [
      { label: "Hike distance", value: "~6.8 km circular" },
      { label: "Key formations", value: "The Needle (37 m), the Prison, the Table" },
      { label: "Geological origin", value: "Ongoing post-glacial landslip" },
      { label: "Location", value: "Trotternish, Isle of Skye, Scotland" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Quiraing",
  },
};
