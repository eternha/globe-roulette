import type { HighlightDetail } from "../highlightDetails";

export const highlightsN: Record<string, HighlightDetail> = {
  ngv: {
    title: "NGV — National Gallery of Victoria",
    description:
      "The National Gallery of Victoria in Melbourne is Australia's oldest and most visited art museum, housing a permanent collection of over 75,000 works spanning 5,000 years of art history. Its landmark Great Hall features a stunning stained-glass ceiling by Leonard French, and the gallery regularly stages blockbuster international exhibitions alongside its acclaimed Australian collection.",
    facts: [
      { label: "Founded", value: "1861" },
      { label: "Collection", value: "75,000+ works" },
      { label: "Admission", value: "Free (permanent collection)" },
      { label: "Location", value: "Melbourne, Victoria, Australia" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/National_Gallery_of_Victoria",
  },

  "na pali coast": {
    title: "Na Pali Coast",
    description:
      "The Na Pali Coast on Kauai's northwest shore is one of the most dramatic stretches of coastline in the world, featuring fluted emerald sea cliffs rising up to 1,200 m (4,000 ft) directly from the Pacific Ocean. Accessible only by boat, helicopter, or the rugged 17-mile Kalalau Trail, its remote valleys were home to early Hawaiian settlements for more than 1,000 years.",
    facts: [
      { label: "Cliff height", value: "Up to 1,200 m (4,000 ft)" },
      { label: "Length", value: "~27 km (17 mi)" },
      { label: "Access", value: "Boat, helicopter, or Kalalau Trail" },
      { label: "Location", value: "Kauai, Hawaii, USA" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Na_Pali_Coast_State_Wilderness_Park",
  },

  "nacpan beach": {
    title: "Nacpan Beach",
    description:
      "Nacpan Beach is a pristine 4-km twin beach on the northern tip of Palawan island in the Philippines, consistently ranked among Asia's most beautiful stretches of sand. The beach is backed by forested hills and fronted by calm turquoise waters, and remains relatively uncrowded compared to El Nido's island-hopping spots just 17 km to the south.",
    facts: [
      { label: "Length", value: "~4 km" },
      { label: "Distance from El Nido", value: "~17 km north" },
      { label: "Best for", value: "Swimming, sunsets, hammocking" },
      { label: "Location", value: "Palawan, Philippines" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/El_Nido,_Palawan",
  },

  "nahuel huapi lake": {
    title: "Nahuel Huapi Lake",
    description:
      "Nahuel Huapi is a vast glacial lake straddling the Andes in Argentine Patagonia, forming the centrepiece of the country's oldest national park of the same name. Its name means 'Island of the Jaguar' in Mapudungun, and its deep blue waters are ringed by snow-capped peaks, ancient forests, and the resort city of Bariloche on its southern shore.",
    facts: [
      { label: "Area", value: "557 km²" },
      { label: "Max depth", value: "464 m" },
      { label: "National park established", value: "1934" },
      { label: "Location", value: "Neuquén & Río Negro, Argentina" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Nahuel_Huapi_Lake",
  },

  "nairobi national park": {
    title: "Nairobi National Park",
    description:
      "Nairobi National Park is the world's only wildlife reserve located on the doorstep of a capital city, covering 117 km² just 7 km from Nairobi's central business district. The park supports lions, leopards, rhinos, buffaloes, giraffes, and over 400 bird species, all visible against a dramatic skyline backdrop.",
    facts: [
      { label: "Area", value: "117 km²" },
      { label: "Distance from CBD", value: "~7 km" },
      { label: "Founded", value: "1946" },
      { label: "Big Five present", value: "All except elephant" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Nairobi_National_Park",
  },

  "nam ha national park": {
    title: "Nam Ha National Park",
    description:
      "Nam Ha National Park in northern Laos is a UNESCO-recognised biodiversity hotspot spanning over 222,400 hectares of moist sub-tropical forest in Luang Namtha province. It is celebrated as a pioneer in community-based ecotourism, offering trekking and river journeys that directly benefit local Akha, Khmu, and Tai villages.",
    facts: [
      { label: "Area", value: "222,400 ha" },
      { label: "UNESCO status", value: "World Heritage buffer zone" },
      { label: "Province", value: "Luang Namtha" },
      { label: "Location", value: "Northern Laos" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Nam_Ha_National_Protected_Area",
  },

  "namibrand stargazing": {
    title: "NamibRand Stargazing",
    description:
      "The NamibRand Nature Reserve in southern Namibia holds Africa's first International Dark Sky Reserve designation, offering what astronomers describe as some of the darkest and clearest night skies on Earth. The reserve's remoteness — nearly 200 km from the nearest city — combined with near-zero humidity and minimal light pollution makes it a world-class destination for astrophotography and naked-eye stargazing.",
    facts: [
      { label: "Dark Sky status", value: "Africa's first IDSR (2012)" },
      { label: "Area", value: "~172,000 ha" },
      { label: "Annual rainfall", value: "~75 mm (extremely dry)" },
      { label: "Location", value: "Namib Desert, Namibia" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/NamibRand_Nature_Reserve",
  },

  "naples underground": {
    title: "Naples Underground (Napoli Sotterranea)",
    description:
      "Beneath the bustling streets of Naples lies a labyrinthine network of tunnels, cisterns, and chambers carved from soft tufa rock over 2,400 years of continuous habitation. The underground city served as a Greek aqueduct system, Roman cisterns, wartime bomb shelters during WWII, and later as a dump — before archaeologists and volunteers spent decades excavating it into a remarkable open-air museum.",
    facts: [
      { label: "Depth", value: "40 m below street level" },
      { label: "Age", value: "~2,400 years (Greek origins)" },
      { label: "Tour length", value: "~80 min guided" },
      { label: "Location", value: "Naples, Campania, Italy" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Napoli_Sotterranea",
  },

  "nara park deer": {
    title: "Nara Park Deer",
    description:
      "Nara Park is home to around 1,200 freely roaming sika deer, regarded in Shinto tradition as divine messengers of the gods and protected as national treasures for over 1,300 years. Visitors can purchase 'shika senbei' deer crackers from vendors throughout the park, and the deer have famously learned to bow in anticipation of the treats.",
    facts: [
      { label: "Deer population", value: "~1,200" },
      { label: "Species", value: "Sika deer (Cervus nippon)" },
      { label: "Park area", value: "502 ha" },
      { label: "Location", value: "Nara, Japan" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Nara_Park",
  },

  "narikala fortress": {
    title: "Narikala Fortress",
    description:
      "Narikala is an ancient fortress overlooking Tbilisi's Old Town from a steep cliff above the Mtkvari River, with origins dating to the 4th century AD and substantial rebuilding by Arab and Persian rulers through the 8th–17th centuries. Today its ruined towers and walls are one of Georgia's most iconic silhouettes, and the site is reached by cable car from Rike Park or via a stepped path through the old botanical garden.",
    facts: [
      { label: "Founded", value: "4th century AD" },
      { label: "Altitude", value: "~340 m above sea level" },
      { label: "Access", value: "Cable car or footpath" },
      { label: "Location", value: "Tbilisi, Georgia" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Narikala",
  },

  naschmarkt: {
    title: "Naschmarkt",
    description:
      "Vienna's Naschmarkt is the city's most famous open-air market, stretching for 1.5 km along the Wienzeile and offering roughly 120 market stalls selling everything from Austrian cheeses and cured meats to Middle Eastern spices, fresh produce, and street food. Established in the 16th century, the market is flanked by Otto Wagner's Art Nouveau apartment buildings on one side and transforms into a large flea market every Saturday.",
    facts: [
      { label: "Length", value: "~1.5 km" },
      { label: "Stalls", value: "~120" },
      { label: "Flea market", value: "Every Saturday" },
      { label: "Location", value: "Vienna, Austria" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Naschmarkt",
  },

  "nathula pass": {
    title: "Nathula Pass",
    description:
      "Nathula Pass is a high-altitude mountain pass in the Himalayas at 4,310 m (14,140 ft), connecting the Indian state of Sikkim with Tibet's Chumbi Valley and marking one of the few open border crossings between India and China. The pass was a key section of the ancient Silk Road and reopened for limited trade in 2006 after being closed for 44 years following the 1962 Sino-Indian War.",
    facts: [
      { label: "Altitude", value: "4,310 m (14,140 ft)" },
      { label: "Reopened for trade", value: "2006" },
      { label: "Permit required", value: "Yes (Indian nationals & some tourists)" },
      { label: "Location", value: "Sikkim–Tibet border, India" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Nathu_La",
  },

  "national archaeological museum": {
    title: "National Archaeological Museum",
    description:
      "The National Archaeological Museum in Athens is the largest archaeological museum in Greece and one of the most important in the world, housing the greatest collection of Greek antiquities including the Antikythera Mechanism, the gold Mask of Agamemnon, and the stunning bronze Artemision statue. Its vast galleries span finds from the Neolithic through late Roman periods, offering a 5,000-year sweep of Hellenic civilisation.",
    facts: [
      { label: "Founded", value: "1829" },
      { label: "Collection", value: "~11,000 exhibits on display" },
      { label: "Star exhibit", value: "Antikythera Mechanism (~87 BC)" },
      { label: "Location", value: "Athens, Greece" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/National_Archaeological_Museum,_Athens",
  },

  "national museum": {
    title: "National Museum",
    description:
      "National museums serve as a country's primary repository of its cultural, historical, and natural heritage, typically located in the capital and offering broad permanent collections that trace the nation's story from prehistory to the present day. Many are free to enter and stand as a key landmark in the urban fabric of their city.",
    facts: [
      { label: "Role", value: "Primary national heritage institution" },
      { label: "Collections", value: "History, art, natural history, or ethnography" },
      { label: "Admission", value: "Often free for permanent collections" },
      { label: "Typical location", value: "Capital city" },
    ],
  },

  "national museum of qatar": {
    title: "National Museum of Qatar",
    description:
      "The National Museum of Qatar in Doha, designed by Jean Nouvel and opened in 2019, is an architectural marvel whose interlocking disc forms were inspired by the desert rose crystal formations found in the Qatari desert. The museum traces Qatar's story from its ancient geological formation through nomadic Bedouin traditions, the pearling industry, and the modern era of oil and natural gas.",
    facts: [
      { label: "Opened", value: "March 2019" },
      { label: "Architect", value: "Jean Nouvel" },
      { label: "Total area", value: "~52,000 m²" },
      { label: "Location", value: "Doha, Qatar" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/National_Museum_of_Qatar",
  },

  "ned's beach fish feeding": {
    title: "Ned's Beach Fish Feeding",
    description:
      "Ned's Beach on Lord Howe Island, Australia, offers one of the world's most extraordinary fish-feeding experiences, where visitors wade knee-deep in crystal-clear water and hand-feed enormous kingfish, mullet, and trevally that mass in huge, fearless schools. The phenomenon exists because fishing has been heavily restricted around Lord Howe for decades, allowing the fish to grow old and entirely unafraid of humans.",
    facts: [
      { label: "Island", value: "Lord Howe Island, NSW, Australia" },
      { label: "UNESCO status", value: "World Heritage Site (1982)" },
      { label: "Best time", value: "Morning feeding sessions" },
      { label: "Admission", value: "Free (purchase fish food on-site)" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Lord_Howe_Island",
  },

  "neil island coral reefs": {
    title: "Neil Island Coral Reefs",
    description:
      "Neil Island (officially Shaheed Dweep) in the Andaman archipelago is ringed by some of India's healthiest coral reefs, offering snorkellers and divers kaleidoscopic gardens of hard and soft corals alongside reef sharks, sea turtles, and dazzling fish. The island remains relatively low-key compared to Havelock, with three distinct beaches and natural rock formations sculpted by wind and wave.",
    facts: [
      { label: "Official name", value: "Shaheed Dweep" },
      { label: "Area", value: "~18 km²" },
      { label: "Visibility", value: "10–25 m underwater" },
      { label: "Location", value: "Andaman Islands, India" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Neil_Island",
  },

  "nelson's dockyard": {
    title: "Nelson's Dockyard",
    description:
      "Nelson's Dockyard at English Harbour, Antigua, is the only continuously working Georgian dockyard in the world, built in the 1720s and named after Admiral Horatio Nelson who was based here from 1784 to 1787. It is now a UNESCO World Heritage Site and a living museum, housing hotels, restaurants, and boat services within its beautifully restored 18th-century naval buildings.",
    facts: [
      { label: "Built", value: "1720s" },
      { label: "UNESCO status", value: "World Heritage Site (2016)" },
      { label: "Named after", value: "Admiral Horatio Nelson" },
      { label: "Location", value: "English Harbour, Antigua" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Nelson%27s_Dockyard",
  },

  "ngor beach": {
    title: "Ngor Beach",
    description:
      "Ngor Beach, on the Almadies Peninsula just 12 km from central Dakar, is a beloved local escape where Senegalese families and expats relax on a sheltered sandy cove facing Ngor Island, a short pirogue ride away. The beach village retains a relaxed fishing community atmosphere despite its proximity to the capital, and the island beyond offers tranquil swimming and a handful of restaurants.",
    facts: [
      { label: "Distance from Dakar", value: "~12 km" },
      { label: "Island access", value: "2 min by pirogue" },
      { label: "Best for", value: "Swimming, local atmosphere" },
      { label: "Location", value: "Dakar, Senegal" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Ngor,_Senegal",
  },

  "ngorongoro crater": {
    title: "Ngorongoro Crater",
    description:
      "Ngorongoro Crater is the world's largest intact volcanic caldera, measuring 19 km across and sheltering a dense concentration of wildlife — approximately 25,000 large animals — within its 260 km² floor. The crater's enclosed ecosystem supports all of Africa's Big Five year-round and is a UNESCO World Heritage Site within the greater Ngorongoro Conservation Area of Tanzania.",
    facts: [
      { label: "Diameter", value: "~19 km" },
      { label: "Floor area", value: "~260 km²" },
      { label: "Wildlife estimate", value: "~25,000 large animals" },
      { label: "UNESCO status", value: "World Heritage Site (1979)" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Ngorongoro_Conservation_Area",
  },

  "niagara wine trail": {
    title: "Niagara Wine Trail",
    description:
      "The Niagara Wine Trail winds through Ontario's Niagara Peninsula, home to over 100 wineries producing world-class Riesling, Chardonnay, Cabernet Franc, and — most famously — Vidal icewine, which requires grapes harvested at -8°C or colder. The region's unique microclimate, moderated by Lake Ontario and the Niagara Escarpment, extends the growing season and is recognized as a Vintners Quality Alliance (VQA) designation area.",
    facts: [
      { label: "Wineries", value: "100+" },
      { label: "Signature wine", value: "Vidal Icewine" },
      { label: "VQA region", value: "Niagara Peninsula" },
      { label: "Location", value: "Ontario, Canada" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Niagara_Peninsula_wine_region",
  },

  "night jungle walks": {
    title: "Night Jungle Walks",
    description:
      "Guided night walks through tropical rainforests reveal a completely different ecosystem to daytime visits: the air fills with frog calls, bioluminescent fungi glow on fallen logs, and torch beams catch the reflective eyes of spiders, snakes, and slow-moving lorises in the canopy. Night jungle walks are offered in destinations from Borneo and Costa Rica to the Amazon basin, and are among the best ways to encounter nocturnal wildlife with a knowledgeable guide.",
    facts: [
      { label: "Best destinations", value: "Borneo, Costa Rica, Amazon" },
      { label: "Duration", value: "Typically 2–3 hours" },
      { label: "What to see", value: "Frogs, insects, snakes, nocturnal mammals" },
      { label: "Equipment", value: "Headlamp and rubber boots provided" },
    ],
  },

  "night market": {
    title: "Night Market",
    description:
      "Night markets are open-air evening markets found across Southeast Asia, Taiwan, and beyond, where rows of food stalls, street vendors, and artisan sellers create a sensory-rich environment that comes alive after dark. They are central to local social life, offering everything from grilled satay and freshly squeezed sugar cane juice to hand-crafted souvenirs and knock-off goods at negotiated prices.",
    facts: [
      { label: "Peak hours", value: "6 pm – midnight" },
      { label: "Typical offerings", value: "Street food, clothing, crafts" },
      { label: "Famous examples", value: "Shilin (Taipei), Chatuchak (Bangkok)" },
      { label: "Best tip", value: "Arrive hungry and explore before buying" },
    ],
  },

  "nile cruise": {
    title: "Nile Cruise",
    description:
      "A Nile cruise between Luxor and Aswan is one of the world's great journeys, gliding past a continuous procession of temples, tombs, and felucca-sailed banks that have barely changed in appearance for millennia. Classic sailing vessels called dahabiyyas and larger cruise ships carry passengers to Karnak, the Valley of the Kings, Edfu, Kom Ombo, and Abu Simbel across itineraries typically lasting three to seven nights.",
    facts: [
      { label: "Classic route", value: "Luxor to Aswan (or reverse)" },
      { label: "Distance", value: "~208 km" },
      { label: "Typical duration", value: "3–7 nights" },
      { label: "Key stops", value: "Karnak, Edfu, Kom Ombo, Abu Simbel" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Nile_River",
  },

  "niseko ski resort": {
    title: "Niseko Ski Resort",
    description:
      "Niseko on Hokkaido island is Japan's most internationally renowned ski destination, famous for its phenomenal annual snowfall averaging over 15 m (50 ft) of ultralight powder, driven by Siberian weather systems crossing the Sea of Japan. The four interconnected resorts of Grand Hirafu, Hanazono, Niseko Village, and Annupuri collectively offer 60 runs and a vibrant après-ski scene that has attracted global visitors since the 1990s.",
    facts: [
      { label: "Annual snowfall", value: "~15 m (50 ft)" },
      { label: "Resorts", value: "4 interconnected (Grand Hirafu, Hanazono, Niseko Village, Annupuri)" },
      { label: "Runs", value: "~60" },
      { label: "Location", value: "Hokkaido, Japan" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Niseko",
  },

  "nizwa fort": {
    title: "Nizwa Fort",
    description:
      "Nizwa Fort is Oman's most visited historic monument, built in the 17th century under Imam Sultan bin Saif al Ya'arubi with a massive cylindrical tower measuring 36 m in diameter — the largest in the Arabian Peninsula at the time of construction. The fort sits above Nizwa's bustling souk and was the seat of political and religious power for the Imamate of Oman for centuries.",
    facts: [
      { label: "Built", value: "Mid-17th century (completed ~1668)" },
      { label: "Tower diameter", value: "36 m" },
      { label: "Admission", value: "Omani Rials (~1 OMR)" },
      { label: "Location", value: "Nizwa, Ad Dakhliyah, Oman" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Nizwa_Fort",
  },

  "noboribetsu onsen": {
    title: "Noboribetsu Onsen",
    description:
      "Noboribetsu Onsen in Hokkaido is Japan's most celebrated hot spring resort, drawing millions of visitors annually to its nine distinct types of mineral water — sulphur, salt, iron, and radium among them — all erupting from the otherworldly Jigokudani (Hell Valley) caldera. The resort's ryokan inns pump the geothermally heated waters directly into their baths, and a short walk through the smoking, rust-coloured valley at any hour is a dramatic spectacle.",
    facts: [
      { label: "Spring types", value: "9 distinct mineral compositions" },
      { label: "Annual visitors", value: "~3 million" },
      { label: "Key site", value: "Jigokudani (Hell Valley)" },
      { label: "Location", value: "Hokkaido, Japan" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Noboribetsu",
  },

  "nong khiaw": {
    title: "Nong Khiaw",
    description:
      "Nong Khiaw is a small river town in northern Laos where the Nam Ou River cuts dramatically through towering karst limestone cliffs, creating one of Southeast Asia's most spectacular natural settings. The town is a popular base for trekking to remote Hmong villages, kayaking, and hiking to a ridge-top viewpoint that frames the entire valley in a single breathtaking panorama.",
    facts: [
      { label: "River", value: "Nam Ou" },
      { label: "Province", value: "Luang Prabang Province" },
      { label: "Best activity", value: "Viewpoint hike (~1 hr return)" },
      { label: "Location", value: "Northern Laos" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Nong_Khiaw",
  },

  "northern lights": {
    title: "Northern Lights (Aurora Borealis)",
    description:
      "The aurora borealis is a natural light display caused by charged particles from the sun colliding with atmospheric gases, producing shimmering curtains of green, purple, and red light across the polar night sky. The phenomenon is best observed between September and March at latitudes above 65°N — in Norway's Tromsø, Finnish Lapland, Iceland, northern Canada, and Alaska — away from city light pollution.",
    facts: [
      { label: "Best viewing latitude", value: "Above 65°N" },
      { label: "Peak season", value: "September – March" },
      { label: "Solar cycle", value: "Peak activity every ~11 years" },
      { label: "Top locations", value: "Tromsø, Reykjavik, Fairbanks, Yellowknife" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Aurora",
  },

  "northern lights safari": {
    title: "Northern Lights Safari",
    description:
      "Northern lights safaris combine aurora hunting with Arctic wilderness experiences — snowmobile expeditions across frozen lakes, reindeer sleigh rides through birch forests, or heated glass igloo stays that let guests watch the sky in warmth. These guided outings increase the chance of a sighting by heading away from clouds and towns to the clearest, darkest skies, and are especially popular in Finnish Lapland, Swedish Abisko, and northern Norway.",
    facts: [
      { label: "Best locations", value: "Finnish Lapland, Abisko (Sweden), Tromsø (Norway)" },
      { label: "Season", value: "October – March" },
      { label: "Duration", value: "3–5 hours per outing" },
      { label: "Activities", value: "Snowmobile, reindeer sled, glass igloo" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Aurora",
  },

  "nosy be": {
    title: "Nosy Be",
    description:
      "Nosy Be is Madagascar's largest and most popular island, a lush tropical destination off the northwest coast whose name means 'Big Island' in Malagasy. It is known for vanilla and ylang-ylang plantations, excellent diving amid whale sharks and manta rays, and an easy-going resort atmosphere centred on Andilana and Ambatoloaka beaches.",
    facts: [
      { label: "Area", value: "~320 km²" },
      { label: "Main town", value: "Hell-Ville (Andoany)" },
      { label: "Known for", value: "Vanilla, diving, whale sharks" },
      { label: "Location", value: "Northwest Madagascar" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Nosy_Be",
  },

  "noumea aquarium": {
    title: "Nouméa Aquarium des Lagons",
    description:
      "The Aquarium des Lagons in Nouméa, New Caledonia, showcases the extraordinary marine biodiversity of the world's largest lagoon — a UNESCO World Heritage Site — with living coral displays, nautiluses (the aquarium is renowned for its nautilus breeding programme), and rare species found nowhere else in captivity. It is one of the finest aquariums in the South Pacific.",
    facts: [
      { label: "Speciality", value: "Nautilus breeding programme" },
      { label: "Lagoon status", value: "UNESCO World Heritage Site" },
      { label: "Lagoon area", value: "~24,000 km²" },
      { label: "Location", value: "Nouméa, New Caledonia" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Nouméa_Aquarium",
  },

  "nourlangie rock": {
    title: "Nourlangie Rock",
    description:
      "Nourlangie Rock (Burrunggui) in Kakadu National Park is one of Australia's most significant Aboriginal rock art sites, where ochre paintings of the creation ancestor Namarrgon (the Lightning Man) and other Dreamtime figures have been added to and maintained by the Bininj/Mungguy people for at least 20,000 years. The rock's towering sandstone escarpment also provides sweeping views across the Anbangbang Billabong floodplain.",
    facts: [
      { label: "Art age", value: "Up to 20,000 years" },
      { label: "Kakadu established", value: "1979" },
      { label: "UNESCO status", value: "World Heritage Site (1981)" },
      { label: "Location", value: "Kakadu National Park, Northern Territory, Australia" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Nourlangie_Rock",
  },

  "nungwi beach": {
    title: "Nungwi Beach",
    description:
      "Nungwi at Zanzibar's northern tip is the island's liveliest beach destination, with powdery white sand, crystal-clear water that remains swimmable at all tides (unlike much of the island's east coast), and a traditional dhow-building village where craftsmen still shape wooden fishing boats by hand. Sunset dhow cruises, snorkelling at nearby Mnemba Atoll, and a vibrant strip of beach bars make it a magnet for travellers.",
    facts: [
      { label: "Tide", value: "Natural lagoon — swimmable at all tides" },
      { label: "Speciality", value: "Dhow building & sunset cruises" },
      { label: "Nearby dive site", value: "Mnemba Atoll" },
      { label: "Location", value: "Northern Zanzibar, Tanzania" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Nungwi",
  },

  nyhavn: {
    title: "Nyhavn",
    description:
      "Nyhavn ('New Harbour') is Copenhagen's most iconic waterfront district, lined with brightly coloured 17th-century townhouses reflected in the canal waters below a forest of wooden sailing ships' masts. Once a working port and the haunt of sailors and Hans Christian Andersen — who lived at No. 20, 67, and 18 at different times — it is now a beloved promenade of cafés, restaurants, and bar terraces.",
    facts: [
      { label: "Built", value: "1671–1673 (ordered by King Christian V)" },
      { label: "Famous resident", value: "Hans Christian Andersen" },
      { label: "Canal length", value: "~400 m" },
      { label: "Location", value: "Copenhagen, Denmark" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Nyhavn",
  },

  "nymphenburg palace": {
    title: "Nymphenburg Palace",
    description:
      "Nymphenburg Palace is the summer residence of the Wittelsbach rulers of Bavaria, a magnificent Baroque complex begun in 1664 and expanded over the next century into a 700-metre-wide garden façade set within a formal French park. The palace is birthplace of King Ludwig II and houses the celebrated Gallery of Beauties — 36 portraits of beautiful women commissioned by Ludwig I — alongside richly decorated state rooms and the historic royal porcelain manufactory.",
    facts: [
      { label: "Construction begun", value: "1664" },
      { label: "Façade width", value: "~700 m" },
      { label: "Notable feature", value: "Gallery of Beauties (36 portraits)" },
      { label: "Location", value: "Munich, Bavaria, Germany" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Nymphenburg_Palace",
  },
};
