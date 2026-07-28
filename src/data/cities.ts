export interface Neighbourhood {
  name: string;
  description: string;
}

export interface CostOfLiving {
  housing: string;
  groceries: string;
  transit: string;
  notes: string;
}

export interface City {
  slug: string;
  name: string;
  tier: "primary" | "secondary";
  region: string;
  tagline: string;
  overview: string;
  bestFor: string[];
  climate: string;
  commuteNotes: string;
  neighbourhoods: Neighbourhood[];
  costOfLiving: CostOfLiving | null;
}

const TBD: CostOfLiving = {
  housing: "TBD",
  groceries: "TBD",
  transit: "TBD",
  notes: "TBD",
};

export const cities: City[] = [
  {
    slug: "vancouver",
    name: "Vancouver",
    tier: "primary",
    region: "Metro Vancouver",
    tagline: "Ocean, mountains, and Canada's most globally connected west coast city.",
    overview:
      "Vancouver is the cultural and economic heart of British Columbia, where a dense, walkable downtown sits between the Pacific and the North Shore mountains. It draws newcomers from around the world with its diversity, mild climate, and year-round access to the outdoors. Housing is the tightest in the province, so most newcomers start by renting while they learn the neighbourhoods.",
    bestFor: ["Young professionals", "Newcomers to Canada", "Students", "Urban lifestyle seekers"],
    climate:
      "Mild and rainy. Winters hover just above freezing with long stretches of grey drizzle; summers are warm, dry, and rarely uncomfortably hot. Snow is occasional and short-lived at sea level.",
    commuteNotes:
      "The most transit-served city in BC: SkyTrain, SeaBus, and a dense bus network make car-free living realistic downtown and along the Expo, Canada, and Millennium lines. Driving in and out of the downtown peninsula at rush hour is slow, and parking is expensive.",
    neighbourhoods: [
      {
        name: "Kitsilano",
        description:
          "Beachfront living with heritage character homes, independent shops on West 4th, and an easy commute downtown.",
      },
      {
        name: "Mount Pleasant",
        description:
          "Creative, walkable, and full of breweries, cafés, and studios — popular with young professionals and families.",
      },
      {
        name: "West End",
        description:
          "High-density apartment living beside Stanley Park and English Bay, with the shortest commute in the city.",
      },
      {
        name: "East Vancouver (Commercial Drive)",
        description:
          "Long-standing immigrant communities, food from everywhere, and some of the city's more attainable rentals.",
      },
      {
        name: "Marpole",
        description:
          "Quieter south-side neighbourhood near the Canada Line and the airport, favoured by families and commuters to Richmond.",
      },
    ],
    costOfLiving: { ...TBD },
  },
  {
    slug: "victoria",
    name: "Victoria",
    tier: "primary",
    region: "Vancouver Island",
    tagline: "BC's capital: gentle climate, walkable core, island pace.",
    overview:
      "Victoria pairs a historic harbourfront downtown with leafy residential neighbourhoods and the mildest weather in Canada. As the provincial capital it has a stable public-sector job base alongside a growing tech scene. Life moves at an island pace, and getting to the mainland means a ferry or a short flight.",
    bestFor: ["Retirees", "Remote workers", "Public sector professionals", "Cyclists"],
    climate:
      "The mildest in Canada. Dry, comfortable summers and wet but rarely freezing winters; snow is unusual and flowers bloom in February.",
    commuteNotes:
      "Compact enough that cycling is a genuine primary mode thanks to the Galloping Goose trail network. Buses serve the region; there is no rail. Reaching Vancouver means BC Ferries from Swartz Bay or a floatplane from the Inner Harbour.",
    neighbourhoods: [
      {
        name: "Fairfield",
        description:
          "Character homes, Dallas Road waterfront walks, and a short stroll or ride into downtown.",
      },
      {
        name: "Oak Bay",
        description:
          "Established, quiet, and green, with strong schools and a village-style shopping street.",
      },
      {
        name: "Fernwood",
        description:
          "Artsy and community-minded with heritage housing and one of the city's most active neighbourhood associations.",
      },
      {
        name: "Saanich",
        description:
          "The larger suburban municipality wrapping Victoria — bigger lots, family housing, and easy access to farmland and lakes.",
      },
      {
        name: "James Bay",
        description:
          "Between downtown and the ferry terminal, mixing apartments, heritage homes, and ocean-side paths.",
      },
    ],
    costOfLiving: { ...TBD },
  },
  {
    slug: "kelowna",
    name: "Kelowna",
    tier: "primary",
    region: "Okanagan",
    tagline: "Lake life, real summers, and BC's fastest-growing interior city.",
    overview:
      "Kelowna sits on Okanagan Lake surrounded by vineyards, orchards, and ski hills. It has grown quickly from a retirement and holiday town into a year-round city with a university, a tech corridor, and a busy airport. The trade-off for the sunshine is genuine seasons and a car-oriented layout.",
    bestFor: ["Families", "Remote workers", "Outdoor enthusiasts", "Retirees"],
    climate:
      "Semi-arid with four real seasons. Hot, dry summers regularly above 30°C, crisp snowy winters, and a wildfire smoke risk in late summer.",
    commuteNotes:
      "Driving is the default; Highway 97 through the middle of town is the main artery and backs up at peak hours. Transit covers the core and UBC Okanagan, and the Okanagan Rail Trail makes north-south cycling pleasant.",
    neighbourhoods: [
      {
        name: "Downtown / Cultural District",
        description:
          "Walkable waterfront core with restaurants, galleries, and new mid-rise condos.",
      },
      {
        name: "Lower Mission",
        description:
          "Beaches, established family homes, and well-regarded schools south of downtown.",
      },
      {
        name: "Glenmore",
        description:
          "Central family suburb with newer housing, parks, and a quick hop to the airport corridor.",
      },
      {
        name: "Rutland",
        description:
          "The most attainable part of the city, diverse and increasingly served by new transit and amenities.",
      },
      {
        name: "Kettle Valley / Upper Mission",
        description:
          "Hillside master-planned neighbourhoods with lake views and a longer drive into town.",
      },
    ],
    costOfLiving: { ...TBD },
  },
  {
    slug: "surrey",
    name: "Surrey",
    tier: "primary",
    region: "Metro Vancouver",
    tagline: "Metro Vancouver's fastest-growing city — space, diversity, and new build homes.",
    overview:
      "Surrey is on track to become BC's largest city and is where many newcomer families find their first home with a yard. It is really several town centres stitched together, each with a distinct feel, and it hosts some of the province's largest South Asian and Filipino communities. Infrastructure is racing to keep up with the growth, which means new schools, hospitals, and SkyTrain expansion.",
    bestFor: ["Families", "Newcomers to Canada", "First-time buyers", "Trades and logistics workers"],
    climate:
      "Similar to Vancouver but slightly warmer in summer and a touch colder inland. Wet winters with occasional snow that lingers a day or two.",
    commuteNotes:
      "The Expo Line reaches Surrey Centre with extension work heading to Langley. Highway 1, Highway 99, and the Golden Ears and Port Mann bridges carry heavy commuter traffic — plan for 45–70 minutes to downtown Vancouver at peak.",
    neighbourhoods: [
      {
        name: "South Surrey / White Rock",
        description:
          "Beachside and suburban, with larger homes, strong schools, and a slower pace near the US border.",
      },
      {
        name: "Fleetwood",
        description:
          "Central, family-oriented, and set to gain SkyTrain access — a long-time favourite for value.",
      },
      {
        name: "Guildford",
        description:
          "Established area around a major mall and recreation centre, well served by buses and Highway 1.",
      },
      {
        name: "Cloverdale",
        description:
          "Small-town feel with a historic main street, rodeo grounds, and newer family subdivisions.",
      },
      {
        name: "Surrey City Centre (Whalley)",
        description:
          "The dense, rapidly redeveloping downtown around SFU Surrey and the SkyTrain terminus.",
      },
    ],
    costOfLiving: { ...TBD },
  },
  {
    slug: "burnaby",
    name: "Burnaby",
    tier: "primary",
    region: "Metro Vancouver",
    tagline: "Central, green, and transit-rich — the practical middle of Metro Vancouver.",
    overview:
      "Burnaby sits directly east of Vancouver and offers much of the same access with more space and more parkland. It is built around several town centres served by SkyTrain, and it is home to SFU and BCIT. For many families it is the compromise between downtown convenience and suburban breathing room.",
    bestFor: ["Families", "Students", "Commuters", "Condo buyers"],
    climate:
      "Coastal and mild like Vancouver, with more snow on Burnaby Mountain than at sea level in winter.",
    commuteNotes:
      "Both the Expo and Millennium SkyTrain lines cross the city, making downtown Vancouver a 20–30 minute ride from most town centres. Highway 1 runs through the middle for drivers.",
    neighbourhoods: [
      {
        name: "Metrotown",
        description:
          "High-rise living around BC's largest mall and a major SkyTrain hub — the most urban part of the city.",
      },
      {
        name: "Brentwood",
        description:
          "A redeveloped town centre with new towers, shops, and Millennium Line access.",
      },
      {
        name: "Burnaby Heights",
        description:
          "A low-rise, walkable strip on Hastings with independent shops and North Shore views.",
      },
      {
        name: "Burnaby Mountain / SFU",
        description:
          "The UniverCity community beside Simon Fraser University, popular with students and academics.",
      },
      {
        name: "Edmonds",
        description:
          "Diverse and comparatively attainable south Burnaby neighbourhood on the Expo Line.",
      },
    ],
    costOfLiving: { ...TBD },
  },
  {
    slug: "richmond",
    name: "Richmond",
    tier: "primary",
    region: "Metro Vancouver",
    tagline: "Flat, connected, and one of Canada's most multicultural cities.",
    overview:
      "Richmond sits on an island in the Fraser River delta, between Vancouver and the airport. It has one of the highest proportions of immigrant residents in Canada and an internationally recognised Asian food scene. Everything is flat, which makes it exceptionally easy to cycle and walk.",
    bestFor: ["Newcomers to Canada", "Families", "Airport and trade workers", "Food lovers"],
    climate:
      "Mild coastal weather with slightly more fog than Vancouver thanks to the delta location, and cool ocean breezes in summer.",
    commuteNotes:
      "The Canada Line links City Centre to downtown Vancouver in about 25 minutes and to YVR in ten. Highway 99 and the Knight and Oak Street bridges serve drivers, with predictable bridge congestion at peak.",
    neighbourhoods: [
      {
        name: "City Centre",
        description:
          "Dense condo living around Canada Line stations, malls, and night markets.",
      },
      {
        name: "Steveston",
        description:
          "A historic fishing village with a boardwalk, seafood docks, and family-friendly streets.",
      },
      {
        name: "Terra Nova",
        description:
          "Quiet west-side pocket with newer homes, dyke trails, and community farmland.",
      },
      {
        name: "Hamilton",
        description:
          "East Richmond community closest to New Westminster, with newer, more attainable family housing.",
      },
    ],
    costOfLiving: { ...TBD },
  },
  {
    slug: "coquitlam",
    name: "Coquitlam",
    tier: "primary",
    region: "Metro Vancouver",
    tagline: "Family suburbs and trailheads, now a SkyTrain ride from downtown.",
    overview:
      "Coquitlam anchors the Tri-Cities alongside Port Coquitlam and Port Moody, offering forested parks, lakes, and a growing high-rise centre. The Evergreen Extension changed the city's character by connecting it directly to the regional rail network. It is a common landing spot for families trading commute time for square footage.",
    bestFor: ["Families", "First-time buyers", "Hikers", "Commuters"],
    climate:
      "Coastal and rainy, with noticeably more snow than Vancouver on the higher slopes of the northeast neighbourhoods.",
    commuteNotes:
      "The Millennium Line reaches Coquitlam Central and Lafarge Lake, giving roughly a 45-minute ride downtown. The West Coast Express commuter rail runs to Vancouver on weekday peaks; Highway 1 and the Lougheed Highway serve drivers.",
    neighbourhoods: [
      {
        name: "Burke Mountain",
        description:
          "Newer hillside family subdivisions backing onto forest, with the longest drive to transit.",
      },
      {
        name: "Coquitlam Town Centre",
        description:
          "Towers, malls, and Lafarge Lake around the SkyTrain terminus — the city's urban core.",
      },
      {
        name: "Maillardville",
        description:
          "BC's historic francophone community, with older character homes and steady redevelopment.",
      },
      {
        name: "Austin Heights",
        description:
          "Established, walkable, and mid-century in feel, popular with young families renovating.",
      },
    ],
    costOfLiving: { ...TBD },
  },
  {
    slug: "north-vancouver",
    name: "North Vancouver",
    tier: "primary",
    region: "Metro Vancouver",
    tagline: "Mountains at your door, downtown across the water.",
    overview:
      "North Vancouver spans a walkable city centre by the water and a large district climbing into the Coast Mountains. Trails, ski hills, and canyons begin where the streets end, making it the outdoor capital of the region. The trade-off is bridge dependency for anyone commuting off the North Shore.",
    bestFor: ["Outdoor enthusiasts", "Families", "Professionals", "Cyclists"],
    climate:
      "Wetter than Vancouver — the mountains wring out the rain — with reliable winter snow at elevation and cool, pleasant summers.",
    commuteNotes:
      "The SeaBus reaches downtown Vancouver in 12 minutes from Lonsdale Quay, which is by far the best option at peak. The Lions Gate and Second Narrows bridges are the only road links and congest heavily in both directions.",
    neighbourhoods: [
      {
        name: "Lower Lonsdale",
        description:
          "Waterfront district of condos, restaurants, and the Shipyards, steps from the SeaBus.",
      },
      {
        name: "Lynn Valley",
        description:
          "Family-focused with a suspension bridge, big parks, and a modern town centre.",
      },
      {
        name: "Deep Cove",
        description:
          "A small seaside village with kayaking, hiking, and a tight-knit community feel.",
      },
      {
        name: "Edgemont Village",
        description:
          "Upscale and quiet, built around a compact shopping street with strong schools nearby.",
      },
    ],
    costOfLiving: { ...TBD },
  },
  {
    slug: "abbotsford",
    name: "Abbotsford",
    tier: "primary",
    region: "Fraser Valley",
    tagline: "Farmland, space, and the Fraser Valley's most attainable city living.",
    overview:
      "Abbotsford is the largest city in the Fraser Valley, surrounded by berry fields, dairy farms, and mountain views. It offers considerably more house for the money than Metro Vancouver, along with a university, a regional airport, and a strong agricultural and manufacturing economy. Newcomer communities, particularly South Asian families, are long established here.",
    bestFor: ["Families", "First-time buyers", "Newcomers to Canada", "Trades and agriculture workers"],
    climate:
      "Warmer summers and colder winters than the coast, with heavy autumn rain and occasional snow that sticks for several days.",
    commuteNotes:
      "Car-dependent. Highway 1 is the main link west and is congested toward Langley and Surrey at peak, making a Vancouver commute 75–100 minutes. Local transit connects to Chilliwack and the Fraser Valley Express bus to the Lougheed SkyTrain.",
    neighbourhoods: [
      {
        name: "Historic Downtown",
        description:
          "Revitalised main street with cafés, breweries, and older character homes nearby.",
      },
      {
        name: "Auguston",
        description:
          "Master-planned hillside community with trails, a school, and newer family homes.",
      },
      {
        name: "West Abbotsford",
        description:
          "Newer subdivisions closest to the Highway 1 commute and Langley amenities.",
      },
      {
        name: "Clayburn Village",
        description:
          "A tiny heritage village pocket surrounded by farmland at the base of Sumas Mountain.",
      },
    ],
    costOfLiving: { ...TBD },
  },
  {
    slug: "nanaimo",
    name: "Nanaimo",
    tier: "primary",
    region: "Vancouver Island",
    tagline: "The island's harbour city — ferry-connected, affordable, outdoors-first.",
    overview:
      "Nanaimo is Vancouver Island's second city and its main gateway to the mainland, with two ferry terminals and a floatplane harbour. It offers island living at a lower cost than Victoria, with lakes, ocean, and mountain biking minutes from town. Growth has been steady as remote workers and retirees discover it.",
    bestFor: ["Remote workers", "Retirees", "Families", "Boaters and mountain bikers"],
    climate:
      "Mild and drier than the west coast of the island, with comfortable summers and wet, largely snow-free winters.",
    commuteNotes:
      "Driving is standard, with the Island Highway running the length of the city. Ferries from Departure Bay and Duke Point reach the mainland in about two hours; Harbour Air flies to downtown Vancouver in twenty minutes.",
    neighbourhoods: [
      {
        name: "Old City Quarter",
        description:
          "Heritage buildings, independent shops, and walkable streets above the harbour.",
      },
      {
        name: "Departure Bay",
        description:
          "Beachside and established, next to the mainland ferry terminal and good schools.",
      },
      {
        name: "North Nanaimo",
        description:
          "Newer family housing, big-box shopping, and ocean-view lots on the upper benches.",
      },
      {
        name: "Harewood",
        description:
          "Central and attainable, next to Vancouver Island University and Colliery Dam Park.",
      },
    ],
    costOfLiving: { ...TBD },
  },

  // Secondary tier
  {
    slug: "kamloops",
    name: "Kamloops",
    tier: "secondary",
    region: "Interior",
    tagline: "Sunny river valleys and a practical interior hub.",
    overview:
      "Kamloops sits where the North and South Thompson rivers meet, ringed by dry grassland hills. It is a transport, health care, and education hub for the interior, anchored by Thompson Rivers University.",
    bestFor: ["Families", "Students", "Health care workers", "Outdoor enthusiasts"],
    climate:
      "Semi-arid with hot, dry summers, cold but sunny winters, and very little rainfall year-round.",
    commuteNotes: "",
    neighbourhoods: [],
    costOfLiving: null,
  },
  {
    slug: "chilliwack",
    name: "Chilliwack",
    tier: "secondary",
    region: "Fraser Valley",
    tagline: "Mountain-framed farmland with room to grow.",
    overview:
      "Chilliwack is a fast-growing Fraser Valley city surrounded by farms and hemmed in by dramatic peaks. It attracts families priced out of Metro Vancouver who are willing to trade commute time for space.",
    bestFor: ["Families", "First-time buyers", "Retirees", "Hikers"],
    climate:
      "Warm summers, mild wet winters, and among the highest rainfall in the valley thanks to the surrounding mountains.",
    commuteNotes: "",
    neighbourhoods: [],
    costOfLiving: null,
  },
  {
    slug: "prince-george",
    name: "Prince George",
    tier: "secondary",
    region: "Northern BC",
    tagline: "Northern BC's service and education capital.",
    overview:
      "Prince George is the largest city in northern British Columbia and the region's hub for health care, education, and resource industries. Housing is among the most attainable in the province and wilderness is immediate.",
    bestFor: ["Trades workers", "Health care professionals", "Students", "First-time buyers"],
    climate:
      "Continental with cold, snowy winters that run long and short, pleasantly warm summers.",
    commuteNotes: "",
    neighbourhoods: [],
    costOfLiving: null,
  },
  {
    slug: "vernon",
    name: "Vernon",
    tier: "secondary",
    region: "Okanagan",
    tagline: "Three lakes, a ski hill, and a relaxed north Okanagan pace.",
    overview:
      "Vernon sits at the top of the Okanagan valley between Kalamalka, Okanagan, and Swan lakes. It offers Okanagan lifestyle with a smaller-town feel and Silver Star Mountain twenty minutes away.",
    bestFor: ["Retirees", "Families", "Remote workers", "Skiers"],
    climate:
      "Four distinct seasons: hot dry summers, colourful autumns, and moderate snowy winters.",
    commuteNotes: "",
    neighbourhoods: [],
    costOfLiving: null,
  },
  {
    slug: "nelson",
    name: "Nelson",
    tier: "secondary",
    region: "Kootenays",
    tagline: "A heritage mountain town with an outsized arts scene.",
    overview:
      "Nelson is a small Kootenay city on Kootenay Lake known for its preserved Victorian main street, independent culture, and powder skiing at Whitewater. It is remote by BC standards and fiercely community-minded.",
    bestFor: ["Artists and creatives", "Remote workers", "Skiers", "Small-town seekers"],
    climate:
      "Mountain climate with snowy winters, warm dry summers, and mild shoulder seasons in the valley bottom.",
    commuteNotes: "",
    neighbourhoods: [],
    costOfLiving: null,
  },
  {
    slug: "penticton",
    name: "Penticton",
    tier: "secondary",
    region: "Okanagan",
    tagline: "Between two lakes, surrounded by wineries.",
    overview:
      "Penticton sits on a narrow strip of land between Okanagan and Skaha lakes in the south Okanagan wine country. It is a summer destination that has become a year-round home for retirees and remote workers.",
    bestFor: ["Retirees", "Remote workers", "Cyclists", "Wine and food lovers"],
    climate:
      "One of Canada's warmest and driest — long hot summers, minimal rainfall, and short mild winters.",
    commuteNotes: "",
    neighbourhoods: [],
    costOfLiving: null,
  },
  {
    slug: "squamish",
    name: "Squamish",
    tier: "secondary",
    region: "Sea to Sky",
    tagline: "The outdoor recreation capital, halfway to Whistler.",
    overview:
      "Squamish sits between Vancouver and Whistler beneath the Stawamus Chief, with world-class climbing, mountain biking, and windsurfing. Once a mill town, it is now a fast-growing community of commuters and remote workers.",
    bestFor: ["Outdoor enthusiasts", "Young families", "Remote workers", "Vancouver commuters"],
    climate:
      "Coastal and wet with strong valley winds, cool summers, and winters that stay mostly above freezing at sea level.",
    commuteNotes: "",
    neighbourhoods: [],
    costOfLiving: null,
  },
  {
    slug: "langley",
    name: "Langley",
    tier: "secondary",
    region: "Metro Vancouver",
    tagline: "Where Metro Vancouver meets horse country.",
    overview:
      "Langley combines a growing town centre with farmland, wineries, and equestrian acreages. SkyTrain expansion from Surrey is reshaping how connected it feels to the rest of the region.",
    bestFor: ["Families", "First-time buyers", "Commuters", "Acreage seekers"],
    climate:
      "Slightly warmer summers and cooler winters than Vancouver, with wet autumns and occasional lasting snow.",
    commuteNotes: "",
    neighbourhoods: [],
    costOfLiving: null,
  },
];

export const primaryCities = cities.filter((c) => c.tier === "primary");
export const secondaryCities = cities.filter((c) => c.tier === "secondary");

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}
