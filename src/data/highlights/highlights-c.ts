import type { HighlightDetail } from "../highlightDetails";

export const highlightsC: Record<string, HighlightDetail> = {
  "cable cars": {
    title: "Cable Cars",
    description:
      "San Francisco's iconic cable cars have been climbing the city's legendary hills since 1873, making them the world's last manually operated cable car system. The three remaining lines — Powell-Hyde, Powell-Mason, and California — are beloved by locals and visitors alike for their vintage charm and sweeping views. Riding one over Nob Hill or down to Fisherman's Wharf remains one of the most quintessential urban experiences in the United States.",
    facts: [
      { label: "City", value: "San Francisco, USA" },
      { label: "Established", value: "1873" },
      { label: "National Landmark", value: "Yes (1964)" },
      { label: "Active Lines", value: "3" },
      { label: "Speed", value: "~15 km/h" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/San_Francisco_cable_car_system",
  },

  "cabo san juan beach": {
    title: "Cabo San Juan Beach",
    description:
      "Cabo San Juan is widely considered the most spectacular beach in Tayrona National Natural Park, Colombia, nestled between lush jungle-covered headlands and the turquoise Caribbean Sea. The beach is split into two coves — one calmer for swimming and one with dramatic surf — connected by a rocky promontory with sweeping views. Access requires a two-hour hike through tropical forest, which only adds to the sense of discovery on arrival.",
    facts: [
      { label: "Location", value: "Tayrona National Park, Colombia" },
      { label: "Type", value: "Caribbean beach / National Park" },
      { label: "Access", value: "Hiking trail (~2 hrs)" },
      { label: "Best Season", value: "December–April" },
      { label: "Camping", value: "Available on site" },
    ],
    externalUrl:
      "https://en.wikipedia.org/wiki/Tayrona_National_Natural_Park",
  },

  "cala goloritzé": {
    title: "Cala Goloritzé",
    description:
      "Cala Goloritzé is a stunning limestone cove on Sardinia's Ogliastra coast, famous for its crystalline turquoise water, white pebble beach, and a dramatic 143-metre sea stack rising from the shoreline. Declared a UNESCO natural monument in 1995, the beach can only be reached by a steep two-hour hike down from the Golgo plateau or by boat, preserving its pristine character. It is widely regarded as one of the most beautiful beaches in the Mediterranean.",
    facts: [
      { label: "Location", value: "Ogliastra, Sardinia, Italy" },
      { label: "UNESCO", value: "Natural Monument (1995)" },
      { label: "Access", value: "Hiking (~2 hrs) or boat" },
      { label: "Sea Stack", value: "143 m tall" },
      { label: "Best Season", value: "June–September" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Cala_Golorit%C3%A8",
  },

  "canaima lagoon": {
    title: "Canaima Lagoon",
    description:
      "Canaima Lagoon is a sprawling, tea-coloured lake at the heart of Canaima National Park in Venezuela, fed by tannin-rich rivers that give the water its distinctive reddish-brown hue. Six impressive waterfalls, including the spectacular Hacha Falls, cascade directly into the lagoon creating a constant mist that nourishes the surrounding rainforest. The park, a UNESCO World Heritage Site, is also the gateway for expeditions to Angel Falls, the world's highest uninterrupted waterfall.",
    facts: [
      { label: "Location", value: "Canaima National Park, Venezuela" },
      { label: "UNESCO", value: "World Heritage Site (1994)" },
      { label: "Area", value: "3 million ha (park)" },
      { label: "Notable Feature", value: "Six waterfalls into lagoon" },
      { label: "Nearby", value: "Angel Falls (275 km)" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Canaima_National_Park",
  },

  "canal boat tour": {
    title: "Canal Boat Tour",
    description:
      "Canal boat tours offer a unique perspective on historic waterway cities, gliding quietly past centuries-old architecture, arched bridges, and flower-laden banks that are impossible to appreciate from street level. Whether exploring Amsterdam's UNESCO-listed canal ring, Bangkok's klongs, or the backwaters of Kerala, these tours reveal the daily rhythms of life alongside water. Narrow boats, gondolas, and longtail boats each carry their own cultural character, making the experience inseparable from its destination.",
    facts: [
      { label: "Type", value: "Cultural / Scenic experience" },
      { label: "Popular Destinations", value: "Amsterdam, Venice, Bangkok, Kerala" },
      { label: "Typical Duration", value: "1–3 hours" },
      { label: "Best Time", value: "Morning or golden hour" },
    ],
  },

  "canal d'amour": {
    title: "Canal d'Amour",
    description:
      "Canal d'Amour (Channel of Love) is a narrow sea channel carved through golden sandstone cliffs on the northeast coast of Corfu, Greece, near the village of Sidari. Legend holds that couples who swim together through the channel will stay in love forever, drawing romantically inclined visitors to its calm, turquoise waters. The soft sandstone has been sculpted by waves into arches, caves, and overhangs that make the cove visually extraordinary.",
    facts: [
      { label: "Location", value: "Sidari, Corfu, Greece" },
      { label: "Type", value: "Natural sea channel / Beach" },
      { label: "Rock", value: "Sandstone" },
      { label: "Best Season", value: "June–September" },
      { label: "Legend", value: "Couples who swim through stay together" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Sidari",
  },

  "canopy towers": {
    title: "Canopy Towers",
    description:
      "Canopy towers are elevated observation platforms built into or above the forest canopy, offering wildlife watchers a rare eye-level view of life in the treetops. Most famously used at Canopy Tower in Panama — a converted US military radar tower in Soberanía National Park — they give birders unparalleled access to hundreds of species including toucans, trogons, and harpy eagles. The experience transforms from a passive walk below the canopy into an immersive encounter with the forest's most secretive residents.",
    facts: [
      { label: "Famous Location", value: "Soberanía National Park, Panama" },
      { label: "Type", value: "Wildlife observation / Birdwatching" },
      { label: "Height", value: "Up to 40+ m above ground" },
      { label: "Best For", value: "Birding, monkey & sloth spotting" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Canopy_Tower",
  },

  "canyonlands": {
    title: "Canyonlands National Park",
    description:
      "Canyonlands is Utah's largest national park, preserving a vast wilderness of colorful canyons, mesas, and buttes carved by the Colorado and Green Rivers over millions of years. The park is divided into four districts — Island in the Sky, The Needles, The Maze, and the Rivers — each offering dramatically different landscapes and levels of accessibility. It ranks among the most remote and ruggedly beautiful wilderness areas in the United States.",
    facts: [
      { label: "Location", value: "Utah, USA" },
      { label: "Established", value: "1964" },
      { label: "Area", value: "1,366 km²" },
      { label: "Elevation", value: "1,158–2,187 m" },
      { label: "Districts", value: "4 (Island in the Sky, Needles, Maze, Rivers)" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Canyonlands_National_Park",
  },

  "cape range gorges": {
    title: "Cape Range Gorges",
    description:
      "Cape Range National Park on Western Australia's Ningaloo Coast shelters a series of dramatic limestone gorges cut through an ancient reef system now raised above sea level. Mandu Mandu, Yardie Creek, and Charles Knife gorges offer stunning walks through rust-red canyon walls that plunge to cool, clear pools and wadis teeming with wildlife. The park sits beside Ningaloo Marine Park, making it possible to snorkel with whale sharks in the morning and hike wild gorges in the afternoon.",
    facts: [
      { label: "Location", value: "Cape Range NP, Western Australia" },
      { label: "UNESCO", value: "Ningaloo Coast World Heritage Site (2011)" },
      { label: "Notable Gorges", value: "Mandu Mandu, Yardie Creek, Charles Knife" },
      { label: "Nearby", value: "Ningaloo Reef" },
      { label: "Best Season", value: "April–October" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Cape_Range_National_Park",
  },

  "cape winelands": {
    title: "Cape Winelands",
    description:
      "The Cape Winelands is South Africa's premier wine-producing region, centred on the historic towns of Stellenbosch, Franschhoek, and Paarl, all set against a backdrop of dramatic mountain ranges. Dutch and French Huguenot settlers established vineyards here in the 17th century, and today the region produces some of the finest Chenin Blanc, Cabernet Sauvignon, and Pinotage in the world. The combination of world-class wine, Cape Dutch architecture, and mountain scenery makes it one of Africa's most visited inland destinations.",
    facts: [
      { label: "Location", value: "Western Cape, South Africa" },
      { label: "Main Towns", value: "Stellenbosch, Franschhoek, Paarl" },
      { label: "Wine Estates", value: "200+" },
      { label: "Key Varietals", value: "Chenin Blanc, Pinotage, Cabernet" },
      { label: "Distance from Cape Town", value: "~45–75 km" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Cape_Winelands",
  },

  "capilano bridge": {
    title: "Capilano Suspension Bridge",
    description:
      "The Capilano Suspension Bridge spans 137 metres across and hangs 70 metres above the Capilano River in North Vancouver, making it one of the world's longest and highest pedestrian suspension bridges. First built in 1889 from hemp rope and cedar planks, the current wire-cable bridge sways gently over the temperate rainforest below, offering a thrilling and scenic crossing. The park complex also features a clifftop treetop adventure walkway and Cliffwalk, a cantilevered walkway bolted into the granite cliff.",
    facts: [
      { label: "Location", value: "North Vancouver, British Columbia, Canada" },
      { label: "Length", value: "137 m" },
      { label: "Height", value: "70 m above river" },
      { label: "First Built", value: "1889" },
      { label: "Type", value: "Suspension bridge / Attraction" },
    ],
    externalUrl:
      "https://en.wikipedia.org/wiki/Capilano_Suspension_Bridge",
  },

  "capoeira shows": {
    title: "Capoeira Shows",
    description:
      "Capoeira is an Afro-Brazilian martial art that combines elements of dance, acrobatics, and music, developed by enslaved Africans in Brazil as a disguised form of self-defence. Live performances — known as rodas — feature practitioners in athletic exchanges of kicks, sweeps, and flips performed to the rhythm of the berimbau, a single-string percussion instrument. Salvador da Bahia is the spiritual home of capoeira, and watching or joining a roda here remains one of the most electrifying cultural experiences in Brazil.",
    facts: [
      { label: "Origin", value: "Brazil (16th–17th century)" },
      { label: "UNESCO", value: "Intangible Cultural Heritage (2014)" },
      { label: "Capital", value: "Salvador da Bahia, Brazil" },
      { label: "Instruments", value: "Berimbau, atabaque, pandeiro" },
      { label: "Type", value: "Martial art / Dance / Music" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Capoeira",
  },

  "carnival": {
    title: "Carnival",
    description:
      "Carnival is a festive season celebrated immediately before Lent in Catholic-influenced countries, reaching its most extravagant expressions in Rio de Janeiro, Venice, Trinidad, and New Orleans. Rio's Sambódromo parade, where samba schools compete in elaborately costumed processions before hundreds of thousands of spectators, is the world's largest carnival celebration. The festival's roots blend European, African, and Indigenous traditions into a unique explosion of music, dance, and collective joy.",
    facts: [
      { label: "Famous Locations", value: "Rio de Janeiro, Venice, Trinidad, New Orleans" },
      { label: "Timing", value: "Before Lent (February–March)" },
      { label: "Rio Attendance", value: "~2 million per day" },
      { label: "UNESCO", value: "Intangible Heritage (various traditions)" },
      { label: "Type", value: "Cultural festival" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Carnival",
  },

  "carpathian bear watching": {
    title: "Carpathian Bear Watching",
    description:
      "Romania's Carpathian Mountains host the largest population of brown bears in Europe outside Russia, and guided hide-based watch sessions offer an intimate and ethical way to observe these magnificent animals in the wild. Hides near Zarnesti and Brasov allow visitors to watch bears foraging in forest clearings at dawn or dusk, often alongside wolves, lynx, and deer. Romania is one of the few places on Earth where such encounters with large carnivores remain reliably possible in a European context.",
    facts: [
      { label: "Location", value: "Carpathian Mountains, Romania" },
      { label: "Population", value: "~6,000 brown bears (largest in Europe)" },
      { label: "Species", value: "Eurasian brown bear (Ursus arctos arctos)" },
      { label: "Best Season", value: "April–October" },
      { label: "Type", value: "Wildlife watching from guided hides" },
    ],
    externalUrl:
      "https://en.wikipedia.org/wiki/Brown_bear#Europe",
  },

  "casa de la libertad": {
    title: "Casa de la Libertad",
    description:
      "Casa de la Libertad (House of Liberty) in Sucre, Bolivia, is the historic building where Bolivia's Declaration of Independence was signed on 6 August 1825, making it one of the most important sites in Latin American history. The former Jesuit university hall now serves as a museum, displaying colonial artworks, independence-era documents, and Simon Bolívar's portrait — one of the earliest painted from life. Sucre itself is a UNESCO World Heritage City known for its immaculately preserved white colonial architecture.",
    facts: [
      { label: "Location", value: "Sucre, Bolivia" },
      { label: "Built", value: "1621 (Jesuit university)" },
      { label: "Independence Signed", value: "6 August 1825" },
      { label: "UNESCO", value: "City of Sucre (1991)" },
      { label: "Type", value: "Museum / National monument" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Casa_de_la_Libertad",
  },

  "casapueblo day trip": {
    title: "Casapueblo Day Trip",
    description:
      "Casapueblo is a whitewashed, sculptural building on a dramatic headland at Punta Ballena near Punta del Este, Uruguay, created by artist Carlos Páez Vilaró over decades as his personal workshop, home, and homage to the sun. Resembling a Moorish or Mediterranean village sculpted by hand, the structure cascades down the cliffs above the Atlantic in an organic, cave-like form. It now houses a hotel, museum, and café, and the sunset ceremony — where Páez Vilaró would mark each sunset by blowing a conch shell — lives on as a daily ritual.",
    facts: [
      { label: "Location", value: "Punta Ballena, Uruguay" },
      { label: "Creator", value: "Carlos Páez Vilaró" },
      { label: "Construction", value: "Over several decades from 1958" },
      { label: "Type", value: "Art / Architecture / Museum / Hotel" },
      { label: "Sunset Ritual", value: "Daily conch shell ceremony" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Casapueblo",
  },

  "castillo san felipe": {
    title: "Castillo San Felipe de Barajas",
    description:
      "Castillo San Felipe de Barajas in Cartagena, Colombia, is the largest and most imposing Spanish colonial fortress ever built in the Americas, perched atop the San Lázaro hill overlooking the historic walled city. Construction began in 1536 and the fort was expanded repeatedly over the following centuries, developing an extraordinary network of underground tunnels designed to move troops, store ammunition, and allow communication across the complex. It survived multiple attempts by British forces to take Cartagena and was designated a UNESCO World Heritage Site as part of the Port, Fortresses, and Group of Monuments of Cartagena.",
    facts: [
      { label: "Location", value: "Cartagena, Colombia" },
      { label: "Built", value: "1536–1657 (and later expansions)" },
      { label: "UNESCO", value: "World Heritage Site (1984)" },
      { label: "Type", value: "Spanish colonial fortress" },
      { label: "Notable Feature", value: "Extensive underground tunnel network" },
    ],
    externalUrl:
      "https://en.wikipedia.org/wiki/Castillo_San_Felipe_de_Barajas",
  },

  "castle combe": {
    title: "Castle Combe",
    description:
      "Castle Combe is a remarkably preserved medieval village in the Cotswolds of Wiltshire, England, so consistently picturesque that it has been called 'the prettiest village in England.' Honey-coloured stone cottages, a 14th-century market cross, and a stream running under ancient bridges create a scene that has changed little since the Middle Ages, making it a favourite backdrop for films and period television productions. The surrounding valley and woodland walks reinforce the sense of having stepped back in time.",
    facts: [
      { label: "Location", value: "Wiltshire, England" },
      { label: "Type", value: "Medieval village / Conservation area" },
      { label: "Notable For", value: "Best-preserved Cotswold village" },
      { label: "Film Location", value: "Doctor Dolittle (1967), War Horse (2011)" },
      { label: "Best Season", value: "Spring–Autumn" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Castle_Combe",
  },

  "castle cornet": {
    title: "Castle Cornet",
    description:
      "Castle Cornet guards the entrance to St Peter Port Harbour in Guernsey and has been the island's primary fortification for over 800 years, its architecture evolving through medieval, Tudor, and Victorian phases. The castle houses five museums covering military history, maritime heritage, and fine art, and its daily noon gun ceremony — one of the last in the British Isles — draws visitors to the ramparts each day. The views across the Little Russel Channel to the neighbouring islands of Herm and Sark are spectacular.",
    facts: [
      { label: "Location", value: "St Peter Port, Guernsey" },
      { label: "Built", value: "c. 13th century" },
      { label: "Museums", value: "5 on site" },
      { label: "Noon Gun", value: "Fired daily" },
      { label: "Type", value: "Historic fortress / Museum" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Castle_Cornet",
  },

  "castle hill": {
    title: "Castle Hill",
    description:
      "Castle Hill is a striking 970-metre trachyte rock outcrop near Charters Towers in Queensland, Australia, rising abruptly from the surrounding plain and offering panoramic views across Townsville and Magnetic Island. The rock's distinctive salmon-pink colour contrasts with the surrounding tropical landscape, and a road spirals to the summit where a lookout and café sit. It is one of Australia's great urban natural landmarks and a popular walking destination for locals and visitors alike.",
    facts: [
      { label: "Location", value: "Townsville, Queensland, Australia" },
      { label: "Elevation", value: "286 m above sea level" },
      { label: "Rock Type", value: "Pink granite / trachyte" },
      { label: "Type", value: "Natural landmark / Walking trail" },
      { label: "Views", value: "Townsville city and Magnetic Island" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Castle_Hill,_Townsville",
  },

  "cat cat village": {
    title: "Cat Cat Village",
    description:
      "Cat Cat (Cát Cát) is a traditional Hmong village nestled in a deep valley just 2 kilometres from the town of Sapa in northern Vietnam, set against a backdrop of terraced rice fields and mountains. The village is one of the oldest Hmong settlements in the region, and visitors can explore traditional stilt houses, watch artisans weave indigo-dyed fabric, and see a historic French-built hydroelectric station along the river. A wooden suspension bridge and a scenic waterfall round out a walk that immerses travellers in highland minority culture.",
    facts: [
      { label: "Location", value: "Sapa, Lào Cai Province, Vietnam" },
      { label: "Ethnic Group", value: "Black Hmong (H'mông Đen)" },
      { label: "Distance from Sapa", value: "~2 km" },
      { label: "Altitude", value: "~1,200 m" },
      { label: "Best Season", value: "September–November (harvest), March–May" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/S%C3%A0_Pa",
  },

  "cathedral rock": {
    title: "Cathedral Rock",
    description:
      "Cathedral Rock is one of Sedona, Arizona's most iconic red rock formations, a sweeping butte of Permian-age sandstone that rises dramatically from the red desert floor and is reflected in the waters of Oak Creek below. It is considered one of the most photographed scenes in Arizona and holds spiritual significance as one of Sedona's famous vortex sites, believed by many to be an energy centre. The trail to the base of Cathedral Rock follows Oak Creek and ends at a scramble to a saddle with breathtaking views.",
    facts: [
      { label: "Location", value: "Sedona, Arizona, USA" },
      { label: "Rock Type", value: "Permian sandstone" },
      { label: "Type", value: "Red rock formation / Hiking destination" },
      { label: "Vortex Site", value: "Yes (one of Sedona's 4 main vortexes)" },
      { label: "Elevation", value: "~1,524 m" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Cathedral_Rock_(Arizona)",
  },

  "cathedral of our lady": {
    title: "Cathedral of Our Lady",
    description:
      "The Cathedral of Our Lady (Onze-Lieve-Vrouwekathedraal) in Antwerp, Belgium, is the largest Gothic church in the Low Countries, its 123-metre north tower a dominant landmark on the Scheldt River skyline. Construction took nearly two centuries (1352–1521), and the cathedral houses four masterpieces by Peter Paul Rubens, including The Elevation of the Cross and The Descent from the Cross, displayed in situ as they were intended. It is a UNESCO World Heritage Site as part of the Flemish Béguinages ensemble.",
    facts: [
      { label: "Location", value: "Antwerp, Belgium" },
      { label: "Construction", value: "1352–1521" },
      { label: "Tower Height", value: "123 m" },
      { label: "UNESCO", value: "World Heritage Site (as part of 1999 listing)" },
      { label: "Notable Works", value: "4 Rubens altarpieces" },
    ],
    externalUrl:
      "https://en.wikipedia.org/wiki/Cathedral_of_Our_Lady,_Antwerp",
  },

  "cellular jail": {
    title: "Cellular Jail",
    description:
      "Cellular Jail, known as 'Kala Pani' (Black Water), is a notorious British colonial prison on South Andaman Island in India, built between 1896 and 1906 to isolate Indian independence activists far from the mainland. Its distinctive radial design — seven wings radiating from a central tower — was engineered so prisoners in solitary cells could never communicate with one another. Today it is a national memorial and museum, and its sound-and-light show narrating the stories of the freedom fighters who suffered here is deeply moving.",
    facts: [
      { label: "Location", value: "Port Blair, Andaman Islands, India" },
      { label: "Built", value: "1896–1906" },
      { label: "Architect", value: "British colonial administration" },
      { label: "Type", value: "Colonial prison / National memorial" },
      { label: "UNESCO Nomination", value: "Tentative list" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Cellular_Jail",
  },

  "cenote azul": {
    title: "Cenote Azul",
    description:
      "Cenote Azul is one of the largest open-air cenotes on Mexico's Yucatán Peninsula, located near Bacalar in Quintana Roo, measuring over 60 metres in diameter and plunging to depths of more than 90 metres. Its waters shift through extraordinary gradients of azure, turquoise, and deep blue depending on depth and sunlight, and the cenote is ringed by lush tropical vegetation. Unlike many cenotes, it is publicly accessible, has a small beach and restaurant, and welcomes swimmers and snorkellers to explore its pristine freshwater world.",
    facts: [
      { label: "Location", value: "Near Bacalar, Quintana Roo, Mexico" },
      { label: "Diameter", value: "~60 m" },
      { label: "Maximum Depth", value: "~90 m" },
      { label: "Type", value: "Open-air cenote (sinkhole)" },
      { label: "Access", value: "Public (small fee)" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Cenote",
  },

  "cenote swimming": {
    title: "Cenote Swimming",
    description:
      "Cenotes are natural sinkholes formed when the limestone bedrock of Mexico's Yucatán Peninsula collapses, revealing crystal-clear underground freshwater pools connected to vast submerged cave systems. The ancient Maya considered cenotes sacred portals to the underworld and used them as sources of drinking water and sites of ritual offerings. Today, swimming, snorkelling, and diving in cenotes — whether open-air, semi-open, or fully underground — is one of the Yucatán's most extraordinary experiences, with thousands of cenotes accessible across the region.",
    facts: [
      { label: "Location", value: "Yucatán Peninsula, Mexico" },
      { label: "Type", value: "Natural freshwater sinkholes" },
      { label: "Estimated Number", value: "6,000+ on the Yucatán" },
      { label: "Water Temperature", value: "~24–25°C year-round" },
      { label: "Activities", value: "Swimming, snorkelling, cave diving" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Cenote",
  },

  "central market": {
    title: "Central Market",
    description:
      "Central markets are the beating heart of their cities, where daily commerce, street food, local produce, and artisan crafts converge in a single, often architecturally significant space. Kuala Lumpur's Pasar Seni, Budapest's Great Market Hall, Marrakech's Jemaa el-Fnaa, and Bangkok's Or Tor Kor are among the world's most celebrated examples, each reflecting the flavours and colours of its culture. Shopping and eating in a city's central market is often the single best way to take the pulse of local life.",
    facts: [
      { label: "Type", value: "Cultural / Food / Shopping experience" },
      { label: "Famous Examples", value: "Budapest Great Market Hall, KL Pasar Seni" },
      { label: "Best Time", value: "Morning for fresh produce" },
    ],
  },

  "central park": {
    title: "Central Park",
    description:
      "Central Park is an 843-acre urban park in the heart of Manhattan, New York City, designed by Frederick Law Olmsted and Calvert Vaux and opened in 1858, making it the oldest major landscaped public park in the United States. The park features 36 bridges, two skating rinks, a zoo, a reservoir, and more than 20,000 trees, welcoming over 42 million visitors a year. Its iconic skyline backdrop, rambling landscapes, and cultural programming make it one of the world's most famous public spaces.",
    facts: [
      { label: "Location", value: "Manhattan, New York City, USA" },
      { label: "Area", value: "341 ha (843 acres)" },
      { label: "Opened", value: "1858" },
      { label: "Designers", value: "Olmsted & Vaux" },
      { label: "Annual Visitors", value: "~42 million" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Central_Park",
  },

  "central restaurant": {
    title: "Central Restaurant",
    description:
      "Central in Lima, Peru, helmed by Chef Virgilio Martínez, consistently ranks among the world's top restaurants and was named the World's Best Restaurant in 2023. The restaurant's tasting menu is organised by altitude, exploring Peru's extraordinary biodiversity from the ocean floor to the high Andes and into the Amazon, using hyper-local and often wild-foraged ingredients that most diners have never encountered. It is as much a celebration of Peruvian geography and culture as it is a culinary experience.",
    facts: [
      { label: "Location", value: "Miraflores, Lima, Peru" },
      { label: "Chef", value: "Virgilio Martínez" },
      { label: "World Ranking", value: "#1 World's 50 Best (2023)" },
      { label: "Concept", value: "Altitude-based tasting menu" },
      { label: "Reservations", value: "Months in advance required" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Central_(restaurant)",
  },

  "cerro alegre": {
    title: "Cerro Alegre",
    description:
      "Cerro Alegre is one of Valparaíso's 42 cerros (hills), celebrated as the heart of the city's bohemian cultural identity, its steep alleyways and stairways blanketed in vibrant murals by Chilean and international street artists. The neighbourhood was settled largely by German and British immigrants in the 19th century, and their ornate Victorian and Art Nouveau homes, painted in vivid colours, give the hill its distinctive character. Boutique restaurants, craft coffee shops, and art galleries line the pedestrianised streets of Cerro Alegre and neighbouring Cerro Concepción.",
    facts: [
      { label: "Location", value: "Valparaíso, Chile" },
      { label: "UNESCO", value: "Valparaíso Historic Quarter (2003)" },
      { label: "Known For", value: "Street art, Victorian architecture, cafés" },
      { label: "Type", value: "Cultural neighbourhood / Hillside district" },
      { label: "Access", value: "Funicular (ascensor) or walking" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Cerro_Alegre",
  },

  "cerro catedral": {
    title: "Cerro Catedral",
    description:
      "Cerro Catedral is the largest and most important ski resort in South America, located 19 kilometres from the city of Bariloche in Patagonian Argentina. The resort takes its name from the cathedral-like spires of rock that jut from its upper ridges, and its 1,200 metres of vertical drop offers skiing and snowboarding across 94 runs for all levels. In summer, the ski lifts operate for hikers and mountain bikers seeking panoramic views over Nahuel Huapi Lake and the surrounding Andes.",
    facts: [
      { label: "Location", value: "Bariloche, Río Negro, Argentina" },
      { label: "Elevation", value: "1,030–2,388 m" },
      { label: "Vertical Drop", value: "1,200 m" },
      { label: "Runs", value: "94" },
      { label: "Season", value: "July–October (ski); Nov–Apr (summer activities)" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Cerro_Catedral",
  },

  "chalk sound": {
    title: "Chalk Sound",
    description:
      "Chalk Sound is a shallow landlocked lagoon on the southwest coast of Providenciales in the Turks and Caicos Islands, famous for the hundreds of small rocky islets scattered across its luminous turquoise water. The unusually shallow depth — rarely more than one metre — creates extraordinary colour gradients from pale jade to deep aquamarine, and kayaking or paddleboarding among the limestone outcrops is a serene and otherworldly experience. The lagoon is a protected national park and no development is permitted on its shores.",
    facts: [
      { label: "Location", value: "Providenciales, Turks and Caicos" },
      { label: "Type", value: "Landlocked lagoon / National park" },
      { label: "Depth", value: "~1 m average" },
      { label: "Activities", value: "Kayaking, paddleboarding, photography" },
      { label: "Protection", value: "Chalk Sound National Park" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Chalk_Sound_National_Park",
  },

  "chamarel seven coloured earths": {
    title: "Chamarel Seven Coloured Earths",
    description:
      "The Seven Coloured Earths of Chamarel are a unique geological phenomenon in the Black River district of Mauritius, where dunes of volcanic soil display seven distinct and vivid hues — red, brown, violet, green, blue, purple, and yellow — naturally side by side without ever mixing, even in heavy rain. The pigmentation is caused by the differential cooling of volcanic basalt rock into various forms of iron and aluminium oxides. Nearby, the Chamarel waterfall plunges 100 metres into a forested gorge, making the area a double natural attraction.",
    facts: [
      { label: "Location", value: "Chamarel, Black River District, Mauritius" },
      { label: "Type", value: "Volcanic geological phenomenon" },
      { label: "Colours", value: "7 (red, brown, violet, green, blue, purple, yellow)" },
      { label: "Nearby", value: "Chamarel Waterfall (100 m drop)" },
      { label: "Cause", value: "Differential cooling of basaltic rock" },
    ],
    externalUrl:
      "https://en.wikipedia.org/wiki/Seven_Coloured_Earths,_Chamarel",
  },

  "chania old town": {
    title: "Chania Old Town",
    description:
      "Chania's Old Town is one of the best-preserved Venetian harbour towns in the Mediterranean, its curving seafront lined with pastel-painted mansions, minarets, Venetian arsenals, and covered bazaars that reflect the city's layered Venetian, Ottoman, and Greek heritage. The iconic lighthouse at the harbour entrance and the half-domed Küçük Hasan Pasha Mosque — now an art gallery — are among the most photographed scenes in Crete. Narrow alleyways behind the waterfront reveal artisan leather workshops, hidden churches, and excellent Cretan tavernas.",
    facts: [
      { label: "Location", value: "Chania, Crete, Greece" },
      { label: "Type", value: "Historic Venetian harbour town" },
      { label: "Venetian Rule", value: "1252–1645" },
      { label: "UNESCO", value: "Tentative nomination" },
      { label: "Best Season", value: "April–June, September–October" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Chania",
  },

  "chapel of the holy cross": {
    title: "Chapel of the Holy Cross",
    description:
      "The Chapel of the Holy Cross in Sedona, Arizona, is a modernist Roman Catholic chapel built directly into a 90-metre red rock butte in 1956, its bold concrete cross projecting from the cliff face in a striking dialogue between faith and landscape. Designed by sculptor Marguerite Brunswig Staude and inspired by the Empire State Building, the chapel is one of Arizona's most recognisable landmarks. The interior is simple and intimate, with a floor-to-ceiling window behind the altar framing the red rock panorama.",
    facts: [
      { label: "Location", value: "Sedona, Arizona, USA" },
      { label: "Built", value: "1956" },
      { label: "Architect", value: "August K. Strotz / Marguerite Brunswig Staude" },
      { label: "Type", value: "Roman Catholic chapel / Landmark" },
      { label: "Listed", value: "National Register of Historic Places (1993)" },
    ],
    externalUrl:
      "https://en.wikipedia.org/wiki/Chapel_of_the_Holy_Cross_(Sedona,_Arizona)",
  },

  "chapultepec castle": {
    title: "Chapultepec Castle",
    description:
      "Chapultepec Castle crowns a 60-metre hill of natural rock in the heart of Chapultepec Park, Mexico City, serving as the only royal castle in the Americas ever to have been used as an official residence by sovereigns — the ill-fated Emperor Maximilian I and Empress Carlota during the Second Mexican Empire. The castle was later home to Mexican presidents and today houses the National Museum of History, whose collections span from the Spanish Conquest to the Mexican Revolution. The panoramic views over the sprawling Mexican capital are extraordinary.",
    facts: [
      { label: "Location", value: "Chapultepec Park, Mexico City, Mexico" },
      { label: "Built", value: "1785 (expanded 1840s–1860s)" },
      { label: "Former Use", value: "Royal residence, Presidential home" },
      { label: "Current Use", value: "National Museum of History" },
      { label: "Notable", value: "Only royal castle in the Americas" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Chapultepec_Castle",
  },

  "charles bridge": {
    title: "Charles Bridge",
    description:
      "Charles Bridge is a medieval stone bridge crossing the Vltava River in Prague, Czech Republic, connecting the Old Town with Malá Strana and the Prague Castle complex. Built between 1357 and the early 15th century at the order of King Charles IV, it is lined with 30 baroque statues of saints added in the 17th and 18th centuries, the most venerated being St. John of Nepomuk. At dawn, before the crowds arrive, the bridge offers one of the most atmospheric and iconic views in Central Europe.",
    facts: [
      { label: "Location", value: "Prague, Czech Republic" },
      { label: "Built", value: "1357–c. 1400s" },
      { label: "Length", value: "516 m" },
      { label: "Statues", value: "30 baroque sculptures" },
      { label: "UNESCO", value: "Prague Historic Centre (1992)" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Charles_Bridge",
  },

  "chateau frontenac": {
    title: "Château Frontenac",
    description:
      "The Château Frontenac is a grand railway hotel in Old Quebec City, Canada, perched on Cap Diamant overlooking the St. Lawrence River and widely considered the world's most photographed hotel. Built by the Canadian Pacific Railway and completed in 1893, its châteauesque architecture — turrets, copper roofs, and stone towers — was designed to recall a French Renaissance castle, establishing a style replicated in railway hotels across Canada. It anchors the historic fortified city of Quebec, a UNESCO World Heritage Site.",
    facts: [
      { label: "Location", value: "Quebec City, Quebec, Canada" },
      { label: "Built", value: "1893" },
      { label: "Architect", value: "Bruce Price" },
      { label: "UNESCO", value: "Historic District of Old Québec (1985)" },
      { label: "Rooms", value: "611" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Ch%C3%A2teau_Frontenac",
  },

  "chatuchak market": {
    title: "Chatuchak Weekend Market",
    description:
      "Chatuchak Weekend Market in Bangkok is one of the largest markets in the world, covering 35 acres and hosting more than 15,000 stalls selling everything from vintage clothing and antiques to live animals, handmade ceramics, and street food. Operating only on Saturdays and Sundays, it draws an estimated 200,000 visitors per weekend, making navigation through its labyrinthine sois (alleys) a characterful adventure. The market is divided into 27 sections, each loosely dedicated to a category of goods.",
    facts: [
      { label: "Location", value: "Chatuchak District, Bangkok, Thailand" },
      { label: "Area", value: "35 acres" },
      { label: "Stalls", value: "~15,000" },
      { label: "Opening", value: "Weekends only" },
      { label: "Weekly Visitors", value: "~200,000" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Chatuchak_Weekend_Market",
  },

  "chenek camp viewpoint": {
    title: "Chenek Camp Viewpoint",
    description:
      "Chenek is the most popular campsite in the Simien Mountains National Park in northern Ethiopia, positioned on the edge of an escarpment with sheer drops of over 500 metres into the valleys below. At dawn and dusk, the viewpoint rewards visitors with extraordinary panoramas over the jagged volcanic peaks and deep gorges of the Simien massif — often wreathed in mist and golden light. Chenek is also one of the best places in the park to observe the endemic Gelada baboons and Walia ibex in the wild.",
    facts: [
      { label: "Location", value: "Simien Mountains NP, Amhara, Ethiopia" },
      { label: "Elevation", value: "~3,600 m" },
      { label: "UNESCO", value: "Simien Mountains NP (1978)" },
      { label: "Wildlife", value: "Gelada baboon, Walia ibex, Ethiopian wolf" },
      { label: "Type", value: "Mountain viewpoint / Campsite" },
    ],
    externalUrl:
      "https://en.wikipedia.org/wiki/Simien_Mountains_National_Park",
  },

  "chiaiolella beach": {
    title: "Chiaiolella Beach",
    description:
      "Chiaiolella is the main beach and resort village on the island of Procida in the Bay of Naples, Italy, its crescent of sand and calm clear water sheltered by the picturesque Vivara promontory — a tiny uninhabited island connected by a pedestrian bridge. The fishing village character of Procida, with its pastel-painted houses reflected in the harbour, has changed little over centuries and inspired Elena Ferrante's Neapolitan novels. When Procida was named Italy's Capital of Culture 2022, Chiaiolella became one of its most celebrated settings.",
    facts: [
      { label: "Location", value: "Procida Island, Bay of Naples, Italy" },
      { label: "Type", value: "Beach / Fishing village" },
      { label: "Notable", value: "Italy's Capital of Culture 2022" },
      { label: "Nearby", value: "Vivara Natural Reserve" },
      { label: "Best Season", value: "June–September" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Procida",
  },

  "chichen itza": {
    title: "Chichen Itza",
    description:
      "Chichen Itza was one of the largest cities of the Maya civilisation, located in the Yucatán Peninsula of Mexico, and its ruins are among the most visited archaeological sites in the Americas. The pyramid of El Castillo (Temple of Kukulcán) is its most famous structure, designed so that during the spring and autumn equinoxes, the shadow of a feathered serpent appears to slither down the northern staircase — a feat of astronomical precision. Chichen Itza was declared a UNESCO World Heritage Site in 1988 and named one of the New Seven Wonders of the World in 2007.",
    facts: [
      { label: "Location", value: "Yucatán, Mexico" },
      { label: "Civilisation", value: "Maya (c. 600–1200 CE)" },
      { label: "UNESCO", value: "World Heritage Site (1988)" },
      { label: "Seven Wonders", value: "New Seven Wonders of the World (2007)" },
      { label: "Annual Visitors", value: "~2.5 million" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Chichen_Itza",
  },

  "chief's island": {
    title: "Chief's Island",
    description:
      "Chief's Island is the largest island in the Moremi Game Reserve at the heart of the Okavango Delta in Botswana, long considered the finest big-game wildlife-watching area on the continent. Access is strictly by small plane or motorboat, keeping visitor numbers low and wildlife encounters extraordinarily intimate — lion, leopard, elephant, buffalo, and wild dog all roam here in high densities. The luxury lodges on Chief's Island are among the most celebrated in Africa, and a stay here represents the pinnacle of safari travel.",
    facts: [
      { label: "Location", value: "Moremi Game Reserve, Okavango Delta, Botswana" },
      { label: "UNESCO", value: "Okavango Delta (2014)" },
      { label: "Access", value: "Charter flight or boat only" },
      { label: "Big Five", value: "All present" },
      { label: "Type", value: "Private game concession / Safari destination" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Chief%27s_Island",
  },

  "chinatown street food": {
    title: "Chinatown Street Food",
    description:
      "Chinatown street food districts in cities across Asia and the world distil decades of culinary evolution into narrow lanes and hawker stalls where vendors specialise in single dishes perfected over generations. Bangkok's Yaowarat Road, Singapore's Chinatown Complex, Kuala Lumpur's Petaling Street, and Kolkata's Terretti Bazaar are among the most celebrated, each with a distinct food culture shaped by regional Chinese immigrant communities. Eating through a Chinatown is often the most economical and flavourful culinary experience a city can offer.",
    facts: [
      { label: "Famous Locations", value: "Bangkok, Singapore, KL, Kolkata, San Francisco" },
      { label: "Type", value: "Street food / Hawker culture" },
      { label: "Best Time", value: "Evening / Night markets" },
      { label: "Dishes", value: "Char kway teow, dim sum, bak kut teh, congee" },
    ],
  },

  "chocolate shops": {
    title: "Chocolate Shops",
    description:
      "Belgium and Switzerland have each cultivated a global reputation for artisan chocolate, with chocolate shops in Brussels, Bruges, Zurich, and Geneva serving as pilgrimage sites for confectionery lovers worldwide. Belgian pralines — invented by Jean Neuhaus in Brussels in 1912 — and Swiss milk chocolate refined by Henri Nestlé and Daniel Peter represent two distinct but equally refined traditions of chocolate-making. Today, a new generation of bean-to-bar artisans are reinterpreting these traditions with single-origin cacao from Central America, Africa, and Southeast Asia.",
    facts: [
      { label: "Famous Destinations", value: "Brussels, Bruges, Zurich, Geneva" },
      { label: "Belgian Specialty", value: "Pralines (invented 1912)" },
      { label: "Swiss Specialty", value: "Milk chocolate (from 1870s)" },
      { label: "Type", value: "Artisan food / Cultural experience" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Belgian_chocolate",
  },

  "chouara tanneries": {
    title: "Chouara Tanneries",
    description:
      "The Chouara Tannery in Fez, Morocco, is one of the oldest leather tanneries in the world, operating by the same methods used since the 11th century in a vast complex of stone honeycomb vats visible from terrace viewing points on the surrounding leather goods shops. Animal hides are soaked in limestone and pigeon dung to soften them, then dyed in vats filled with natural pigments — saffron for yellow, poppy for red, indigo for blue, mint for green. The tanners — known as dabbaghin — work in physically demanding conditions that have changed remarkably little across a millennium.",
    facts: [
      { label: "Location", value: "Fez el-Bali, Fez, Morocco" },
      { label: "Established", value: "11th century" },
      { label: "UNESCO", value: "Medina of Fez (1981)" },
      { label: "Type", value: "Traditional leather tannery" },
      { label: "Notable", value: "Oldest continuously operating tannery in the world" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Chouara_Tannery",
  },

  "chouara tannery": {
    title: "Chouara Tannery",
    description:
      "The Chouara Tannery is the largest of three tanneries in Fez's ancient medina, a dazzling maze of stone vats where leather has been processed using ancient techniques for over a thousand years. Visitors climb to rooftop terraces of surrounding leather shops — handed sprigs of mint to combat the powerful smell — and look down on a scene that appears unchanged from a medieval illuminated manuscript. The leather goods produced here, including babouche slippers and satchels, are sold throughout Moroccan souks and exported worldwide.",
    facts: [
      { label: "Location", value: "Fez el-Bali, Fez, Morocco" },
      { label: "Established", value: "11th century" },
      { label: "Size", value: "Largest tannery in Fez" },
      { label: "Products", value: "Leather shoes, bags, belts, jackets" },
      { label: "Viewing", value: "From rooftop terraces of surrounding shops" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Chouara_Tannery",
  },

  "christ church": {
    title: "Christ Church Cathedral",
    description:
      "Christ Church is the cathedral of the Church of Ireland diocese of Dublin and Glendalough, founded around 1028 and among the oldest buildings in Dublin, its Romanesque and Gothic fabric spanning nearly a thousand years of Irish history. The cathedral was extensively restored in the 1870s by architect George Edmund Street under the patronage of Henry Roe, whose funding transformed the exterior but preserved the medieval crypt — the largest in Ireland and Britain — which runs the full length of the building. It contains the reputed tomb of Strongbow, the Anglo-Norman warlord whose 1170 conquest of Dublin was a pivotal moment in Irish history.",
    facts: [
      { label: "Location", value: "Dublin, Ireland" },
      { label: "Founded", value: "c. 1028" },
      { label: "Denomination", value: "Church of Ireland (Anglican)" },
      { label: "Notable", value: "Largest medieval crypt in Britain & Ireland" },
      { label: "Type", value: "Cathedral / National monument" },
    ],
    externalUrl:
      "https://en.wikipedia.org/wiki/Christ_Church_Cathedral,_Dublin",
  },

  "christ the redeemer": {
    title: "Christ the Redeemer",
    description:
      "Cristo Redentor (Christ the Redeemer) is a 30-metre Art Deco statue of Jesus Christ atop the 710-metre Corcovado mountain in Rio de Janeiro's Tijuca Forest, one of the most recognisable sculptures in the world. Designed by Brazilian engineer Heitor da Silva Costa and French sculptor Paul Landowski, it was completed in 1931 and is constructed from reinforced concrete clad in soapstone. It was named one of the New Seven Wonders of the World in 2007 and surveys Rio's Guanabara Bay from outstretched arms spanning 28 metres.",
    facts: [
      { label: "Location", value: "Corcovado, Rio de Janeiro, Brazil" },
      { label: "Height", value: "30 m (38 m with pedestal)" },
      { label: "Arm Span", value: "28 m" },
      { label: "Completed", value: "1931" },
      { label: "Seven Wonders", value: "New Seven Wonders of the World (2007)" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Christ_the_Redeemer_(statue)",
  },

  "christiania": {
    title: "Freetown Christiania",
    description:
      "Freetown Christiania is a self-proclaimed autonomous neighbourhood of about 850 residents in the Christianshavn district of Copenhagen, Denmark, established in 1971 when squatters occupied a former military barracks and declared independence from the Danish state. The community has its own rules, a car-free policy, and a distinctive culture centred on communal living, arts, and environmental sustainability, with colourful hand-built houses lining a network of canals and footpaths. Christiania remains one of Europe's most unusual and debated social experiments.",
    facts: [
      { label: "Location", value: "Christianshavn, Copenhagen, Denmark" },
      { label: "Founded", value: "1971" },
      { label: "Population", value: "~850 residents" },
      { label: "Status", value: "Semi-autonomous / Self-governing community" },
      { label: "Notable", value: "Car-free, communal, alternative social model" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Freetown_Christiania",
  },

  "church of st. george": {
    title: "Church of St. George",
    description:
      "The rock-hewn Church of St. George in Lalibela, Ethiopia, is considered the finest example of the 11 medieval monolithic churches carved directly from the red volcanic rock of the surrounding plateau in the late 12th to early 13th century. Descending 15 metres below the ground surface, it is a perfect cube of 12×12×12 metres covered in a cross-patterned roof that is only visible once you look down into the excavated pit surrounding it. Lalibela — called the 'New Jerusalem' — remains a major pilgrimage site for Ethiopian Orthodox Christians and a UNESCO World Heritage Site.",
    facts: [
      { label: "Location", value: "Lalibela, Amhara, Ethiopia" },
      { label: "Built", value: "Late 12th–early 13th century" },
      { label: "UNESCO", value: "Rock-Hewn Churches of Lalibela (1978)" },
      { label: "Depth", value: "15 m below ground level" },
      { label: "Dimensions", value: "12 × 12 × 12 m" },
    ],
    externalUrl:
      "https://en.wikipedia.org/wiki/Rock-Hewn_Churches,_Lalibela",
  },

  "church of st. john at kaneo": {
    title: "Church of St. John at Kaneo",
    description:
      "The Church of St. John the Theologian at Kaneo is a 13th-century Byzantine church perched dramatically on a cliff above Lake Ohrid in North Macedonia, with the old town and castle of Ohrid rising on the hill behind it. The image of the small church silhouetted against the deep blue of Lake Ohrid — one of Europe's oldest and deepest lakes — is one of the Balkans' most iconic views and one of the most photographed scenes in the country. The church retains fragments of original Byzantine frescoes and is still used for Orthodox services.",
    facts: [
      { label: "Location", value: "Ohrid, North Macedonia" },
      { label: "Built", value: "13th century" },
      { label: "Style", value: "Byzantine" },
      { label: "UNESCO", value: "Ohrid region (1979 / 1980)" },
      { label: "Type", value: "Orthodox church / Historic monument" },
    ],
    externalUrl:
      "https://en.wikipedia.org/wiki/Church_of_Saint_John_at_Kaneo",
  },

  "circuito chico": {
    title: "Circuito Chico",
    description:
      "Circuito Chico is a scenic 65-kilometre driving and cycling loop around the Andean lakes and forests surrounding Bariloche in Patagonian Argentina, offering a concentrated introduction to the dramatic landscape of the Lake District. The route passes the crystalline shores of Lago Moreno and Lago Nahuel Huapi, the Llao Llao Hotel (one of South America's great historic resort hotels), and dozens of viewpoints over snow-capped peaks and deep blue water. It can be completed in half a day by car or as a full day's cycling adventure.",
    facts: [
      { label: "Location", value: "Bariloche, Río Negro, Argentina" },
      { label: "Distance", value: "~65 km loop" },
      { label: "Type", value: "Scenic drive / Cycling route" },
      { label: "Notable Stop", value: "Llao Llao Hotel & Cerro Campanario viewpoint" },
      { label: "Best Season", value: "November–April" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Bariloche",
  },

  "city palace": {
    title: "City Palace",
    description:
      "The City Palace of Jaipur is a vast complex of courtyards, gardens, and palaces at the centre of the walled Pink City, the ceremonial and artistic heart of the former princely state of Jaipur in Rajasthan, India. Built primarily by Maharaja Sawai Jai Singh II in the early 18th century, the palace blends Rajput, Mughal, and European architectural styles, and part of it remains the residence of the royal family of Jaipur today. The Chandra Mahal and Mubarak Mahal pavilions, the Diwan-i-Khas, and the two enormous silver urns — the world's largest sterling silver objects — are its most celebrated features.",
    facts: [
      { label: "Location", value: "Jaipur, Rajasthan, India" },
      { label: "Built", value: "c. 1727–1732" },
      { label: "Founder", value: "Maharaja Sawai Jai Singh II" },
      { label: "UNESCO", value: "Jaipur City (2019)" },
      { label: "Still Royal Residence", value: "Chandra Mahal (partial)" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/City_Palace,_Jaipur",
  },

  "city walls walk": {
    title: "City Walls Walk",
    description:
      "Walking the city walls of York, England, offers a continuous 3.4-kilometre circuit atop the best-preserved medieval city walls in northern England, originally built by the Romans and comprehensively expanded by the Normans and medieval English kings. The walls pass through four intact medieval gatehouses (bars), offer views into hidden gardens and the backs of Victorian terraces, and rise to tower above the Shambles, one of Europe's best-preserved medieval streets. The walk to and from the magnificent York Minster through the gate of Bootham Bar is the most dramatic sequence.",
    facts: [
      { label: "Location", value: "York, England" },
      { label: "Length", value: "3.4 km (full circuit)" },
      { label: "Origin", value: "Roman (71 CE), expanded medieval" },
      { label: "Gatehouses", value: "4 (Bootham, Monk, Walmgate, Micklegate)" },
      { label: "Type", value: "Historic city walls / Walking trail" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/York_city_walls",
  },

  "city of arts and sciences": {
    title: "City of Arts and Sciences",
    description:
      "The City of Arts and Sciences (Ciutat de les Arts i les Ciències) is a spectacular cultural complex in Valencia, Spain, designed primarily by architect Santiago Calatrava and partly by Félix Candela, occupying a former dry riverbed of the Turia in a 350,000-square-metre park. Its futuristic white structures include the Hemisfèric (IMAX cinema), the Science Museum, the L'Umbracle garden, the L'Oceanogràfic (the largest aquarium in Europe), and the Palau de les Arts opera house. Completed between 1998 and 2005, it is one of the defining works of contemporary Spanish architecture.",
    facts: [
      { label: "Location", value: "Valencia, Spain" },
      { label: "Architects", value: "Santiago Calatrava & Félix Candela" },
      { label: "Completed", value: "1998–2009" },
      { label: "Area", value: "350,000 m²" },
      { label: "Highlights", value: "L'Oceanogràfic (largest EU aquarium), IMAX, Opera" },
    ],
    externalUrl:
      "https://en.wikipedia.org/wiki/City_of_Arts_and_Sciences",
  },

  "ciudad vieja": {
    title: "Ciudad Vieja",
    description:
      "Ciudad Vieja is the historic Old Town of Montevideo, Uruguay, occupying the tip of the peninsula on which the city was founded in 1724, its colonial and Art Deco architecture preserved along a compact grid of streets leading to the historic harbour. The Mercado del Puerto — a magnificent 19th-century iron market hall packed with parrillas serving Uruguayan asado — and the Teatro Solís opera house are its principal landmarks. In recent years, Ciudad Vieja has emerged as one of South America's most authentic and affordable cultural neighbourhoods.",
    facts: [
      { label: "Location", value: "Montevideo, Uruguay" },
      { label: "Founded", value: "1724" },
      { label: "Type", value: "Historic city quarter" },
      { label: "Key Sites", value: "Mercado del Puerto, Teatro Solís, Plaza Independencia" },
      { label: "UNESCO", value: "On Uruguay's tentative list" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Ciudad_Vieja,_Montevideo",
  },

  "clan jetties": {
    title: "Clan Jetties",
    description:
      "The Clan Jetties of Georgetown, Penang, are a series of Chinese clan villages built on stilts over the sea, each traditionally associated with a different Chinese surname clan — Chew, Lim, Tan, Lee, and others — whose ancestors arrived as immigrants in the 19th century. The Chew Jetty is the largest and most visited, with a main boardwalk lined by wooden houses, a clan temple, and souvenir stalls stretching over the Strait of Malacca. The jetties represent one of the last intact water village settlements of their kind in Malaysia and are a UNESCO-listed heritage asset of George Town.",
    facts: [
      { label: "Location", value: "George Town, Penang, Malaysia" },
      { label: "UNESCO", value: "George Town (2008)" },
      { label: "Established", value: "Late 19th century" },
      { label: "Clans", value: "Chew, Lim, Tan, Lee, Mixed" },
      { label: "Type", value: "Living heritage / Chinese clan village on stilts" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Clan_Jetties",
  },

  "cleetwood cove trail": {
    title: "Cleetwood Cove Trail",
    description:
      "The Cleetwood Cove Trail is the only trail in Crater Lake National Park, Oregon, that descends to the water's edge of Crater Lake, the deepest lake in the United States at 592 metres. The steep 2.4-kilometre (round trip) trail drops 219 metres through volcanic rock and wildflower meadows to a small rocky beach and dock where tour boats and the park's swimming area are located. From the lakeshore, the view upward to the blue water horizon and the perfectly circular caldera rim is uniquely dramatic.",
    facts: [
      { label: "Location", value: "Crater Lake National Park, Oregon, USA" },
      { label: "Trail Length", value: "2.4 km (round trip)" },
      { label: "Elevation Drop", value: "219 m" },
      { label: "Lake Depth", value: "592 m (deepest in USA)" },
      { label: "Access", value: "Only trail to lake's edge" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Crater_Lake_National_Park",
  },

  "cliff granaries": {
    title: "Cliff Granaries",
    description:
      "The cliff granaries of the Dogon people in Mali's Bandiagara Escarpment are dramatic mud-brick storage structures built into the sheer faces of the 150-kilometre sandstone cliff, occupying the former cave dwellings of the pre-Dogon Tellem people who once inhabited the cliffs. Each granary — with its distinctive onion-shaped thatched roof — is owned by a single family and used to store millet, seeds, and precious belongings, and the older examples date back 800 years or more. The entire Bandiagara landscape is a UNESCO World Heritage Site combining outstanding natural scenery with living Dogon culture.",
    facts: [
      { label: "Location", value: "Bandiagara Escarpment, Mali" },
      { label: "People", value: "Dogon (built in former Tellem cave sites)" },
      { label: "UNESCO", value: "Bandiagara Escarpment (1989)" },
      { label: "Age", value: "Up to 800+ years" },
      { label: "Type", value: "Traditional architecture / Cliff granaries" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Bandiagara_Escarpment",
  },

  "cloud 9": {
    title: "Cloud 9",
    description:
      "Cloud 9 is an iconic overwater bar and surf viewing platform in the crystal-clear waters of the Mamanuca Islands, Fiji, accessible only by boat and perched on a shallow reef above one of Fiji's most celebrated surf breaks. Day-trippers and surfers anchor nearby and swim or paddle up to the wooden platform to enjoy cocktails while watching experienced surfers ride the powerful reef waves below. The combination of turquoise Fijian water, coral reef, and a floating bar has made Cloud 9 one of the most Instagrammed spots in the South Pacific.",
    facts: [
      { label: "Location", value: "Mamanuca Islands, Fiji" },
      { label: "Access", value: "Boat only" },
      { label: "Type", value: "Overwater bar / Surf viewing platform" },
      { label: "Surf Break", value: "Nearby reef wave (Cloud Break)" },
      { label: "Best Season", value: "April–October (surf season)" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Mamanuca_Islands",
  },

  "coffee ceremony": {
    title: "Coffee Ceremony",
    description:
      "The Ethiopian coffee ceremony (Buna) is a deeply social and spiritual ritual performed by a woman who roasts green coffee beans over charcoal, grinds them with a mortar and pestle, and brews the coffee in a clay pot called a jebena before serving three rounds of increasingly dilute but always intensely aromatic coffee to guests. Ethiopia is the birthplace of coffee — the Coffea arabica plant originates from the Kaffa region — and the ceremony, which can last an hour or more, is a fundamental expression of hospitality and community. Attending a traditional ceremony in an Ethiopian home or in one of Addis Ababa's cafés is a profoundly warm cultural experience.",
    facts: [
      { label: "Origin", value: "Ethiopia (birthplace of coffee)" },
      { label: "Duration", value: "1–2 hours" },
      { label: "Rounds", value: "3 (abol, tona, baraka)" },
      { label: "Vessel", value: "Jebena (clay pot)" },
      { label: "UNESCO", value: "Intangible Cultural Heritage (2024)" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Coffee_ceremony_(Ethiopia)",
  },

  "coffee plantations": {
    title: "Coffee Plantations",
    description:
      "Coffee plantation tours offer an immersive look at the full journey from seed to cup, taking visitors through the processes of growing, harvesting, washing, drying, roasting, and brewing specialty coffee in its country of origin. Colombia's Coffee Cultural Landscape (UNESCO), Bali's volcanic highland plantations, Costa Rica's Central Valley, and the Ngorongoro Highlands of Tanzania are among the world's most celebrated coffee tourism destinations. Tasting freshly roasted coffee in the shade of the plantation where the beans were grown is an experience that fundamentally changes how you understand the world's most consumed beverage.",
    facts: [
      { label: "Famous Regions", value: "Colombia, Costa Rica, Ethiopia, Bali, Tanzania" },
      { label: "UNESCO", value: "Coffee Cultural Landscape of Colombia (2011)" },
      { label: "Best Altitude", value: "900–2,000 m (arabica)" },
      { label: "Harvest Season", value: "Varies by region" },
      { label: "Type", value: "Agritourism / Cultural experience" },
    ],
    externalUrl:
      "https://en.wikipedia.org/wiki/Coffee_production_in_Colombia",
  },

  "colobus monkey conservation": {
    title: "Colobus Conservation",
    description:
      "Colobus Conservation is a wildlife sanctuary and research centre in Diani Beach on Kenya's south coast, dedicated to the protection of the endangered Angola colobus monkey — a striking black-and-white primate that lives in the coastal forests flanking the Indian Ocean. The centre rescues injured and orphaned colobuses, conducts population surveys, and has pioneered an innovative network of 'colobridges' — rope bridges over roads — that allow the monkeys to cross safely between forest fragments. Visitors can take guided tours of the centre and sometimes observe colobuses being prepared for release.",
    facts: [
      { label: "Location", value: "Diani Beach, Kwale County, Kenya" },
      { label: "Species", value: "Angola colobus (Colobus angolensis palliatus)" },
      { label: "Founded", value: "1997" },
      { label: "Colobridges", value: "30+ rope bridges across roads" },
      { label: "Type", value: "Wildlife sanctuary / Conservation centre" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Colobus_Conservation",
  },

  "colorado river rafting": {
    title: "Colorado River Rafting",
    description:
      "Rafting the Colorado River through the Grand Canyon is one of the great wilderness adventures of the world, a multi-day journey through one of Earth's most awe-inspiring geological landscapes, passing billion-year-old rock layers, thundering rapids, and canyon walls that rise over 1,500 metres above. The full 366-kilometre trip from Lee's Ferry to Lake Mead takes 6–18 days and is one of the most sought-after outdoor experiences in the United States — commercial permits for self-guided trips require a lottery system. The experience of camping on sandy beaches under the canyon's star-filled sky between river days is incomparable.",
    facts: [
      { label: "Location", value: "Grand Canyon, Arizona, USA" },
      { label: "Distance", value: "366 km (full run)" },
      { label: "Duration", value: "6–18 days (motorised or oar)" },
      { label: "Rapids", value: "160+ (including Lava Falls, Crystal)" },
      { label: "Permits", value: "Lottery system (high demand)" },
    ],
    externalUrl:
      "https://en.wikipedia.org/wiki/Colorado_River_through_the_Grand_Canyon",
  },

  "colosseum": {
    title: "Colosseum",
    description:
      "The Colosseum in Rome is the largest amphitheatre ever built, a monument of Roman engineering completed around 80 CE that could hold an estimated 50,000–80,000 spectators for gladiatorial contests, animal hunts, and public spectacles. Its elliptical design, 188 metres long and 57 metres tall, introduced the architectural vocabulary of arched tiers and radiating vaults that would define Western stadium design for two millennia. It remains the most visited tourist site in Italy and one of the most recognised buildings in human history.",
    facts: [
      { label: "Location", value: "Rome, Italy" },
      { label: "Completed", value: "c. 80 CE" },
      { label: "Capacity", value: "50,000–80,000 spectators" },
      { label: "Dimensions", value: "188 × 156 m" },
      { label: "UNESCO", value: "Historic Centre of Rome (1980)" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Colosseum",
  },

  "columbia icefield": {
    title: "Columbia Icefield",
    description:
      "The Columbia Icefield is the largest mass of ice in the Rocky Mountains of North America south of Alaska, straddling the Continental Divide in Banff and Jasper National Parks in Alberta, Canada, covering approximately 325 square kilometres at elevations between 1,900 and 3,456 metres. It feeds eight major glaciers — including the Athabasca Glacier, accessible by road from the Icefields Parkway — and is the hydrological apex of North America, draining into three oceans: the Pacific, Atlantic, and Arctic. The Skywalk glass-floored viewing platform cantilevered 280 metres above the Sunwapta Valley is one of Canada's most dramatic viewpoints.",
    facts: [
      { label: "Location", value: "Alberta, Canada (Banff & Jasper NPs)" },
      { label: "Area", value: "~325 km²" },
      { label: "Elevation", value: "1,900–3,456 m" },
      { label: "UNESCO", value: "Canadian Rocky Mountain Parks (1984)" },
      { label: "Drains Into", value: "Pacific, Atlantic, and Arctic Oceans" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Columbia_Icefield",
  },

  "columbia river gorge": {
    title: "Columbia River Gorge",
    description:
      "The Columbia River Gorge is a spectacular canyon of the Columbia River forming the border between Oregon and Washington State, its basalt walls rising up to 1,200 metres and channelling some of the most powerful winds in North America — making it the windsurfing and kiteboarding capital of the world. The gorge contains more than 90 waterfalls on its Oregon side, including the iconic two-tiered Multnomah Falls (189 metres), accessible just 30 minutes from Portland. The Historic Columbia River Highway, America's first scenic highway, offers a stunning driving route through the western gorge.",
    facts: [
      { label: "Location", value: "Oregon / Washington, USA" },
      { label: "Length", value: "130 km" },
      { label: "Wall Height", value: "Up to 1,200 m" },
      { label: "Waterfalls", value: "90+ on Oregon side" },
      { label: "Notable", value: "Windsurfing capital of the world" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Columbia_River_Gorge",
  },

  "comuna 13": {
    title: "Comuna 13",
    description:
      "Comuna 13 is a hillside neighbourhood in Medellín, Colombia, that transformed from one of the city's most violent and feared barrios in the late 1990s and early 2000s into a celebrated example of urban renewal and community-driven arts. Outdoor escalators installed in 2011 connected residents of the steep hillside to the city for the first time, becoming symbols of the transformation, while electric outdoor murals by local and international artists turned the neighbourhood's walls into one of Latin America's largest open-air art galleries. Guided walking tours of the graffiti, hip-hop culture, and community initiatives are among Medellín's most popular experiences.",
    facts: [
      { label: "Location", value: "Medellín, Antioquia, Colombia" },
      { label: "Type", value: "Urban neighbourhood / Street art destination" },
      { label: "Outdoor Escalators", value: "Installed 2011" },
      { label: "Known For", value: "Urban transformation, street art, hip-hop culture" },
      { label: "Best Visited", value: "With a local guided tour" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/El_Poblado",
  },

  "conch bar caves": {
    title: "Conch Bar Caves",
    description:
      "The Conch Bar Caves on Middle Caicos in the Turks and Caicos Islands are the largest cave system in the Lucayan Archipelago and among the most extensive in the entire Caribbean, stretching over 15 kilometres of documented passages through limestone karst. The caves were sacred to the Lucayan (Taíno) people who inhabited the islands before European arrival, and archaeological evidence of their habitation — including pottery and shell middens — has been found inside. Stalactites, stalagmites, enormous chambers, and colonies of bats make guided exploration a memorable adventure.",
    facts: [
      { label: "Location", value: "Middle Caicos, Turks and Caicos Islands" },
      { label: "Length", value: "15+ km of passages" },
      { label: "Type", value: "Limestone karst cave system" },
      { label: "Archaeological", value: "Lucayan (Taíno) artefacts found" },
      { label: "Access", value: "Guided tours only" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Conch_Bar_Caves",
  },

  "cooking classes": {
    title: "Cooking Classes",
    description:
      "Hands-on cooking classes are among the most rewarding ways to engage with a new culture, teaching travellers to prepare local dishes using traditional techniques, spices, and seasonal ingredients under the guidance of local chefs or home cooks. Thailand's northern highlands, Tuscany, Morocco's riads, Vietnam's riverside kitchens, and Peru's culinary schools are among the most celebrated destinations for immersive cooking experiences that begin with a market visit and end at the table. The skills and recipes learned typically become lasting souvenirs of a journey.",
    facts: [
      { label: "Type", value: "Cultural / Culinary experience" },
      { label: "Famous Destinations", value: "Chiang Mai, Bologna, Marrakech, Hoi An, Lima" },
      { label: "Typical Format", value: "Market tour + cooking + communal meal" },
      { label: "Duration", value: "Half-day to full-day" },
    ],
  },

  "copacabana": {
    title: "Copacabana Beach",
    description:
      "Copacabana is one of the world's most famous urban beaches, a 4-kilometre crescent of golden sand in Rio de Janeiro flanked by the iconic black-and-white wave-patterned mosaic promenade (designed by Roberto Burle Marx) and a continuous wall of Art Deco and mid-century apartment buildings. The beach is a democratic social space where football, volleyball, capoeira, and caipirinhas coexist, and on New Year's Eve it hosts one of the world's largest celebrations, when millions gather in white to watch fireworks over Guanabara Bay. Its name comes from a Bolivian lake town, brought to Rio by an 18th-century Portuguese governor.",
    facts: [
      { label: "Location", value: "Rio de Janeiro, Brazil" },
      { label: "Length", value: "~4 km" },
      { label: "Promenade Design", value: "Roberto Burle Marx" },
      { label: "New Year's Eve", value: "One of the world's largest celebrations" },
      { label: "Type", value: "Urban beach" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Copacabana,_Rio_de_Janeiro",
  },

  "coracle river crossing": {
    title: "Coracle River Crossing",
    description:
      "Coracle crossings on Kerala's Periyar River and other South Indian waterways use tiny circular wicker-and-hide or fibreglass bowls, propelled by a single paddle in a figure-eight motion — one of the most ancient boat forms still in daily use in India. Hereditary coracle operators ferry locals and tourists across the river in a vessel so perfectly round that it is technically a 'self-stabilising disc hull', spinning gently in the current. The experience offers an intimate look at a traditional technology that has remained essentially unchanged for millennia.",
    facts: [
      { label: "Location", value: "Kerala & other rivers, South India" },
      { label: "Type", value: "Traditional circular river boat" },
      { label: "Material", value: "Wicker, hide, or fibreglass" },
      { label: "Propulsion", value: "Single paddle, figure-eight stroke" },
      { label: "Heritage", value: "One of the world's oldest boat types" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Coracle",
  },

  "coral reefs": {
    title: "Coral Reefs",
    description:
      "Coral reefs are among the most biodiverse ecosystems on Earth, covering less than 0.1% of the ocean floor yet supporting an estimated 25% of all marine species. The Great Barrier Reef in Australia, the Coral Triangle spanning Indonesia, the Philippines, and Papua New Guinea, Belize's Mesoamerican Barrier Reef, and the Red Sea's extraordinary reefs are the world's premier diving and snorkelling destinations. Threatened by ocean warming and acidification, experiencing a reef's teeming life at first hand has become both a privilege and a reminder of what is at stake.",
    facts: [
      { label: "Ocean Coverage", value: "<0.1%" },
      { label: "Marine Biodiversity", value: "~25% of marine species" },
      { label: "Greatest Reef", value: "Great Barrier Reef, Australia (2,300 km)" },
      { label: "Biodiversity Hotspot", value: "Coral Triangle (Indonesia, Philippines, PNG)" },
      { label: "Threat", value: "Ocean warming and acidification" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Coral_reef",
  },

  "coron shipwrecks": {
    title: "Coron Shipwrecks",
    description:
      "The waters around Coron in Palawan, Philippines, contain one of the greatest wreck diving sites in the world — a fleet of twelve Japanese warships and supply vessels sunk on 24 September 1944 during a devastating American air attack on the Japanese fleet sheltering in Coron Bay. The wrecks lie at depths of 10–40 metres and are encrusted in spectacular coral and sponge growth, hosting enormous populations of fish, sea turtles, and occasional reef sharks in a hauntingly beautiful underwater museum. The Okikawa Maru tanker and the Irako victualling ship are among the most impressive dives.",
    facts: [
      { label: "Location", value: "Coron, Palawan, Philippines" },
      { label: "Wrecks", value: "12+ Japanese WWII vessels" },
      { label: "Sunk", value: "24 September 1944" },
      { label: "Depth Range", value: "10–40 m" },
      { label: "Type", value: "WWII wreck diving" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Coron_Bay",
  },

  "costa smeralda": {
    title: "Costa Smeralda",
    description:
      "Costa Smeralda (Emerald Coast) is a 55-kilometre stretch of granite headlands, hidden coves, and transparent turquoise water on the northeastern coast of Sardinia, Italy, developed from the 1960s into one of the Mediterranean's most exclusive resort destinations by Prince Karim Aga Khan. The resorts of Porto Cervo and Porto Rotondo were designed with strict architectural guidelines to blend with the landscape, and the coast remains a magnet for superyacht owners and European high society during the summer season. The water clarity and colour of the beaches — Capriccioli, Grande Pevero, and Liscia Ruja — is exceptional even by Sardinian standards.",
    facts: [
      { label: "Location", value: "Sassari Province, Sardinia, Italy" },
      { label: "Coastline", value: "~55 km" },
      { label: "Developed", value: "From 1963 by Aga Khan" },
      { label: "Season", value: "June–September" },
      { label: "Notable Beaches", value: "Capriccioli, Grande Pevero, Liscia Ruja" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Costa_Smeralda",
  },

  "cotswold way trail": {
    title: "Cotswold Way",
    description:
      "The Cotswold Way is a 164-kilometre National Trail walking route through the Cotswolds Area of Outstanding Natural Beauty in England, running between the historic market town of Chipping Campden and the Roman city of Bath along the dramatic escarpment of the Cotswold Hills. The route passes through some of England's most quintessential landscapes — honey-stone villages, ancient beech woodlands, Bronze Age hill forts, and sweeping views over the Severn Valley — and is designed so walkers pass a pub or village at regular intervals. It is widely regarded as one of Britain's most beautiful long-distance walking routes.",
    facts: [
      { label: "Start / End", value: "Chipping Campden to Bath, England" },
      { label: "Distance", value: "164 km" },
      { label: "Type", value: "National Trail / Long-distance walk" },
      { label: "Terrain", value: "Rolling hills, villages, ancient woodland" },
      { label: "Duration", value: "7–10 days" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Cotswold_Way",
  },

  "coyoacan": {
    title: "Coyoacán",
    description:
      "Coyoacán is one of the oldest and most culturally rich neighbourhoods in Mexico City, its cobblestone streets, colonial plazas, and brightly painted houses preserving the character of an independent village that was absorbed by the expanding capital. It is most famous as the home of Frida Kahlo — the Casa Azul (Blue House), now a museum, was her birthplace and home for most of her life — and also served as the refuge of exiled Russian revolutionary Leon Trotsky. The Mercado de Artesanías, the main plaza, and dozens of cafés and bookshops make Coyoacán one of Mexico City's most enjoyable and walkable districts.",
    facts: [
      { label: "Location", value: "Mexico City, Mexico" },
      { label: "Type", value: "Historic borough / Cultural neighbourhood" },
      { label: "Key Attraction", value: "Frida Kahlo Museum (Casa Azul)" },
      { label: "Also Notable", value: "Leon Trotsky House Museum" },
      { label: "Best For", value: "Walking, markets, cafés, art" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Coyoac%C3%A1n",
  },

  "cozumel day trip": {
    title: "Cozumel Day Trip",
    description:
      "Cozumel is a Caribbean island off the east coast of Mexico's Yucatán Peninsula, reached by a 45-minute ferry from Playa del Carmen, and celebrated worldwide as one of the premier scuba diving destinations on Earth. The Mesoamerican Barrier Reef runs along its western shore, offering wall dives, drift dives through canyons of coral, and encounters with nurse sharks, eagle rays, and sea turtles in luminously clear water. On the surface, San Miguel de Cozumel's colourful downtown, beach clubs, and seafood restaurants make it a rewarding day trip even for non-divers.",
    facts: [
      { label: "Location", value: "Quintana Roo, Mexico" },
      { label: "Ferry from Playa del Carmen", value: "~45 minutes" },
      { label: "Reef System", value: "Mesoamerican Barrier Reef" },
      { label: "UNESCO Biosphere Reserve", value: "Yes" },
      { label: "Best For", value: "Scuba diving, snorkelling, beach clubs" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Cozumel",
  },

  "cradle mountain": {
    title: "Cradle Mountain",
    description:
      "Cradle Mountain is the dramatic dolerite peak at the northern end of the Cradle Mountain-Lake St Clair National Park in Tasmania, Australia, its twin summits rising to 1,545 metres above an ancient glaciated plateau of alpine heathland, tarns, and dense temperate rainforest. The Overland Track — Tasmania's most celebrated multi-day walk — begins here and runs 65 kilometres south to Lake St Clair, the deepest lake in Australia. The park is part of the UNESCO-listed Tasmanian Wilderness, home to wombats, wallabies, quolls, and the endangered Tasmanian devil.",
    facts: [
      { label: "Location", value: "Tasmania, Australia" },
      { label: "Elevation", value: "1,545 m" },
      { label: "UNESCO", value: "Tasmanian Wilderness (1982)" },
      { label: "Overland Track", value: "65 km (6–8 days)" },
      { label: "Wildlife", value: "Wombat, quoll, Tasmanian devil, wallaby" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Cradle_Mountain",
  },

  "crystal caves": {
    title: "Crystal Caves",
    description:
      "Crystal Caves on Bermuda is a spectacular subterranean world of stalactites, stalagmites, and translucent crystalline formations reflected in two underground lakes of extraordinarily clear water — Cathedral Cave and Fantasy Cave — connected by a floating pontoon bridge. The caves were discovered in 1907 by two boys looking for a lost cricket ball, and the story of the discovery is as charming as the caves themselves. The crystal-clear water of the underground lakes reveals limestone formations up to 10 metres below the surface with perfect clarity.",
    facts: [
      { label: "Location", value: "Bailey's Bay, Bermuda" },
      { label: "Discovered", value: "1907" },
      { label: "Caves", value: "Cathedral Cave & Fantasy Cave" },
      { label: "Water Depth", value: "Up to 18 m" },
      { label: "Type", value: "Limestone cave system / Tourist attraction" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Crystal_Caves,_Bermuda",
  },

  "curieuse island": {
    title: "Curieuse Island",
    description:
      "Curieuse is a small island in the Seychelles group, a 30-minute boat ride from Praslin, notable for being one of only two islands in the world where the Coco de Mer palm grows naturally in the wild and home to a managed population of around 300 Aldabra giant tortoises that roam freely across the island. The island's distinctive red-earth granite interior and mangrove-fringed coast are protected as the Curieuse Marine National Park, and the ruins of a 19th-century leper colony add a melancholy historical layer to its extraordinary natural beauty. Snorkelling in the marine park reveals pristine coral gardens.",
    facts: [
      { label: "Location", value: "Seychelles (near Praslin)" },
      { label: "Tortoises", value: "~300 Aldabra giant tortoises" },
      { label: "UNESCO", value: "Vallée de Mai (nearby, 1983)" },
      { label: "Protection", value: "Curieuse Marine National Park" },
      { label: "Type", value: "Island nature reserve / Snorkelling" },
    ],
    externalUrl: "https://en.wikipedia.org/wiki/Curieuse",
  },

  "custom tailoring": {
    title: "Custom Tailoring",
    description:
      "Custom tailoring in cities like Hong Kong, Hoi An, Bangkok, and Istanbul offers travellers the chance to have garments made to precise personal measurements in 24–72 hours at a fraction of Western boutique prices, using skilled tailors who often carry on multi-generational family traditions. Hoi An's Old Town, for instance, is home to hundreds of tailoring shops where silk ao dai, linen suits, and evening wear can be made overnight from a photo reference. Selecting fabrics, choosing linings, and having a fitting or two makes the experience a meaningful participation in local craft.",
    facts: [
      { label: "Famous Destinations", value: "Hoi An, Hong Kong, Bangkok, Istanbul" },
      { label: "Turnaround", value: "24–72 hours typical" },
      { label: "Popular Items", value: "Suits, dresses, ao dai, shirts" },
      { label: "Type", value: "Artisan craft / Cultural experience" },
    ],
  },
};
