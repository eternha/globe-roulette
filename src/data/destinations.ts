import type { Destination } from "./types";

export const destinations: readonly Destination[] = [
  // ─── EUROPE ────────────────────────────────────────────────
  {
    id: "paris",
    name: "Paris",
    country: "France",
    lat: 48.8566,
    lng: 2.3522,
    shortDescription:
      "The City of Light, where art, gastronomy and romance converge along the Seine.",
    whyVisit:
      "Unrivaled museums, iconic architecture and the world's most celebrated culinary scene.",
    bestSeason:
      "April to June and September to October for mild weather and fewer crowds.",
    whyNow:
      "Major museum renovations are complete, and new rooftop bars are redefining the skyline.",
    vibe: "Romantic & Cultural",
    highlights: ["Eiffel Tower", "Louvre Museum", "Montmartre", "Le Marais"],
    tier: "first-class",
    continent: "europe",
  },
  {
    id: "rome",
    name: "Rome",
    country: "Italy",
    lat: 41.9028,
    lng: 12.4964,
    shortDescription:
      "The Eternal City layers millennia of history beneath a vibrant modern surface.",
    whyVisit:
      "Ancient ruins, Renaissance masterpieces and arguably the best food on Earth.",
    bestSeason:
      "April to May and September to October for warm days without summer heat.",
    whyNow:
      "Jubilee year restorations have unveiled hidden sections of the Colosseum.",
    vibe: "Historic & Indulgent",
    highlights: ["Colosseum", "Vatican Museums", "Trastevere", "Pantheon"],
    tier: "first-class",
    continent: "europe",
  },
  {
    id: "barcelona",
    name: "Barcelona",
    country: "Spain",
    lat: 41.3874,
    lng: 2.1686,
    shortDescription:
      "Gaudi's playground where Mediterranean beaches meet avant-garde architecture.",
    whyVisit:
      "A city that fuses beach life, world-class dining and surreal modernist landmarks.",
    bestSeason:
      "May to June and September for beach weather without peak-summer crowds.",
    whyNow:
      "La Sagrada Familia's final towers are nearing completion after 140 years.",
    vibe: "Vibrant & Artistic",
    highlights: [
      "Sagrada Familia",
      "Park Guell",
      "Gothic Quarter",
      "Barceloneta Beach",
    ],
    tier: "curated",
    continent: "europe",
  },
  {
    id: "london",
    name: "London",
    country: "United Kingdom",
    lat: 51.5074,
    lng: -0.1278,
    shortDescription:
      "A global capital blending royal tradition with cutting-edge culture and cuisine.",
    whyVisit:
      "World-class museums (free entry), West End theatre and an endlessly diverse food scene.",
    bestSeason:
      "May to September for the longest days and warmest weather.",
    whyNow:
      "The Elizabeth Line has transformed cross-city travel and unlocked new neighborhoods.",
    vibe: "Cosmopolitan & Historic",
    highlights: [
      "British Museum",
      "Tower of London",
      "Borough Market",
      "South Bank",
    ],
    tier: "first-class",
    continent: "europe",
  },
  {
    id: "lisbon",
    name: "Lisbon",
    country: "Portugal",
    lat: 38.7223,
    lng: -9.1393,
    shortDescription:
      "Sun-drenched hills draped in azulejo tiles overlooking the Tagus estuary.",
    whyVisit:
      "Affordable charm, creative energy, legendary custard tarts and golden-hour light.",
    bestSeason: "March to May and September to November for pleasant warmth.",
    whyNow:
      "A booming food scene and new cultural hubs make it Europe's coolest capital.",
    vibe: "Soulful & Sunlit",
    highlights: ["Alfama", "Belem Tower", "Time Out Market", "Tram 28"],
    tier: "curated",
    continent: "europe",
  },
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    lat: 36.3932,
    lng: 25.4615,
    shortDescription:
      "Whitewashed cliffs and cobalt domes perched above a volcanic caldera.",
    whyVisit:
      "Arguably the most photogenic island on Earth, with wine, sunsets and ancient ruins.",
    bestSeason: "May to June and September for warm seas without summer crowds.",
    whyNow:
      "New boutique wineries and caldera-edge dining are elevating the experience.",
    vibe: "Dreamy & Cinematic",
    highlights: ["Oia Sunset", "Red Beach", "Fira", "Akrotiri Ruins"],
    tier: "exclusive",
    continent: "europe",
  },
  {
    id: "prague",
    name: "Prague",
    country: "Czech Republic",
    lat: 50.0755,
    lng: 14.4378,
    shortDescription:
      "A fairy-tale city of spires, bridges and bohemian spirit in the heart of Europe.",
    whyVisit:
      "Medieval architecture, world-class beer culture and an affordable arts scene.",
    bestSeason:
      "April to June and September to October for mild weather and fewer tourists.",
    whyNow:
      "Craft breweries and contemporary galleries are reshaping Prague beyond its old-town charm.",
    vibe: "Fairy-tale & Bohemian",
    highlights: [
      "Charles Bridge",
      "Prague Castle",
      "Old Town Square",
      "Mala Strana",
    ],
    tier: "curated",
    continent: "europe",
  },
  {
    id: "amsterdam",
    name: "Amsterdam",
    country: "Netherlands",
    lat: 52.3676,
    lng: 4.9041,
    shortDescription:
      "Canal-laced streets lined with gabled houses, bicycles and world-class museums.",
    whyVisit:
      "Rijksmuseum, Van Gogh, vibrant nightlife and a culture that prizes openness.",
    bestSeason:
      "April to May for tulip season and long spring days.",
    whyNow:
      "Car-free city-center initiatives are making Amsterdam more walkable than ever.",
    vibe: "Free-spirited & Arty",
    highlights: [
      "Rijksmuseum",
      "Anne Frank House",
      "Vondelpark",
      "Jordaan Quarter",
    ],
    tier: "curated",
    continent: "europe",
  },
  {
    id: "dubrovnik",
    name: "Dubrovnik",
    country: "Croatia",
    lat: 42.6507,
    lng: 18.0944,
    shortDescription:
      "A walled Adriatic gem where terracotta rooftops meet turquoise waters.",
    whyVisit:
      "Walk the medieval walls, island-hop by ferry and dine on fresh seafood at sunset.",
    bestSeason: "May to June and September to October to dodge peak crowds.",
    whyNow:
      "Visitor caps are preserving the city's charm while new island routes expand the experience.",
    vibe: "Medieval & Coastal",
    highlights: ["City Walls Walk", "Lokrum Island", "Stradun", "Fort Lovrijenac"],
    tier: "curated",
    continent: "europe",
  },
  {
    id: "florence",
    name: "Florence",
    country: "Italy",
    lat: 43.7696,
    lng: 11.2558,
    shortDescription:
      "The birthplace of the Renaissance wrapped in Tuscan hills and golden light.",
    whyVisit:
      "Michelangelo's David, the Uffizi, Brunelleschi's dome and legendary bistecca.",
    bestSeason: "April to June and September to October for art without the heat.",
    whyNow:
      "Extended museum hours and pedestrianized streets have improved the visitor experience.",
    vibe: "Refined & Timeless",
    highlights: ["Uffizi Gallery", "Duomo", "Ponte Vecchio", "Piazzale Michelangelo"],
    tier: "first-class",
    continent: "europe",
  },
  {
    id: "reykjavik",
    name: "Reykjavik",
    country: "Iceland",
    lat: 64.1466,
    lng: -21.9426,
    shortDescription:
      "The world's northernmost capital — gateway to glaciers, geysers and northern lights.",
    whyVisit:
      "Raw volcanic landscapes, geothermal pools and summer's midnight sun.",
    bestSeason:
      "June to August for midnight sun or September to March for northern lights.",
    whyNow:
      "New geothermal lagoons and highland roads are making more of the interior accessible.",
    vibe: "Wild & Otherworldly",
    highlights: ["Blue Lagoon", "Golden Circle", "Northern Lights", "Hallgrimskirkja"],
    tier: "exclusive",
    continent: "europe",
  },
  {
    id: "vienna",
    name: "Vienna",
    country: "Austria",
    lat: 48.2082,
    lng: 16.3738,
    shortDescription:
      "Imperial grandeur meets coffeehouse culture in the city of music.",
    whyVisit:
      "Palaces, opera, Klimt and the most refined café tradition in Europe.",
    bestSeason: "April to June and September to October for pleasant strolling.",
    whyNow:
      "A wave of natural-wine bars and modern art spaces is adding edge to Vienna's elegance.",
    vibe: "Elegant & Musical",
    highlights: ["Schonbrunn Palace", "Belvedere", "Naschmarkt", "Vienna State Opera"],
    tier: "curated",
    continent: "europe",
  },
  {
    id: "edinburgh",
    name: "Edinburgh",
    country: "United Kingdom",
    lat: 55.9533,
    lng: -3.1883,
    shortDescription:
      "A dramatic fortress city of volcanic crags, cobblestones and literary ghosts.",
    whyVisit:
      "Castle views, whisky heritage, the world's largest arts festival and Arthur's Seat hikes.",
    bestSeason: "May to September for the longest days and Fringe Festival in August.",
    whyNow:
      "New distilleries and a revamped waterfront are expanding the city beyond the Royal Mile.",
    vibe: "Dramatic & Literary",
    highlights: ["Edinburgh Castle", "Arthur's Seat", "Royal Mile", "Scotch Whisky Trail"],
    tier: "curated",
    continent: "europe",
  },
  {
    id: "amalfi-coast",
    name: "Amalfi Coast",
    country: "Italy",
    lat: 40.6333,
    lng: 14.6029,
    shortDescription:
      "Pastel villages clinging to cliffsides above the sapphire Tyrrhenian Sea.",
    whyVisit:
      "Winding coastal roads, lemon groves, seaside trattorias and la dolce vita in its purest form.",
    bestSeason: "May to June and September for warm water without summer gridlock.",
    whyNow:
      "Off-season ferry routes now run longer, making shoulder-season visits easier.",
    vibe: "Glamorous & Scenic",
    highlights: ["Positano", "Ravello Gardens", "Path of the Gods", "Amalfi Cathedral"],
    tier: "exclusive",
    continent: "europe",
  },
  {
    id: "swiss-alps",
    name: "Swiss Alps",
    country: "Switzerland",
    lat: 46.5197,
    lng: 7.9561,
    shortDescription:
      "Snow-capped peaks, alpine meadows and precision-engineered panoramic railways.",
    whyVisit:
      "Ski world-class slopes in winter or hike wildflower trails in summer with train connectivity.",
    bestSeason:
      "December to March for skiing, June to September for hiking.",
    whyNow:
      "New panoramic rail routes are opening previously hard-to-reach valleys.",
    vibe: "Majestic & Pristine",
    highlights: ["Matterhorn", "Jungfraujoch", "Glacier Express", "Lake Lucerne"],
    tier: "exclusive",
    continent: "europe",
  },
  {
    id: "copenhagen",
    name: "Copenhagen",
    country: "Denmark",
    lat: 55.6761,
    lng: 12.5683,
    shortDescription:
      "Scandinavian cool distilled — design, cycling culture and New Nordic cuisine.",
    whyVisit:
      "Noma-inspired restaurants, colorful Nyhavn and a carbon-neutral city vision.",
    bestSeason: "May to September for long daylight and outdoor life.",
    whyNow:
      "The new Noma-successor restaurants and waterfront saunas are drawing global attention.",
    vibe: "Minimalist & Progressive",
    highlights: ["Nyhavn", "Tivoli Gardens", "Christiania", "Torvehallerne Market"],
    tier: "curated",
    continent: "europe",
  },

  // ─── ASIA ─────────────────────────────────────────────────
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    lat: 35.6762,
    lng: 139.6503,
    shortDescription:
      "A neon-lit metropolis where ancient temples sit beside robot restaurants.",
    whyVisit:
      "Michelin-star density, cherry blossoms, anime culture and zen gardens in one city.",
    bestSeason:
      "March to May for cherry blossoms or October to November for autumn foliage.",
    whyNow:
      "Post-Olympics infrastructure upgrades make navigating the city easier than ever.",
    vibe: "Electric & Refined",
    highlights: ["Shibuya Crossing", "Meiji Shrine", "Tsukiji Outer Market", "Akihabara"],
    tier: "first-class",
    continent: "asia",
  },
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    lat: 35.0116,
    lng: 135.7681,
    shortDescription:
      "Japan's cultural heart — thousands of temples draped in bamboo and cherry blossoms.",
    whyVisit:
      "Geisha districts, zen rock gardens, tea ceremonies and the most beautiful autumn in Asia.",
    bestSeason:
      "March to May for cherry blossoms or November for fiery autumn maples.",
    whyNow:
      "New reservation systems at top temples reduce crowds and improve the experience.",
    vibe: "Serene & Traditional",
    highlights: ["Fushimi Inari", "Arashiyama Bamboo", "Kinkaku-ji", "Gion District"],
    tier: "first-class",
    continent: "asia",
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    lat: -8.3405,
    lng: 115.092,
    shortDescription:
      "Island of the Gods where jungle-draped temples meet world-class surf breaks.",
    whyVisit:
      "Spiritual retreats, rice-terrace treks and sunsets that stop conversations.",
    bestSeason:
      "April to October for dry season with clear skies and calm seas.",
    whyNow:
      "New sustainable resorts and cultural preservation programs are elevating the experience.",
    vibe: "Spiritual & Lush",
    highlights: ["Ubud Rice Terraces", "Uluwatu Temple", "Seminyak Beach", "Mount Batur"],
    tier: "curated",
    continent: "asia",
  },
  {
    id: "bangkok",
    name: "Bangkok",
    country: "Thailand",
    lat: 13.7563,
    lng: 100.5018,
    shortDescription:
      "A sensory overload of gilded temples, floating markets and explosive street food.",
    whyVisit:
      "Pad thai at 2 AM, rooftop bars above the Chao Phraya and temple complexes that dazzle.",
    bestSeason:
      "November to February for cooler, drier weather.",
    whyNow:
      "New riverside promenades and creative districts are redefining the city beyond Khao San Road.",
    vibe: "Chaotic & Flavorful",
    highlights: ["Grand Palace", "Chatuchak Market", "Wat Arun", "Chinatown Street Food"],
    tier: "curated",
    continent: "asia",
  },
  {
    id: "singapore",
    name: "Singapore",
    country: "Singapore",
    lat: 1.3521,
    lng: 103.8198,
    shortDescription:
      "A tropical city-state where futuristic gardens meet centuries-old hawker stalls.",
    whyVisit:
      "Michelin-star hawker food, Marina Bay Sands and the world's best airport.",
    bestSeason:
      "February to April for the driest months, though it's warm year-round.",
    whyNow:
      "New nature corridors and heritage trails are revealing hidden layers of the Lion City.",
    vibe: "Futuristic & Orderly",
    highlights: ["Gardens by the Bay", "Marina Bay Sands", "Hawker Centres", "Botanic Gardens"],
    tier: "first-class",
    continent: "asia",
  },
  {
    id: "seoul",
    name: "Seoul",
    country: "South Korea",
    lat: 37.5665,
    lng: 126.978,
    shortDescription:
      "K-pop, palace districts and sizzling BBQ in Asia's most wired megacity.",
    whyVisit:
      "Ancient palaces beside neon nightlife, unbeatable street food and a design-forward culture.",
    bestSeason: "April to May for cherry blossoms or September to November for autumn.",
    whyNow:
      "Hallyu wave tourism and new cultural precincts are drawing global travelers.",
    vibe: "Dynamic & Trend-setting",
    highlights: ["Gyeongbokgung Palace", "Myeongdong", "Bukchon Hanok Village", "Gangnam"],
    tier: "curated",
    continent: "asia",
  },
  {
    id: "hanoi",
    name: "Hanoi",
    country: "Vietnam",
    lat: 21.0285,
    lng: 105.8542,
    shortDescription:
      "French-colonial elegance wrapped in motorbike chaos and pho-scented alleyways.",
    whyVisit:
      "The Old Quarter's narrow lanes, legendary street food and a gateway to Ha Long Bay.",
    bestSeason: "October to December for cool, dry days and clear skies.",
    whyNow:
      "New high-speed rail links and boutique hotels are making the north more accessible.",
    vibe: "Atmospheric & Authentic",
    highlights: ["Old Quarter", "Ho Chi Minh Mausoleum", "Hoan Kiem Lake", "Street Food Tours"],
    tier: "curated",
    continent: "asia",
  },
  {
    id: "hong-kong",
    name: "Hong Kong",
    country: "China",
    lat: 22.3193,
    lng: 114.1694,
    shortDescription:
      "A vertical city of dim-sum parlors, harbor skylines and hiking trails above the clouds.",
    whyVisit:
      "World-class dining, Victoria Peak views and island-hopping on the doorstep.",
    bestSeason: "October to December for cool, clear weather and blue skies.",
    whyNow:
      "New art districts and waterfront revamps are adding cultural depth to the skyline.",
    vibe: "Fast-paced & Flavorful",
    highlights: ["Victoria Peak", "Star Ferry", "Temple Street Market", "Lantau Island"],
    tier: "first-class",
    continent: "asia",
  },
  {
    id: "chiang-mai",
    name: "Chiang Mai",
    country: "Thailand",
    lat: 18.7883,
    lng: 98.9853,
    shortDescription:
      "A mountain-ringed old city of golden temples, night bazaars and Thai cooking schools.",
    whyVisit:
      "Affordable luxury, elephant sanctuaries and hundreds of ornate Buddhist temples.",
    bestSeason: "November to February for cool highland weather and clear skies.",
    whyNow:
      "Ethical elephant experiences and farm-to-table dining are maturing the scene.",
    vibe: "Chill & Spiritual",
    highlights: ["Doi Suthep", "Old City Temples", "Sunday Night Market", "Thai Cooking Classes"],
    tier: "curated",
    continent: "asia",
  },
  {
    id: "maldives",
    name: "Maldives",
    country: "Maldives",
    lat: 3.2028,
    lng: 73.2207,
    shortDescription:
      "Overwater villas floating above impossibly clear lagoons on coral atolls.",
    whyVisit:
      "The ultimate tropical escape — pristine reefs, private islands and underwater dining.",
    bestSeason: "November to April for dry northeast monsoon and calm seas.",
    whyNow:
      "New mid-range guesthouses on local islands make the Maldives more accessible than ever.",
    vibe: "Luxurious & Remote",
    highlights: ["Overwater Villas", "Snorkeling Reefs", "Bioluminescent Beaches", "Underwater Restaurants"],
    tier: "exclusive",
    continent: "asia",
  },
  {
    id: "jaipur",
    name: "Jaipur",
    country: "India",
    lat: 26.9124,
    lng: 75.7873,
    shortDescription:
      "The Pink City — a riot of color, forts and Rajasthani royal heritage.",
    whyVisit:
      "Amber Fort, Hawa Mahal, vibrant bazaars and a gateway to Rajasthan's desert culture.",
    bestSeason: "October to March for cool, dry weather and festival season.",
    whyNow:
      "Heritage hotel restorations and new walking tours reveal hidden palace quarters.",
    vibe: "Regal & Colorful",
    highlights: ["Amber Fort", "Hawa Mahal", "City Palace", "Jantar Mantar"],
    tier: "curated",
    continent: "asia",
  },
  {
    id: "sri-lanka",
    name: "Sri Lanka",
    country: "Sri Lanka",
    lat: 7.8731,
    lng: 80.7718,
    shortDescription:
      "A tear-drop island of tea plantations, ancient ruins and leopard-filled jungles.",
    whyVisit:
      "Train rides through hill country, surf on the south coast and 2,000-year-old temples.",
    bestSeason:
      "December to March for the south and west coasts, April to September for the east.",
    whyNow:
      "Tourism recovery means fewer crowds and better value at world-class resorts.",
    vibe: "Diverse & Unspoiled",
    highlights: ["Sigiriya Rock", "Ella Train Ride", "Galle Fort", "Yala National Park"],
    tier: "curated",
    continent: "asia",
  },
  {
    id: "phuket",
    name: "Phuket",
    country: "Thailand",
    lat: 7.8804,
    lng: 98.3923,
    shortDescription:
      "Thailand's largest island — turquoise bays, limestone karsts and vibrant nightlife.",
    whyVisit:
      "Island-hopping by longtail boat, world-class diving and Thai beach culture at its best.",
    bestSeason: "November to April for dry weather and calm Andaman seas.",
    whyNow:
      "Sustainable tourism initiatives and luxury wellness retreats are elevating Phuket's appeal.",
    vibe: "Tropical & Lively",
    highlights: ["Phi Phi Islands", "Phang Nga Bay", "Old Phuket Town", "Kata Beach"],
    tier: "curated",
    continent: "asia",
  },
  {
    id: "kathmandu",
    name: "Kathmandu",
    country: "Nepal",
    lat: 27.7172,
    lng: 85.324,
    shortDescription:
      "A Himalayan crossroads of pagoda temples, prayer flags and trekking legends.",
    whyVisit:
      "Gateway to Everest Base Camp, rich Buddhist-Hindu heritage and epic mountain views.",
    bestSeason: "October to November for clear skies and trekking season.",
    whyNow:
      "Improved trail infrastructure and new lodges are making Himalayan treks more comfortable.",
    vibe: "Adventurous & Sacred",
    highlights: ["Boudhanath Stupa", "Swayambhunath", "Durbar Square", "Everest Flights"],
    tier: "curated",
    continent: "asia",
  },

  // ─── MIDDLE EAST ──────────────────────────────────────────
  {
    id: "istanbul",
    name: "Istanbul",
    country: "Turkey",
    lat: 41.0082,
    lng: 28.9784,
    shortDescription:
      "A city straddling two continents — Ottoman mosques, Byzantine mosaics and rooftop tea.",
    whyVisit:
      "The Grand Bazaar, Hagia Sophia, Bosphorus cruises and a food scene rivaling any in Europe.",
    bestSeason: "April to May and September to November for mild weather.",
    whyNow:
      "Restored historic sites and a booming creative quarter in Karakoy are fueling a renaissance.",
    vibe: "Mystical & Layered",
    highlights: ["Hagia Sophia", "Grand Bazaar", "Bosphorus Cruise", "Topkapi Palace"],
    tier: "first-class",
    continent: "middle-east",
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "UAE",
    lat: 25.2048,
    lng: 55.2708,
    shortDescription:
      "A superlative city — tallest tower, biggest mall and desert dunes minutes from the skyline.",
    whyVisit:
      "Futuristic architecture, luxury shopping, desert safaris and year-round sunshine.",
    bestSeason: "November to March for pleasant warmth without extreme summer heat.",
    whyNow:
      "New cultural districts and sustainability initiatives are adding substance to the spectacle.",
    vibe: "Opulent & Futuristic",
    highlights: ["Burj Khalifa", "Dubai Mall", "Desert Safari", "Palm Jumeirah"],
    tier: "exclusive",
    continent: "middle-east",
  },
  {
    id: "jerusalem",
    name: "Jerusalem",
    country: "Israel",
    lat: 31.7683,
    lng: 35.2137,
    shortDescription:
      "A holy city sacred to three faiths, layered with 3,000 years of spiritual history.",
    whyVisit:
      "The Western Wall, the Dome of the Rock, the Church of the Holy Sepulchre and vibrant markets.",
    bestSeason: "March to May and September to November for comfortable temperatures.",
    whyNow:
      "New archaeological discoveries and culinary tours are revealing fresh dimensions.",
    vibe: "Sacred & Profound",
    highlights: ["Western Wall", "Old City", "Mount of Olives", "Mahane Yehuda Market"],
    tier: "first-class",
    continent: "middle-east",
  },
  {
    id: "petra",
    name: "Petra",
    country: "Jordan",
    lat: 30.3285,
    lng: 35.4444,
    shortDescription:
      "A rose-red city carved into desert cliffs — one of the New Seven Wonders of the World.",
    whyVisit:
      "Walk through the Siq to the Treasury at dawn for one of travel's most iconic moments.",
    bestSeason: "March to May and September to November for comfortable desert temperatures.",
    whyNow:
      "Night tours by candlelight and new trail openings are enhancing the experience.",
    vibe: "Ancient & Awe-inspiring",
    highlights: ["The Treasury", "The Siq", "Monastery Trail", "Petra by Night"],
    tier: "exclusive",
    continent: "middle-east",
  },

  // ─── NORTH AMERICA ────────────────────────────────────────
  {
    id: "new-york",
    name: "New York City",
    country: "United States",
    lat: 40.7128,
    lng: -74.006,
    shortDescription:
      "The city that never sleeps — Broadway lights, Central Park and a skyline that defines ambition.",
    whyVisit:
      "Unmatched cultural density, food from every nation and iconic neighborhoods on every block.",
    bestSeason: "April to June and September to November for mild weather and fall foliage.",
    whyNow:
      "New Hudson Yards developments and revitalized Brooklyn waterfront offer fresh perspectives.",
    vibe: "Relentless & Iconic",
    highlights: ["Central Park", "Times Square", "Brooklyn Bridge", "Metropolitan Museum"],
    tier: "first-class",
    continent: "north-america",
  },
  {
    id: "san-francisco",
    name: "San Francisco",
    country: "United States",
    lat: 37.7749,
    lng: -122.4194,
    shortDescription:
      "Fog-kissed hills, the Golden Gate and a counter-culture spirit that shaped the modern world.",
    whyVisit:
      "Cable cars, Alcatraz, Chinatown, wine country on the doorstep and sourdough everything.",
    bestSeason: "September to November for the warmest weather and clear skies.",
    whyNow:
      "Revitalized neighborhoods and new waterfront parks are breathing fresh life into the city.",
    vibe: "Progressive & Scenic",
    highlights: ["Golden Gate Bridge", "Alcatraz", "Fisherman's Wharf", "Cable Cars"],
    tier: "first-class",
    continent: "north-america",
  },
  {
    id: "hawaii",
    name: "Hawaii",
    country: "United States",
    lat: 20.7984,
    lng: -156.3319,
    shortDescription:
      "Volcanic islands draped in rainforest, with surfable swells and aloha spirit.",
    whyVisit:
      "Active volcanoes, world-class surfing, snorkeling with sea turtles and luau feasts.",
    bestSeason:
      "April to October for dry season, November to March for big-wave surfing.",
    whyNow:
      "Regenerative tourism programs and cultural immersion experiences are deepening visits.",
    vibe: "Tropical & Adventurous",
    highlights: ["Waikiki Beach", "Na Pali Coast", "Volcanoes National Park", "Maui Road to Hana"],
    tier: "first-class",
    continent: "north-america",
  },
  {
    id: "cancun",
    name: "Cancun",
    country: "Mexico",
    lat: 21.1619,
    lng: -86.8515,
    shortDescription:
      "Caribbean turquoise waters backed by ancient Mayan ruins in the Yucatan.",
    whyVisit:
      "All-inclusive beach resorts, cenote swimming, Chichen Itza day trips and vibrant nightlife.",
    bestSeason: "December to April for dry weather and calm Caribbean seas.",
    whyNow:
      "The Tren Maya railway now connects coastal resorts to inland Mayan sites.",
    vibe: "Beachy & Energetic",
    highlights: ["Chichen Itza", "Cenote Swimming", "Isla Mujeres", "Tulum Ruins"],
    tier: "curated",
    continent: "north-america",
  },
  {
    id: "mexico-city",
    name: "Mexico City",
    country: "Mexico",
    lat: 19.4326,
    lng: -99.1332,
    shortDescription:
      "A sprawling capital of Aztec ruins, muralist art and taco stands on every corner.",
    whyVisit:
      "Frida Kahlo's house, floating gardens of Xochimilco, mezcal bars and world-class museums.",
    bestSeason: "March to May for warm, dry weather before the rainy season.",
    whyNow:
      "A global food renaissance has put CDMX on every chef's must-visit list.",
    vibe: "Creative & Flavorful",
    highlights: ["Frida Kahlo Museum", "Chapultepec Castle", "Xochimilco", "Coyoacan"],
    tier: "curated",
    continent: "north-america",
  },
  {
    id: "havana",
    name: "Havana",
    country: "Cuba",
    lat: 23.1136,
    lng: -82.3666,
    shortDescription:
      "A time-capsule capital of pastel facades, vintage cars and live salsa on every corner.",
    whyVisit:
      "Crumbling grandeur, cigar culture, rum cocktails and a music scene that pulses nonstop.",
    bestSeason: "November to April for dry season and comfortable temperatures.",
    whyNow:
      "Private restaurants and boutique guesthouses are raising the hospitality standard.",
    vibe: "Nostalgic & Musical",
    highlights: ["Malecon", "Old Havana", "Tropicana", "Vinales Valley"],
    tier: "curated",
    continent: "north-america",
  },
  {
    id: "vancouver",
    name: "Vancouver",
    country: "Canada",
    lat: 49.2827,
    lng: -123.1207,
    shortDescription:
      "Mountains-meet-ocean city with sushi rivaling Tokyo and ski slopes 30 minutes away.",
    whyVisit:
      "Stanley Park, Granville Island, incredible Asian cuisine and outdoor adventure year-round.",
    bestSeason: "June to September for warm days, mountain hiking and festival season.",
    whyNow:
      "Indigenous cultural experiences and new nature trails are enriching the West Coast vibe.",
    vibe: "Outdoorsy & Multicultural",
    highlights: ["Stanley Park", "Granville Island", "Capilano Bridge", "Grouse Mountain"],
    tier: "curated",
    continent: "north-america",
  },
  {
    id: "costa-rica",
    name: "Costa Rica",
    country: "Costa Rica",
    lat: 9.7489,
    lng: -83.7534,
    shortDescription:
      "Cloud forests, volcanoes and two coastlines teeming with wildlife — pura vida.",
    whyVisit:
      "Zip-line through canopy, surf both oceans and spot sloths, toucans and sea turtles.",
    bestSeason: "December to April for dry season on the Pacific coast.",
    whyNow:
      "Leading the world in ecotourism with new carbon-neutral lodges and wildlife corridors.",
    vibe: "Eco-adventure & Relaxed",
    highlights: ["Arenal Volcano", "Monteverde Cloud Forest", "Manuel Antonio", "Tortuguero"],
    tier: "curated",
    continent: "north-america",
  },
  {
    id: "new-orleans",
    name: "New Orleans",
    country: "United States",
    lat: 29.9511,
    lng: -90.0715,
    shortDescription:
      "Jazz, gumbo and voodoo in a city that celebrates life harder than anywhere in America.",
    whyVisit:
      "Live jazz on Frenchmen Street, Creole cuisine, streetcar rides and carnival culture.",
    bestSeason: "February to May for Mardi Gras through Jazz Fest with mild weather.",
    whyNow:
      "A revitalized food scene and new music venues are keeping the Crescent City vibrant.",
    vibe: "Soulful & Festive",
    highlights: ["French Quarter", "Frenchmen Street Jazz", "Garden District", "Beignets at Cafe du Monde"],
    tier: "curated",
    continent: "north-america",
  },
  {
    id: "banff",
    name: "Banff",
    country: "Canada",
    lat: 51.1784,
    lng: -115.5708,
    shortDescription:
      "Turquoise lakes and towering Rockies in Canada's most spectacular national park.",
    whyVisit:
      "Lake Louise, Moraine Lake, world-class skiing and wildlife encounters in pristine wilderness.",
    bestSeason: "June to September for hiking or December to March for skiing.",
    whyNow:
      "New shuttle systems reduce traffic in the park while improving access to remote trailheads.",
    vibe: "Majestic & Wild",
    highlights: ["Lake Louise", "Moraine Lake", "Icefields Parkway", "Johnston Canyon"],
    tier: "exclusive",
    continent: "north-america",
  },
  {
    id: "los-angeles",
    name: "Los Angeles",
    country: "United States",
    lat: 33.9425,
    lng: -118.408,
    shortDescription:
      "Beach culture, film studios and taco trucks under perpetual sunshine.",
    whyVisit:
      "Hollywood glamour, Santa Monica Pier, Getty Museum and the most diverse food city in America.",
    bestSeason: "March to May and September to November for warm days without summer smog.",
    whyNow:
      "Metro expansions and new arts districts are making car-free LA a growing reality.",
    vibe: "Laid-back & Creative",
    highlights: ["Hollywood Sign", "Santa Monica", "Getty Center", "Griffith Observatory"],
    tier: "first-class",
    continent: "north-america",
  },
  {
    id: "miami",
    name: "Miami",
    country: "United States",
    lat: 25.7617,
    lng: -80.1918,
    shortDescription:
      "Art Deco glamour, Cuban coffee and turquoise waters in America's tropical gateway.",
    whyVisit:
      "South Beach, Wynwood murals, Little Havana's energy and Everglades airboat adventures.",
    bestSeason: "November to April for warm, dry weather outside hurricane season.",
    whyNow:
      "New cultural institutions and a booming food scene make Miami more than just beaches.",
    vibe: "Glamorous & Tropical",
    highlights: ["South Beach", "Wynwood Walls", "Little Havana", "Everglades"],
    tier: "curated",
    continent: "north-america",
  },

  // ─── SOUTH AMERICA ────────────────────────────────────────
  {
    id: "rio-de-janeiro",
    name: "Rio de Janeiro",
    country: "Brazil",
    lat: -22.9068,
    lng: -43.1729,
    shortDescription:
      "Dramatic peaks, golden beaches and samba rhythms define the Marvelous City.",
    whyVisit:
      "Christ the Redeemer, Copacabana, Carnival and a nightlife that runs until sunrise.",
    bestSeason: "December to March for summer beach weather or February for Carnival.",
    whyNow:
      "Revitalized port districts and new cultural centers are adding depth beyond the beaches.",
    vibe: "Exuberant & Breathtaking",
    highlights: ["Christ the Redeemer", "Sugarloaf Mountain", "Copacabana", "Ipanema"],
    tier: "first-class",
    continent: "south-america",
  },
  {
    id: "buenos-aires",
    name: "Buenos Aires",
    country: "Argentina",
    lat: -34.6037,
    lng: -58.3816,
    shortDescription:
      "The Paris of South America — tango, steak and bookshops in tree-lined barrios.",
    whyVisit:
      "Late-night milongas, world-class wine, leather markets and passionate football culture.",
    bestSeason:
      "March to May and September to November for mild autumn and spring weather.",
    whyNow:
      "A favorable exchange rate and booming speakeasy scene make BA the value pick of the year.",
    vibe: "Passionate & Cultured",
    highlights: ["La Boca", "San Telmo Market", "Recoleta Cemetery", "Palermo Soho"],
    tier: "curated",
    continent: "south-america",
  },
  {
    id: "machu-picchu",
    name: "Machu Picchu",
    country: "Peru",
    lat: -13.1631,
    lng: -72.545,
    shortDescription:
      "An Incan citadel floating above the clouds in the Andes — a bucket-list wonder.",
    whyVisit:
      "Hike the Inca Trail, watch sunrise over the ruins and feel the weight of lost civilizations.",
    bestSeason: "May to September for dry season with clear mountain views.",
    whyNow:
      "New timed-entry tickets and trail maintenance preserve the site while reducing crowding.",
    vibe: "Mystical & Monumental",
    highlights: ["Inca Trail", "Sun Gate", "Huayna Picchu", "Sacred Valley"],
    tier: "exclusive",
    continent: "south-america",
  },
  {
    id: "patagonia",
    name: "Patagonia",
    country: "Argentina",
    lat: -50.3402,
    lng: -72.2648,
    shortDescription:
      "The end of the world — glaciers, granite spires and windswept steppe at Earth's edge.",
    whyVisit:
      "Perito Moreno Glacier, Torres del Paine and some of the most dramatic hiking on the planet.",
    bestSeason: "November to March for the warmest weather and longest daylight hours.",
    whyNow:
      "Improved refugio networks on the W Trek and new glamping options make it more accessible.",
    vibe: "Epic & Remote",
    highlights: ["Torres del Paine", "Perito Moreno Glacier", "El Chalten", "Beagle Channel"],
    tier: "exclusive",
    continent: "south-america",
  },
  {
    id: "galapagos",
    name: "Galapagos Islands",
    country: "Ecuador",
    lat: -0.9538,
    lng: -90.9656,
    shortDescription:
      "Darwin's living laboratory — fearless wildlife on volcanic islands in the Pacific.",
    whyVisit:
      "Snorkel with sea lions, walk among giant tortoises and witness evolution in action.",
    bestSeason:
      "June to November for cooler water with more marine life, December to May for warmer seas.",
    whyNow:
      "Strict visitor caps keep the experience intimate and the ecosystem thriving.",
    vibe: "Pristine & Scientific",
    highlights: ["Giant Tortoises", "Snorkeling with Sea Lions", "Blue-footed Boobies", "Volcanic Landscapes"],
    tier: "exclusive",
    continent: "south-america",
  },
  {
    id: "cartagena",
    name: "Cartagena",
    country: "Colombia",
    lat: 10.391,
    lng: -75.5144,
    shortDescription:
      "A walled Caribbean port of bougainvillea-draped balconies and Afro-Colombian beats.",
    whyVisit:
      "Colonial architecture, fresh ceviche, rooftop salsa and island day trips.",
    bestSeason: "December to April for dry weather and festive atmosphere.",
    whyNow:
      "A flourishing culinary scene and restored historic mansions are redefining Colombian travel.",
    vibe: "Colorful & Rhythmic",
    highlights: ["Walled City", "Rosario Islands", "Getsemani", "Castillo San Felipe"],
    tier: "curated",
    continent: "south-america",
  },
  {
    id: "lima",
    name: "Lima",
    country: "Peru",
    lat: -12.0464,
    lng: -77.0428,
    shortDescription:
      "South America's culinary capital perched on desert cliffs above the Pacific.",
    whyVisit:
      "Ceviche at Central, pre-Incan ruins, Miraflores boardwalk and pisco sours at sunset.",
    bestSeason: "December to March for sunny skies and warm temperatures.",
    whyNow:
      "Lima's restaurant scene continues to climb global rankings, drawing food pilgrims worldwide.",
    vibe: "Gastronomic & Coastal",
    highlights: ["Central Restaurant", "Miraflores", "Huaca Pucllana", "Barranco"],
    tier: "curated",
    continent: "south-america",
  },
  {
    id: "medellin",
    name: "Medellin",
    country: "Colombia",
    lat: 6.2476,
    lng: -75.5658,
    shortDescription:
      "The City of Eternal Spring — innovation, street art and mountain-ringed warmth.",
    whyVisit:
      "Cable-car commutes over green valleys, thriving nightlife and Colombia's transformation story.",
    bestSeason: "December to March and June to September for the driest months.",
    whyNow:
      "Digital nomad infrastructure and world-class hostels make Medellin a long-stay favorite.",
    vibe: "Innovative & Warm",
    highlights: ["Comuna 13", "Metrocable", "El Poblado", "Guatape Day Trip"],
    tier: "curated",
    continent: "south-america",
  },
  {
    id: "iguazu-falls",
    name: "Iguazu Falls",
    country: "Argentina",
    lat: -25.6953,
    lng: -54.4367,
    shortDescription:
      "275 cascades thundering through subtropical jungle on the Argentina-Brazil border.",
    whyVisit:
      "Stand at the Devil's Throat and feel the spray of the most powerful waterfall system on Earth.",
    bestSeason: "March to May and August to October for strong water flow without summer heat.",
    whyNow:
      "New walkways and moonlight viewing tours are enhancing the visitor experience.",
    vibe: "Thunderous & Primal",
    highlights: ["Devil's Throat", "Upper Circuit", "Boat Safari", "Jungle Trails"],
    tier: "exclusive",
    continent: "south-america",
  },

  // ─── AFRICA ───────────────────────────────────────────────
  {
    id: "cape-town",
    name: "Cape Town",
    country: "South Africa",
    lat: -33.9249,
    lng: 18.4241,
    shortDescription:
      "Table Mountain presides over vineyards, beaches and one of Africa's most dynamic cities.",
    whyVisit:
      "Hike Table Mountain, taste Stellenbosch wines, visit Robben Island and surf at Muizenberg.",
    bestSeason: "November to March for summer warmth and long daylight hours.",
    whyNow:
      "Thriving street-food markets and new wine routes are deepening the culinary scene.",
    vibe: "Dramatic & Diverse",
    highlights: ["Table Mountain", "Cape Winelands", "Robben Island", "Boulders Beach Penguins"],
    tier: "first-class",
    continent: "africa",
  },
  {
    id: "marrakech",
    name: "Marrakech",
    country: "Morocco",
    lat: 31.6295,
    lng: -7.9811,
    shortDescription:
      "A sensory maze of spice souks, mosaic riads and Atlas Mountain views.",
    whyVisit:
      "Get lost in the medina, sip mint tea on rooftop terraces and day-trip to the Sahara.",
    bestSeason: "March to May and September to November for warm days without summer heat.",
    whyNow:
      "Restored riads and farm-to-table Moroccan dining are elevating the Red City.",
    vibe: "Exotic & Sensory",
    highlights: ["Jemaa el-Fnaa", "Majorelle Garden", "Bahia Palace", "Souks"],
    tier: "curated",
    continent: "africa",
  },
  {
    id: "serengeti",
    name: "Serengeti",
    country: "Tanzania",
    lat: -2.3333,
    lng: 34.8333,
    shortDescription:
      "Endless plains where the Great Migration thunders across Africa's most iconic savanna.",
    whyVisit:
      "Witness millions of wildebeest crossing crocodile-filled rivers — nature at its most raw.",
    bestSeason:
      "June to October for the dry season and river crossings, January to February for calving.",
    whyNow:
      "New low-impact camps and conservation levies are funding anti-poaching efforts.",
    vibe: "Wild & Untamed",
    highlights: ["Great Migration", "Big Five Safaris", "Balloon Safaris", "Ngorongoro Crater"],
    tier: "exclusive",
    continent: "africa",
  },
  {
    id: "cairo",
    name: "Cairo",
    country: "Egypt",
    lat: 30.0444,
    lng: 31.2357,
    shortDescription:
      "The Pyramids of Giza rise at the edge of a teeming, chaotic, unforgettable megacity.",
    whyVisit:
      "The last surviving Ancient Wonder, the Grand Egyptian Museum and Nile felucca rides.",
    bestSeason: "October to April for cooler temperatures and clear desert skies.",
    whyNow:
      "The Grand Egyptian Museum has finally opened, reshaping the entire visitor experience.",
    vibe: "Ancient & Bustling",
    highlights: ["Pyramids of Giza", "Grand Egyptian Museum", "Khan el-Khalili", "Nile Cruise"],
    tier: "first-class",
    continent: "africa",
  },
  {
    id: "zanzibar",
    name: "Zanzibar",
    country: "Tanzania",
    lat: -6.1659,
    lng: 39.1989,
    shortDescription:
      "A spice island of white-sand beaches, turquoise shallows and Stone Town's winding alleys.",
    whyVisit:
      "Snorkel coral reefs, tour spice plantations and watch dhows sail at golden hour.",
    bestSeason: "June to October for dry season and comfortable temperatures.",
    whyNow:
      "Boutique eco-lodges and marine conservation programs are raising the bar for island stays.",
    vibe: "Exotic & Serene",
    highlights: ["Stone Town", "Nungwi Beach", "Spice Tours", "Prison Island"],
    tier: "curated",
    continent: "africa",
  },
  {
    id: "victoria-falls",
    name: "Victoria Falls",
    country: "Zimbabwe",
    lat: -17.9243,
    lng: 25.8572,
    shortDescription:
      "The Smoke That Thunders — the world's largest curtain of falling water.",
    whyVisit:
      "Bungee jump over the gorge, swim at Devil's Pool and feel the earth shake from the spray.",
    bestSeason:
      "February to May for peak water flow, September to December for lower water and Devil's Pool.",
    whyNow:
      "New adventure activities and improved park infrastructure make it a year-round destination.",
    vibe: "Thunderous & Thrilling",
    highlights: ["Devil's Pool", "Helicopter Flight", "Zambezi Sunset Cruise", "Bungee Jump"],
    tier: "exclusive",
    continent: "africa",
  },
  {
    id: "kilimanjaro",
    name: "Mount Kilimanjaro",
    country: "Tanzania",
    lat: -3.0674,
    lng: 37.3556,
    shortDescription:
      "Africa's highest peak — a free-standing volcano you can summit without ropes.",
    whyVisit:
      "Stand on the Roof of Africa at sunrise, crossing five climate zones in a single trek.",
    bestSeason: "January to March and June to October for the clearest summit conditions.",
    whyNow:
      "Improved Lemosho and Northern Circuit routes reduce congestion on the mountain.",
    vibe: "Epic & Transformative",
    highlights: ["Uhuru Peak Sunrise", "Lemosho Route", "Barranco Wall", "Five Climate Zones"],
    tier: "exclusive",
    continent: "africa",
  },
  {
    id: "kruger",
    name: "Kruger National Park",
    country: "South Africa",
    lat: -23.9884,
    lng: 31.5547,
    shortDescription:
      "South Africa's flagship safari park — Big Five encounters in vast bushveld.",
    whyVisit:
      "Self-drive safaris, luxury lodges and some of the best wildlife viewing in Africa.",
    bestSeason: "May to September for dry winter when animals gather at waterholes.",
    whyNow:
      "Community-owned conservancies bordering Kruger offer authentic stays that fund local development.",
    vibe: "Wild & Immersive",
    highlights: ["Big Five Safaris", "Sunrise Game Drives", "Bush Walks", "Treehouse Lodges"],
    tier: "exclusive",
    continent: "africa",
  },
  {
    id: "luxor",
    name: "Luxor",
    country: "Egypt",
    lat: 25.6872,
    lng: 32.6396,
    shortDescription:
      "The world's greatest open-air museum — pharaonic tombs and temples lining the Nile.",
    whyVisit:
      "Valley of the Kings, Karnak Temple and hot-air balloon rides over the West Bank at dawn.",
    bestSeason: "October to April for comfortable temperatures in the desert heat.",
    whyNow:
      "Newly opened tomb chambers and the restored Avenue of Sphinxes enhance the ancient experience.",
    vibe: "Monumental & Timeless",
    highlights: ["Valley of the Kings", "Karnak Temple", "Hot Air Balloon", "Hatshepsut Temple"],
    tier: "curated",
    continent: "africa",
  },
  {
    id: "madagascar",
    name: "Madagascar",
    country: "Madagascar",
    lat: -18.7669,
    lng: 46.8691,
    shortDescription:
      "An island continent of lemurs, baobabs and biodiversity found nowhere else on Earth.",
    whyVisit:
      "Spot ring-tailed lemurs, walk the Avenue of Baobabs and dive pristine coral reefs.",
    bestSeason: "April to November for dry season with clear skies and cooler temperatures.",
    whyNow:
      "New eco-lodges and community conservation projects are opening remote regions responsibly.",
    vibe: "Untouched & Extraordinary",
    highlights: ["Avenue of Baobabs", "Lemur Encounters", "Tsingy de Bemaraha", "Nosy Be"],
    tier: "exclusive",
    continent: "africa",
  },

  // ─── OCEANIA ──────────────────────────────────────────────
  {
    id: "sydney",
    name: "Sydney",
    country: "Australia",
    lat: -33.8688,
    lng: 151.2093,
    shortDescription:
      "Harbor icons, golden surf beaches and a food scene shaped by Pacific Rim flavors.",
    whyVisit:
      "The Opera House, Bondi to Coogee walk, the Blue Mountains and a thriving brunch culture.",
    bestSeason: "September to November and March to May for mild weather without summer crowds.",
    whyNow:
      "New harbor-side precincts and Indigenous cultural experiences are enriching the city.",
    vibe: "Laid-back & Stunning",
    highlights: ["Sydney Opera House", "Bondi Beach", "Harbour Bridge", "Blue Mountains"],
    tier: "first-class",
    continent: "oceania",
  },
  {
    id: "queenstown",
    name: "Queenstown",
    country: "New Zealand",
    lat: -45.0312,
    lng: 168.6626,
    shortDescription:
      "The adventure capital of the world — bungee, ski and jet-boat beneath the Remarkables.",
    whyVisit:
      "Skydive over Lake Wakatipu, ski Coronet Peak and chase waterfalls in Milford Sound.",
    bestSeason:
      "June to August for skiing, December to February for hiking and summer adventures.",
    whyNow:
      "New Great Walks and sustainability pledges are balancing adventure with conservation.",
    vibe: "Adrenaline & Alpine",
    highlights: ["Milford Sound", "Bungee Jumping", "Lake Wakatipu", "Remarkables Skiing"],
    tier: "exclusive",
    continent: "oceania",
  },
  {
    id: "great-barrier-reef",
    name: "Great Barrier Reef",
    country: "Australia",
    lat: -18.2871,
    lng: 147.6992,
    shortDescription:
      "The world's largest coral reef system — 2,300 km of underwater wonderland.",
    whyVisit:
      "Snorkel with reef sharks, spot sea turtles and dive one of the natural wonders of the world.",
    bestSeason: "June to October for calm seas, clear water and whale season.",
    whyNow:
      "Coral restoration breakthroughs are showing results and eco-certified operators lead the way.",
    vibe: "Pristine & Vibrant",
    highlights: ["Snorkeling", "Scuba Diving", "Whitehaven Beach", "Reef Flights"],
    tier: "exclusive",
    continent: "oceania",
  },
  {
    id: "fiji",
    name: "Fiji",
    country: "Fiji",
    lat: -17.7134,
    lng: 178.065,
    shortDescription:
      "333 tropical islands of crystal lagoons, coral gardens and the warmest smiles in the Pacific.",
    whyVisit:
      "Private-island resorts, world-class diving, village stays and the happiest people you'll meet.",
    bestSeason: "May to October for dry season with blue skies and calm seas.",
    whyNow:
      "Community-based tourism and marine reserves are creating more meaningful island experiences.",
    vibe: "Paradise & Welcoming",
    highlights: ["Yasawa Islands", "Cloud 9", "Coral Reefs", "Traditional Kava Ceremony"],
    tier: "exclusive",
    continent: "oceania",
  },
  {
    id: "bora-bora",
    name: "Bora Bora",
    country: "French Polynesia",
    lat: -16.5004,
    lng: -151.7415,
    shortDescription:
      "A turquoise lagoon encircling a volcanic peak — the definitive tropical fantasy.",
    whyVisit:
      "Overwater bungalows, shark-feeding snorkels and sunsets that redefine the color orange.",
    bestSeason: "May to October for dry season and slightly cooler temperatures.",
    whyNow:
      "New eco-luxury resorts are raising sustainability standards in French Polynesia.",
    vibe: "Ultra-luxurious & Idyllic",
    highlights: ["Overwater Bungalows", "Matira Beach", "Lagoon Snorkeling", "Mount Otemanu Views"],
    tier: "exclusive",
    continent: "oceania",
  },
  {
    id: "melbourne",
    name: "Melbourne",
    country: "Australia",
    lat: -37.8136,
    lng: 144.9631,
    shortDescription:
      "Australia's cultural capital — laneway street art, third-wave coffee and live music.",
    whyVisit:
      "World-class dining, the Great Ocean Road, MCG cricket and a thriving arts scene.",
    bestSeason: "March to May and September to November for mild weather and events.",
    whyNow:
      "A booming natural-wine scene and new rooftop bars are cementing Melbourne's cool factor.",
    vibe: "Hip & Cultural",
    highlights: ["Laneways", "Great Ocean Road", "Queen Victoria Market", "NGV"],
    tier: "curated",
    continent: "oceania",
  },
  {
    id: "uluru",
    name: "Uluru",
    country: "Australia",
    lat: -25.3444,
    lng: 131.0369,
    shortDescription:
      "A sacred red monolith rising from the outback — Australia's spiritual heart.",
    whyVisit:
      "Watch the rock change color at sunset, stargaze in zero light pollution and learn from Anangu guides.",
    bestSeason: "May to September for mild desert temperatures and clear skies.",
    whyNow:
      "Indigenous-led cultural experiences have deepened the spiritual dimension of visits.",
    vibe: "Sacred & Stark",
    highlights: ["Sunset Viewing", "Field of Light", "Kata Tjuta", "Aboriginal Cultural Tours"],
    tier: "exclusive",
    continent: "oceania",
  },

  // ─── ICONIC ADDITIONS ─────────────────────────────────────
  {
    id: "seville",
    name: "Seville",
    country: "Spain",
    lat: 37.3891,
    lng: -5.9845,
    shortDescription:
      "Flamenco's birthplace — orange-blossom plazas, Moorish palaces and fiery tapas nights.",
    whyVisit:
      "Alcazar gardens, the world's largest Gothic cathedral and an unmatched tapas-bar-crawl culture.",
    bestSeason: "March to May for spring festivals and warm evenings.",
    whyNow:
      "Feria de Abril and Holy Week celebrations remain among Europe's most spectacular festivals.",
    vibe: "Fiery & Festive",
    highlights: ["Alcazar", "Plaza de Espana", "Flamenco Shows", "Triana Quarter"],
    tier: "curated",
    continent: "europe",
  },
  {
    id: "budapest",
    name: "Budapest",
    country: "Hungary",
    lat: 47.4979,
    lng: 19.0402,
    shortDescription:
      "The Pearl of the Danube — thermal baths, ruin bars and grand boulevards split by the river.",
    whyVisit:
      "Soak in Szechenyi Baths, explore ruin bars in the Jewish Quarter and cruise the Danube at night.",
    bestSeason: "April to June and September to October for pleasant warmth and fewer crowds.",
    whyNow:
      "New ruin-bar concepts and street-food halls are keeping Budapest at the forefront of cool.",
    vibe: "Eclectic & Thermal",
    highlights: ["Szechenyi Baths", "Ruin Bars", "Parliament Building", "Fisherman's Bastion"],
    tier: "curated",
    continent: "europe",
  },
  {
    id: "lofoten",
    name: "Lofoten Islands",
    country: "Norway",
    lat: 68.2341,
    lng: 14.5638,
    shortDescription:
      "Arctic islands of jagged peaks, cod-drying racks and midnight sun reflected in fjords.",
    whyVisit:
      "Kayak between fishing villages, hike dramatic ridges and photograph the northern lights.",
    bestSeason:
      "June to August for midnight sun or September to March for northern lights.",
    whyNow:
      "Sustainable fishing tourism and Arctic surfing are putting Lofoten on the global adventure map.",
    vibe: "Raw & Arctic",
    highlights: ["Reine Village", "Midnight Sun", "Arctic Surfing", "Northern Lights"],
    tier: "exclusive",
    continent: "europe",
  },
  {
    id: "lake-como",
    name: "Lake Como",
    country: "Italy",
    lat: 45.9937,
    lng: 9.2572,
    shortDescription:
      "A glittering Alpine lake ringed by pastel villas, cypress trees and mountain peaks.",
    whyVisit:
      "Ferry between lakeside villages, tour palatial gardens and dine at water's-edge trattorias.",
    bestSeason: "April to June and September to October for warm days and manageable crowds.",
    whyNow:
      "New ferry routes and boutique hotels in lesser-known villages are spreading the magic.",
    vibe: "Romantic & Refined",
    highlights: ["Bellagio", "Villa del Balbianello", "Varenna", "Ferry Hopping"],
    tier: "exclusive",
    continent: "europe",
  },
  {
    id: "cinque-terre",
    name: "Cinque Terre",
    country: "Italy",
    lat: 44.1461,
    lng: 9.6439,
    shortDescription:
      "Five candy-colored villages clinging to the Ligurian cliffs connected by hiking trails.",
    whyVisit:
      "Hike between villages above the sea, eat pesto in its birthplace and swim in hidden coves.",
    bestSeason: "May to June and September for hiking weather without peak crowds.",
    whyNow:
      "Trail restoration and visitor management are making the experience more enjoyable.",
    vibe: "Picturesque & Active",
    highlights: ["Sentiero Azzurro", "Vernazza", "Manarola Sunset", "Local Pesto"],
    tier: "curated",
    continent: "europe",
  },
  {
    id: "osaka",
    name: "Osaka",
    country: "Japan",
    lat: 34.6937,
    lng: 135.5023,
    shortDescription:
      "Japan's kitchen — a neon-lit city of street food, comedy culture and castle views.",
    whyVisit:
      "Dotonbori's glowing signs, takoyaki stands, Osaka Castle and a direct local warmth.",
    bestSeason: "March to May for cherry blossoms or October to November for autumn color.",
    whyNow:
      "New food halls and sake breweries are making Osaka a world-class culinary destination.",
    vibe: "Boisterous & Delicious",
    highlights: ["Dotonbori", "Osaka Castle", "Kuromon Market", "Universal Studios Japan"],
    tier: "curated",
    continent: "asia",
  },
  {
    id: "taipei",
    name: "Taipei",
    country: "Taiwan",
    lat: 25.033,
    lng: 121.5654,
    shortDescription:
      "Night markets, hot springs and temple-dotted mountains in one of Asia's friendliest cities.",
    whyVisit:
      "Shilin Night Market, Taipei 101, Jiufen village and bubble tea from its birthplace.",
    bestSeason: "October to December for mild temperatures and clear skies.",
    whyNow:
      "A booming craft-beer and artisan scene is adding creative edge to traditional charm.",
    vibe: "Friendly & Delicious",
    highlights: ["Shilin Night Market", "Taipei 101", "Jiufen", "Beitou Hot Springs"],
    tier: "curated",
    continent: "asia",
  },
  {
    id: "siem-reap",
    name: "Siem Reap",
    country: "Cambodia",
    lat: 13.3671,
    lng: 103.8448,
    shortDescription:
      "Gateway to Angkor Wat — the greatest temple complex ever built, wrapped in jungle.",
    whyVisit:
      "Watch sunrise over Angkor Wat, explore tree-entwined ruins and eat Khmer cuisine.",
    bestSeason: "November to March for dry season with cooler mornings at the temples.",
    whyNow:
      "New curated temple routes and community-based tours offer deeper cultural immersion.",
    vibe: "Ancient & Enchanting",
    highlights: ["Angkor Wat Sunrise", "Bayon Temple", "Ta Prohm", "Tonle Sap Lake"],
    tier: "curated",
    continent: "asia",
  },
  {
    id: "oaxaca",
    name: "Oaxaca",
    country: "Mexico",
    lat: 17.0732,
    lng: -96.7266,
    shortDescription:
      "Mexico's culinary soul — mole, mezcal and indigenous markets in a colonial valley.",
    whyVisit:
      "Seven mole varieties, mezcal distilleries, Zapotec ruins and the most vibrant Day of the Dead.",
    bestSeason: "October to November for Day of the Dead or March to May for dry warmth.",
    whyNow:
      "Artisan mezcal tourism and textile cooperatives are putting Oaxaca center stage.",
    vibe: "Artisan & Soulful",
    highlights: ["Monte Alban", "Mezcal Tastings", "Oaxacan Cuisine", "Day of the Dead"],
    tier: "curated",
    continent: "north-america",
  },
  {
    id: "cusco",
    name: "Cusco",
    country: "Peru",
    lat: -13.532,
    lng: -71.9675,
    shortDescription:
      "The ancient Incan capital high in the Andes — colonial churches built on Incan walls.",
    whyVisit:
      "Gateway to the Sacred Valley, alpaca textiles, altitude-fueled nightlife and Incan heritage.",
    bestSeason: "May to September for dry season with clear Andean skies.",
    whyNow:
      "New community-led treks and textile cooperatives offer alternatives to the crowded Inca Trail.",
    vibe: "Historic & High-altitude",
    highlights: ["Plaza de Armas", "Sacsayhuaman", "San Pedro Market", "Sacred Valley"],
    tier: "curated",
    continent: "south-america",
  },
  {
    id: "nairobi",
    name: "Nairobi",
    country: "Kenya",
    lat: -1.2921,
    lng: 36.8219,
    shortDescription:
      "A cosmopolitan African capital with a national park inside the city limits.",
    whyVisit:
      "Giraffes at breakfast, Nairobi National Park, vibrant art scenes and gateway to the Masai Mara.",
    bestSeason: "June to October for dry season and wildlife viewing.",
    whyNow:
      "Tech-hub energy and creative districts are reshaping Nairobi as a cultural destination.",
    vibe: "Urban & Wild",
    highlights: ["Giraffe Centre", "Nairobi National Park", "Karen Blixen Museum", "Masai Market"],
    tier: "curated",
    continent: "africa",
  },
  {
    id: "antigua-guatemala",
    name: "Antigua Guatemala",
    country: "Guatemala",
    lat: 14.5586,
    lng: -90.7295,
    shortDescription:
      "A pastel-painted colonial gem cradled between three volcanoes in the Guatemalan highlands.",
    whyVisit:
      "Cobblestone streets, coffee farm tours, volcano hikes and vibrant Semana Santa processions.",
    bestSeason: "November to April for dry season with clear volcanic views.",
    whyNow:
      "Specialty-coffee tourism and volcano trekking are drawing adventurous travelers.",
    vibe: "Colonial & Volcanic",
    highlights: ["Volcan Acatenango", "Coffee Plantations", "Arco de Santa Catalina", "Semana Santa"],
    tier: "curated",
    continent: "north-america",
  },
  {
    id: "bergen",
    name: "Bergen",
    country: "Norway",
    lat: 60.3913,
    lng: 5.3221,
    shortDescription:
      "Gateway to the fjords — colorful Bryggen wharves against a backdrop of seven mountains.",
    whyVisit:
      "Cruise Sognefjord, ride the Floibanen funicular and feast on fresh seafood at the fish market.",
    bestSeason: "May to September for the mildest weather and longest days.",
    whyNow:
      "New fjord-cruise routes and car-free waterfront zones are enhancing the visitor experience.",
    vibe: "Fjord-side & Cozy",
    highlights: ["Bryggen", "Floibanen Funicular", "Fish Market", "Sognefjord Cruise"],
    tier: "curated",
    continent: "europe",
  },
  {
    id: "abu-dhabi",
    name: "Abu Dhabi",
    country: "UAE",
    lat: 24.4539,
    lng: 54.3773,
    shortDescription:
      "Desert grandeur meets cultural ambition — the Louvre in the Arabian Gulf.",
    whyVisit:
      "Louvre Abu Dhabi, Sheikh Zayed Mosque, desert dunes and F1 at Yas Marina.",
    bestSeason: "November to March for pleasant warmth without extreme summer heat.",
    whyNow:
      "World-class museum openings and cultural investments rival any global arts destination.",
    vibe: "Grand & Cultured",
    highlights: ["Louvre Abu Dhabi", "Sheikh Zayed Mosque", "Yas Island", "Desert Safaris"],
    tier: "exclusive",
    continent: "middle-east",
  },
  {
    id: "bogota",
    name: "Bogota",
    country: "Colombia",
    lat: 4.711,
    lng: -74.0721,
    shortDescription:
      "A high-altitude capital of gold museums, graffiti tours and Andean culinary energy.",
    whyVisit:
      "Monserrate views, La Candelaria's street art, world-class coffee and a buzzing nightlife.",
    bestSeason:
      "December to March for the driest months with clear mountain views.",
    whyNow:
      "A thriving creative scene and new gastro-markets are putting Bogota on the cultural map.",
    vibe: "Edgy & Evolving",
    highlights: ["Monserrate", "Gold Museum", "La Candelaria", "Andres Carne de Res"],
    tier: "curated",
    continent: "south-america",
  },
  {
    id: "scottish-highlands",
    name: "Scottish Highlands",
    country: "United Kingdom",
    lat: 57.1219,
    lng: -5.1057,
    shortDescription:
      "Rugged lochs, castles in the mist and single-malt distilleries across untamed landscapes.",
    whyVisit:
      "Drive the North Coast 500, kayak sea lochs, hike Ben Nevis and sip whisky at its source.",
    bestSeason: "May to September for the longest days and mildest weather.",
    whyNow:
      "The North Coast 500 route and new wild-camping spots make the Highlands a road-trip icon.",
    vibe: "Rugged & Mystical",
    highlights: ["Loch Ness", "Isle of Skye", "Ben Nevis", "Whisky Distilleries"],
    tier: "exclusive",
    continent: "europe",
  },
  {
    id: "luang-prabang",
    name: "Luang Prabang",
    country: "Laos",
    lat: 19.8844,
    lng: 102.1347,
    shortDescription:
      "A UNESCO-listed town of saffron-robed monks, French-Lao fusion and Mekong sunsets.",
    whyVisit:
      "Dawn alms-giving ceremonies, Kuang Si waterfalls and the most relaxed pace in Southeast Asia.",
    bestSeason: "November to March for dry, cool weather and clear skies.",
    whyNow:
      "The new Laos-China railway makes this hidden gem easier to reach than ever.",
    vibe: "Peaceful & Timeless",
    highlights: ["Alms Giving Ceremony", "Kuang Si Falls", "Night Market", "Pak Ou Caves"],
    tier: "curated",
    continent: "asia",
  },
  {
    id: "bhutan",
    name: "Bhutan",
    country: "Bhutan",
    lat: 27.5142,
    lng: 90.4336,
    shortDescription:
      "The Last Shangri-La — a Himalayan kingdom that measures success by happiness.",
    whyVisit:
      "Tiger's Nest monastery, untouched forests and a carbon-negative nation with zero traffic lights.",
    bestSeason: "March to May and September to November for clear mountain views and festivals.",
    whyNow:
      "Revised tourism policies now welcome mindful travelers at more accessible price points.",
    vibe: "Spiritual & Pristine",
    highlights: ["Tiger's Nest", "Punakha Dzong", "Paro Valley", "Tsechu Festivals"],
    tier: "exclusive",
    continent: "asia",
  },
  {
    id: "hoi-an",
    name: "Hoi An",
    country: "Vietnam",
    lat: 15.8801,
    lng: 108.338,
    shortDescription:
      "A lantern-lit ancient port where tailors, temples and banh mi line the Thu Bon River.",
    whyVisit:
      "Custom tailoring in hours, cooking classes, cycling rice paddies and full-moon lantern festivals.",
    bestSeason: "February to May for warm, dry weather before the rainy season.",
    whyNow:
      "Sustainable tourism awards and car-free streets keep the old town charming and walkable.",
    vibe: "Enchanting & Artisan",
    highlights: ["Lantern-Lit Old Town", "Custom Tailoring", "An Bang Beach", "Cooking Classes"],
    tier: "curated",
    continent: "asia",
  },
  {
    id: "rotorua",
    name: "Rotorua",
    country: "New Zealand",
    lat: -38.1368,
    lng: 176.2497,
    shortDescription:
      "A geothermal wonderland of bubbling mud pools, geysers and Maori cultural performances.",
    whyVisit:
      "Watch geysers erupt, soak in hot springs and experience an authentic Maori hangi feast.",
    bestSeason: "Year-round — geothermal activity is constant; summer (Dec–Feb) for the warmest days.",
    whyNow:
      "Maori-led tourism experiences and new geothermal spas are creating deeper cultural connections.",
    vibe: "Geothermal & Cultural",
    highlights: ["Te Puia Geysers", "Maori Cultural Shows", "Redwood Treewalk", "Hot Springs"],
    tier: "curated",
    continent: "oceania",
  },
  {
    id: "tahiti",
    name: "Tahiti",
    country: "French Polynesia",
    lat: -17.6509,
    lng: -149.426,
    shortDescription:
      "The heart of French Polynesia — volcanic peaks, black-sand beaches and Polynesian soul.",
    whyVisit:
      "Surf Teahupo'o, explore Papeete markets and island-hop across the Society Islands.",
    bestSeason: "May to October for dry season with cooling trade winds.",
    whyNow:
      "Olympic surfing exposure has put Tahiti's waves and culture on the global stage.",
    vibe: "Polynesian & Wild",
    highlights: ["Teahupo'o Surf", "Papeete Market", "Moorea Island", "Black Sand Beaches"],
    tier: "exclusive",
    continent: "oceania",
  },
  {
    id: "oman",
    name: "Oman",
    country: "Oman",
    lat: 23.5859,
    lng: 58.4059,
    shortDescription:
      "Frankincense, fjords and fortress-dotted deserts in Arabia's most gracious nation.",
    whyVisit:
      "Wadis, dune camping, the Grand Mosque and a coastline of hidden coves and dolphin pods.",
    bestSeason: "October to April for comfortable warmth without extreme summer heat.",
    whyNow:
      "New eco-lodges in the desert and fjord-cruise routes are opening Oman's wild interior.",
    vibe: "Serene & Majestic",
    highlights: ["Sultan Qaboos Mosque", "Wadi Shab", "Wahiba Sands", "Musandam Fjords"],
    tier: "exclusive",
    continent: "middle-east",
  },
  {
    id: "dead-sea",
    name: "Dead Sea",
    country: "Jordan",
    lat: 31.5,
    lng: 35.5,
    shortDescription:
      "Earth's lowest point — float effortlessly in mineral-rich waters between desert cliffs.",
    whyVisit:
      "A surreal floating experience, therapeutic mud baths and dramatic canyon hikes nearby.",
    bestSeason: "October to April for comfortable temperatures at this low elevation.",
    whyNow:
      "Luxury wellness resorts and new canyon trails are transforming the Dead Sea into a wellness destination.",
    vibe: "Surreal & Healing",
    highlights: ["Floating Experience", "Mud Baths", "Wadi Mujib Canyon", "Sunset Views"],
    tier: "exclusive",
    continent: "middle-east",
  },
  {
    id: "essaouira",
    name: "Essaouira",
    country: "Morocco",
    lat: 31.5085,
    lng: -9.7595,
    shortDescription:
      "A windswept Atlantic port of blue fishing boats, ramparts and Gnaoua music.",
    whyVisit:
      "Kitesurfing, fresh grilled fish, a relaxed medina and Hendrix-era bohemian spirit.",
    bestSeason: "April to November for warm weather and consistent wind for water sports.",
    whyNow:
      "The annual Gnaoua Festival and kitesurfing scene draw a creative global crowd.",
    vibe: "Bohemian & Breezy",
    highlights: ["Medina Ramparts", "Gnaoua Festival", "Kitesurfing", "Fresh Seafood Grills"],
    tier: "curated",
    continent: "africa",
  },
  {
    id: "rwandan-gorillas",
    name: "Volcanoes National Park",
    country: "Rwanda",
    lat: -1.4583,
    lng: 29.5061,
    shortDescription:
      "Mist-shrouded volcanoes where mountain gorillas live — one of Earth's rarest encounters.",
    whyVisit:
      "Trek through bamboo forest to sit with a gorilla family — a life-changing wildlife experience.",
    bestSeason: "June to September for dry trekking conditions and clearer trails.",
    whyNow:
      "Conservation success has grown gorilla populations, and Rwanda's tourism infrastructure is world-class.",
    vibe: "Profound & Rare",
    highlights: ["Gorilla Trekking", "Golden Monkey Tracking", "Bisoke Volcano Hike", "Kigali Genocide Memorial"],
    tier: "exclusive",
    continent: "africa",
  },
  {
    id: "salvador",
    name: "Salvador",
    country: "Brazil",
    lat: -12.9714,
    lng: -38.5124,
    shortDescription:
      "Brazil's Afro-Brazilian soul — capoeira, colonial color and carnival with drums not floats.",
    whyVisit:
      "Pelourinho's cobblestones, acaraje street food, candomble ceremonies and a raw local carnival.",
    bestSeason: "December to March for summer warmth and carnival festivities.",
    whyNow:
      "Cultural preservation projects and Afro-Brazilian heritage tours are deepening the experience.",
    vibe: "Rhythmic & Soulful",
    highlights: ["Pelourinho", "Capoeira Shows", "Elevador Lacerda", "Carnival"],
    tier: "curated",
    continent: "south-america",
  },
  {
    id: "montevideo",
    name: "Montevideo",
    country: "Uruguay",
    lat: -34.9011,
    lng: -56.1645,
    shortDescription:
      "A low-key River Plate capital of mate culture, art deco and long coastal ramblas.",
    whyVisit:
      "Mercado del Puerto steaks, Rambla sunsets, tango milongas and a gateway to wine country.",
    bestSeason: "October to March for warm weather and outdoor dining.",
    whyNow:
      "Boutique wineries in nearby Canelones and a revitalized Ciudad Vieja are drawing savvy travelers.",
    vibe: "Relaxed & Authentic",
    highlights: ["Mercado del Puerto", "Rambla Walk", "Ciudad Vieja", "Casapueblo Day Trip"],
    tier: "curated",
    continent: "south-america",
  },
  {
    id: "tulum",
    name: "Tulum",
    country: "Mexico",
    lat: 20.2114,
    lng: -87.4654,
    shortDescription:
      "Cliffside Mayan ruins above Caribbean waters, surrounded by cenotes and jungle.",
    whyVisit:
      "Ancient ruins with ocean views, sacred cenotes, beach clubs and a wellness-retreat vibe.",
    bestSeason: "November to April for dry weather and comfortable temperatures.",
    whyNow:
      "Eco-conscious boutique hotels and cenote preservation projects are raising the standard.",
    vibe: "Bohemian & Mystical",
    highlights: ["Tulum Ruins", "Gran Cenote", "Beach Clubs", "Sian Ka'an Reserve"],
    tier: "curated",
    continent: "north-america",
  },
];
