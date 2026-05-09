export interface Destination {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  shortDescription: string;
  whyVisit: string;
  bestSeason: string;
  whyNow: string;
  vibe: string;
  highlights: string[];
  tier: DestinationTier;
  continent: Continent;
}

export type DestinationTier = "curated" | "exclusive" | "first-class";

export type Continent =
  | "europe"
  | "asia"
  | "north-america"
  | "south-america"
  | "africa"
  | "oceania"
  | "middle-east";

export type MachinePhase =
  | "idle"
  | "pulling"
  | "launching"
  | "impact"
  | "result";
