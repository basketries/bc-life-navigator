export interface Neighbourhood {
  name: string;
  description: string;
}

export interface CostOfLiving {
  housing: string;
  groceries: string;
  transit: string;
  notes: string;
  /** Month/year the estimate was last refreshed, e.g. "July 2026". */
  updated?: string;
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

export const COST_SOURCE_NOTE =
  "Sources: Zumper, Rentals.ca, TransLink, BC Transit, Statistics Canada — as of July 2026.";

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
    costOfLiving: {
      housing: "1BR ~$2,089/mo, 2BR ~$2,715-3,355/mo, 3BR ~$3,911/mo",
      groceries: "~$400-450/mo per person",
      transit:
        "TransLink monthly pass, zone-based — see translink.ca for current fares",
      notes:
        "Estimated from market reports, July 2026. BC's most expensive rental market. Figures are indicative — check current listings for accuracy.",
    }
      updated: "July 2026",
    },
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
    costOfLiving: {
      housing: "1BR ~$1,995/mo, 2BR ~$2,682/mo, 3BR ~$3,350/mo",
      groceries: "~$400-450/mo per person",
      transit: "BC Transit monthly pass — see bctransit.com for current fares",
      notes:
        "Estimated from market reports, July 2026. Figures are indicative — check current listings for accuracy.",
    }
      updated: "July 2026",
    },
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
    costOfLiving: {
      housing: "Avg all types ~$2,000/mo; 1BR condo ~$1,650-1,900/mo",
      groceries: "~$350-420/mo per person",
      transit: "BC Transit monthly pass — see bctransit.com for current fares",
      notes:
        "Estimated from market reports, mid-2026. High vacancy rate currently gives renters more negotiating room. Figures are indicative.",
    }
      updated: "July 2026",
    },
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
    costOfLiving: {
      housing: "1BR ~$1,744/mo, 2BR ~$2,124/mo, 3BR ~$2,830/mo",
      groceries: "~$350-420/mo per person",
      transit:
        "TransLink monthly pass, zone-based — see translink.ca for current fares",
      notes:
        "Estimated from market reports, July 2026. The most affordable option within Metro Vancouver. Figures are indicative.",
    }
      updated: "July 2026",
    },
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
    costOfLiving: {
      housing: "1BR ~$2,077/mo",
      groceries: "~$400-450/mo per person",
      transit:
        "TransLink monthly pass, zone-based — see translink.ca for current fares",
      notes:
        "Estimated from market reports, July 2026. Figures are indicative — check current listings for accuracy.",
    }
      updated: "July 2026",
    },
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
    costOfLiving: {
      housing: "1BR ~$2,164/mo",
      groceries: "~$400-450/mo per person",
      transit:
        "TransLink monthly pass, zone-based — see translink.ca for current fares",
      notes:
        "Estimated from market reports, July 2026. Among the most expensive rental markets in Canada. Figures are indicative.",
    }
      updated: "July 2026",
    },
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
    costOfLiving: {
      housing: "Avg all types ~$2,459/mo",
      groceries: "~$400-450/mo per person",
      transit:
        "TransLink monthly pass, zone-based — see translink.ca for current fares",
      notes:
        "Estimated from Rentals.ca/Urbanation report, July 2026. Figures are indicative — check current listings for accuracy.",
    }
      updated: "July 2026",
    },
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
    costOfLiving: {
      housing: "Avg all types ~$2,926-2,944/mo",
      groceries: "~$400-450/mo per person",
      transit:
        "TransLink monthly pass, zone-based — see translink.ca for current fares",
      notes:
        "Estimated from Rentals.ca/Urbanation report, July 2026. Currently Canada's most expensive rental market by this measure. Figures are indicative.",
    }
      updated: "July 2026",
    },
  },
  {
    slug: "abbotsford",
    name: "Abbotsford",
    tier: "primary",
    region: "Fraser Valley",
    tagline: "Farmland, space, and the Fraser Valley's most attainable city living.",
    overview:
      "Abbotsford suits families and first-time buyers who want Fraser Valley space without leaving Metro Vancouver's job market entirely out of reach. As BC's largest municipality by land area, it offers detached homes and larger lots at prices well below Surrey or Langley, drawing young families, agricultural workers, and a large South Asian community with deep roots in the city.\n\nAs of 2026, average rent sits around $1,795-1,835/month, with one-bedrooms averaging roughly $1,500-1,580 and typical listings ranging from $1,250 to $2,800 depending on size and neighbourhood. That makes Abbotsford one of the more attainable cities in the Fraser Valley, though prices have softened over the past year alongside a broader regional rent pullback.\n\nAbbotsford is well served by local bus routes and the Fraser Valley Express connecting to Langley, with highway access to Highway 1 for those commuting toward Metro Vancouver — though that commute runs 60-90 minutes each way and is a serious daily consideration, not a footnote. Most residents drive for day-to-day errands; the city is walkable and bike-friendly in pockets (Mill Lake Park, the downtown core) but spread out overall.\n\nCharacter-wise, Abbotsford blends agricultural heritage with growing suburban development. Clearbrook and Mill Lake offer more affordable rental stock, Sevenoaks and High Street give it real shopping and dining density, and the surrounding farmland (plus events like the Abbotsford Air Show) give it a distinct identity apart from being \"just a Vancouver suburb.\" It suits people prioritizing home size and community over a short downtown commute.",
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
    costOfLiving: {
      housing: "1BR ~$1,582/mo, 2BR ~$1,997/mo",
      groceries: "~$350-400/mo per person",
      transit: "BC Transit monthly pass — see bctransit.com for current fares",
      notes:
        "Estimated from market reports, March-June 2026. More affordable than Metro Vancouver core cities. Figures are indicative.",
    }
      updated: "June 2026",
    },
  },
  {
    slug: "nanaimo",
    name: "Nanaimo",
    tier: "primary",
    region: "Vancouver Island",
    tagline: "The island's harbour city — ferry-connected, affordable, outdoors-first.",
    overview:
      "Nanaimo suits remote workers, retirees, and anyone drawn to island living without Victoria's price tag. Known as the \"Harbour City,\" it's Vancouver Island's second-largest urban centre and the main gateway between the island and the mainland via BC Ferries.\n\nAverage rent runs about $1,895-2,105/month as of 2026, with one-bedrooms typically $1,700-1,845 and neighbourhoods like the Hospital Area, Rosehill, and Stephenson Point offering the more affordable end of the market. Overall cost of living, including groceries and transport, tends to land in the low-to-mid $2,000s per month for a single person — noticeably below Vancouver or Victoria.\n\nLocal transit connects neighbourhoods reasonably well, but Nanaimo is still a car-dependent city for most day-to-day life. The bigger commute consideration is the ferry: getting to the mainland means a scheduled BC Ferries crossing (Departure Bay or Duke Point), which shapes life here more than any bus route — this suits people who don't need a daily mainland commute.\n\nNanaimo's character mixes a working coal-mining and harbour history with a growing arts and food scene downtown. Vancouver Island University adds a youthful, educational presence, while the waterfront, seawall, and nearby beaches make outdoor recreation a daily-life feature rather than a weekend trip. It draws people who want a genuine small-city pace, ocean views, and slower traffic — trading some job-market depth and direct mainland access for quality of life.",
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
    costOfLiving: {
      housing: "1BR ~$1,785/mo, 2BR ~$2,195/mo",
      groceries: "~$350-400/mo per person",
      transit: "BC Transit monthly pass — see bctransit.com for current fares",
      notes:
        "Estimated from market reports, June 2026. Figures are indicative — check current listings for accuracy.",
    }
      updated: "June 2026",
    },
  },

  // Secondary tier
  {
    slug: "kamloops",
    name: "Kamloops",
    tier: "secondary",
    region: "Interior",
    tagline: "Sunny river valleys and a practical interior hub.",
    overview:
      "Kamloops suits people who want sunshine, space, and a lower cost of living in BC's interior, without the coastal price premium. As the province's first \"Bee City\" and a hub for Thompson Rivers University, it draws students, families, and outdoor-recreation-focused professionals to a drier, sunnier climate than the coast.\n\nAverage rent as of 2026 sits around $1,811/month, with one-bedrooms averaging about $1,645-1,790 and the most affordable pockets — Juniper Ridge, North Shore, Kamloops Indian Reserve No. 1 — starting near $1,595. That's roughly 7% below the national average rent, and materially below anywhere in Metro Vancouver.\n\nKamloops runs its own public transit system connecting the university, downtown, and residential areas across the North Shore and Sahali, but like most interior cities it leans car-dependent overall — most residents drive for daily errands and cross-town trips. There's no realistic daily commute to Metro Vancouver; Kamloops functions as a self-contained regional hub rather than a Vancouver-adjacent suburb.\n\nIts character splits between a busy downtown core with dining, cultural venues like the Kamloops Museum, and services, and a more spread-out residential landscape framed by grasslands and the Thompson River valley. Landmarks like the BC Wildlife Park and Kamloops Heritage Railway reflect a city proud of its ranching and railway roots. It suits people prioritizing affordability, sunshine, and a slower pace over coastal access — particularly families, students, and retirees.",
    bestFor: ["Families", "Students", "Health care workers", "Outdoor enthusiasts"],
    climate:
      "Semi-arid with hot, dry summers, cold but sunny winters, and very little rainfall year-round.",
    commuteNotes: "",
    neighbourhoods: [],
    costOfLiving: {
      housing: "$1,645",
      groceries: "$340–380",
      transit: "$65–75",
      notes: "",
    }
      updated: "July 2026",
    },
  },
  {
    slug: "chilliwack",
    name: "Chilliwack",
    tier: "secondary",
    region: "Fraser Valley",
    tagline: "Mountain-framed farmland with room to grow.",
    overview:
      "Chilliwack suits families and first-time buyers chasing the most space for their money in the Fraser Valley, provided they're comfortable trading a shorter commute for it. It's the furthest-east Fraser Valley city still loosely tied to the Metro Vancouver housing market, framed by mountains on nearly every side.\n\nAverage rent is around $1,650/month as of 2026 — about 15% below the national average and among the most affordable rents in the Fraser Valley corridor. One-bedroom apartments typically run $1,300-1,700. Housing purchase prices are similarly favourable: benchmark detached home prices sit roughly a third lower than Metro Vancouver's.\n\nThe commute is the honest trade-off here. Chilliwack is about 100km from downtown Vancouver, and a drive via Highway 1 typically runs 90 minutes to 2+ hours each way in traffic. There's no SkyTrain or West Coast Express station in Chilliwack itself — some residents drive to Mission to catch the West Coast Express commuter rail, and BC Transit's Fraser Valley Express (Route 66) links to Abbotsford and Langley, but frequency is low and it suits occasional trips more than a daily downtown job. Most of Chilliwack is genuinely car-dependent.\n\nCharacter-wise, it's a family-oriented city with strong schools, active youth sports, and a mountain-and-farmland backdrop that's hard to match closer to the city. Sardis, Vedder, and Promontory are the go-to family neighbourhoods, with newer housing stock and walkable amenities. It suits households who can work remotely, commute only occasionally, or are simply prioritizing house size and community over proximity to Vancouver.",
    bestFor: ["Families", "First-time buyers", "Retirees", "Hikers"],
    climate:
      "Warm summers, mild wet winters, and among the highest rainfall in the valley thanks to the surrounding mountains.",
    commuteNotes: "",
    neighbourhoods: [],
    costOfLiving: {
      housing: "$1,650",
      groceries: "$340–380",
      transit: "$60–75",
      notes: "",
    }
      updated: "July 2026",
    },
  },
  {
    slug: "prince-george",
    name: "Prince George",
    tier: "secondary",
    region: "Northern BC",
    tagline: "Northern BC's service and education capital.",
    overview:
      "Prince George suits people looking for Northern BC's most affordable major city and a genuine regional hub — not a bedroom community, but a self-contained economic and educational centre in its own right. As the largest city in northern BC, it anchors healthcare, post-secondary education (University of Northern BC), and forestry/resource-sector employment for a wide surrounding region.\n\nIt's consistently BC's most affordable rental market of meaningful size: average rent sits around $1,495/month as of 2026, with one-bedroom units often available closer to $1,000-1,200 depending on the source and neighbourhood — dramatically below Metro Vancouver's roughly $2,500+ average one-bedroom.\n\nThere's no mainland commute consideration here the way there is in the Fraser Valley — Prince George is roughly 8 hours' drive from Vancouver and functions independently. Locally, the city relies on BC Transit bus service and is largely car-oriented, typical of a mid-sized northern city built around road access rather than density.\n\nCharacter-wise, Prince George blends a working resource-industry economy (forestry, mining services) with a growing services, healthcare, and education sector. It offers real four-season outdoor access — skiing, hiking, and river recreation are close by — along with lower costs across nearly every category, from rent to groceries to vehicle costs. It suits people prioritizing affordability and a full-service regional city over coastal or Lower Mainland proximity: young families, healthcare and resource-sector workers, and anyone stretching a fixed income further.",
    bestFor: ["Trades workers", "Health care professionals", "Students", "First-time buyers"],
    climate:
      "Continental with cold, snowy winters that run long and short, pleasantly warm summers.",
    commuteNotes: "",
    neighbourhoods: [],
    costOfLiving: {
      housing: "$1,495",
      groceries: "$340–390",
      transit: "$60–70",
      notes: "",
    }
      updated: "July 2026",
    },
  },
  {
    slug: "vernon",
    name: "Vernon",
    tier: "secondary",
    region: "Okanagan",
    tagline: "Three lakes, a ski hill, and a relaxed north Okanagan pace.",
    overview:
      "Vernon suits people drawn to the Okanagan's lake-and-mountain lifestyle at a gentler price than Kelowna. Sitting between three lakes (Okanagan, Kalamalka, and Swan) with Silver Star ski resort nearby, it offers year-round outdoor recreation with a smaller-city pace.\n\nAverage rent runs around $1,850/month as of 2026, with one-bedrooms typically $1,600-1,690 and the most affordable neighbourhoods — East Hill, Vernon City Centre, Alexis Park — starting under $2,000. That's roughly 5% below the national average rent, and generally less than nearby Kelowna for comparable space.\n\nVernon is about 440km from Vancouver — there's no realistic daily commute to the coast, and it functions as an independent North Okanagan hub rather than a satellite city. Locally, it's a car-dependent city; public transit exists but most day-to-day movement (getting to the lakes, Silver Star, or surrounding communities like Coldstream and Lake Country) assumes a vehicle.\n\nCharacter-wise, Vernon splits its identity between a working downtown core and a lifestyle built around water and mountains — three lakes for boating and swimming in summer, Silver Star for skiing in winter, and a genuinely four-season recreation calendar. It's less tourist-driven and less expensive than Kelowna, drawing retirees, families, and remote workers who want Okanagan scenery without Okanagan's peak-season price surges. It suits people prioritizing lifestyle and value over urban amenities or job-market depth.",
    bestFor: ["Retirees", "Families", "Remote workers", "Skiers"],
    climate:
      "Four distinct seasons: hot dry summers, colourful autumns, and moderate snowy winters.",
    commuteNotes: "",
    neighbourhoods: [],
    costOfLiving: {
      housing: "$1,600–1,690",
      groceries: "$350–390",
      transit: "$60–70",
      notes: "",
    }
      updated: "July 2026",
    },
  },
  {
    slug: "nelson",
    name: "Nelson",
    tier: "secondary",
    region: "Kootenays",
    tagline: "A heritage mountain town with an outsized arts scene.",
    overview:
      "Nelson suits people drawn to a heritage mountain town with an outsized arts and culture scene relative to its size — this is West Kootenay living, not Okanagan or Lower Mainland living, and it draws a distinct crowd because of it.\n\nAverage rent runs around $1,800-1,900/month as of 2026 for rental housing broadly, which is a meaningful cost given Nelson's small size (population under 12,000) — housing here is more expensive than the Canada average despite the remote, small-town setting, largely due to limited supply and high demand from lifestyle migrants.\n\nNelson sits in the West Kootenays, roughly 6-7 hours from Vancouver by road — there is no commuting to the coast; Nelson is its own self-contained community and functions as the commercial hub (alongside Castlegar and Trail) for the region. Locally, it's compact and walkable in the downtown core, with public transit available but limited; a car remains useful for anything outside town.\n\nCharacter-wise, Nelson is known for its extensive collection of heritage buildings dating to the 1886 silver rush, a genuinely disproportionate concentration of artists, musicians, and makers for a town its size, and a strong outdoor-recreation culture (Kootenay Lake, nearby ski hills, backcountry access). It suits remote workers, retirees, and creatives who want a real community and mountain scenery, and are willing to trade job-market depth and big-city amenities for it — Nelson is a destination people move to deliberately, not a fallback.",
    bestFor: ["Artists and creatives", "Remote workers", "Skiers", "Small-town seekers"],
    climate:
      "Mountain climate with snowy winters, warm dry summers, and mild shoulder seasons in the valley bottom.",
    commuteNotes: "",
    neighbourhoods: [],
    costOfLiving: {
      housing: "$1,700–2,000 est.",
      groceries: "$350–390",
      transit: "$55–65",
      notes: "Rental data for Nelson is limited; the 1BR figure is an estimate.",
    }
      updated: "July 2026",
    },
  },
  {
    slug: "penticton",
    name: "Penticton",
    tier: "secondary",
    region: "Okanagan",
    tagline: "Between two lakes, surrounded by wineries.",
    overview:
      "Penticton suits people who want Okanagan wine country and two lakes to choose from, at a somewhat gentler price than Kelowna during most of the year — though summer tourist season is intense and worth factoring in.\n\nAverage rent for a one-bedroom sits roughly $1,200-1,400/month as of 2026 depending on source and location, with overall cost of living for a single person landing around $2,000-2,250/month including rent. That's generally more affordable than Kelowna, though the rental market is tight — Penticton has recorded vacancy rates below 1% in recent years, so move-in timelines can be a genuine challenge.\n\nPenticton sits between Okanagan Lake and Skaha Lake, with no realistic daily commute to Vancouver (it's roughly a 4-hour drive) — like most Okanagan cities, it functions as its own economic hub built around tourism, agriculture, and wine. Locally, it's a car-dependent city, though the compact downtown and lakeside areas are walkable.\n\nCharacter-wise, Penticton is defined by its wineries (dozens within a short drive), its two-lake setting ideal for water sports, and a cultural calendar of festivals and events that swells the population every summer. It suits retirees, remote workers, and anyone prioritizing lake access and wine country over urban amenities — with the caveat that rental competition is real, so people moving here should expect to search seriously, not casually.",
    bestFor: ["Retirees", "Remote workers", "Cyclists", "Wine and food lovers"],
    climate:
      "One of Canada's warmest and driest — long hot summers, minimal rainfall, and short mild winters.",
    commuteNotes: "",
    neighbourhoods: [],
    costOfLiving: {
      housing: "$1,400–1,750",
      groceries: "$350–390",
      transit: "$55–65",
      notes: "The 1BR range for Penticton is not yet independently verified.",
    }
      updated: "July 2026",
    },
  },
  {
    slug: "squamish",
    name: "Squamish",
    tier: "secondary",
    region: "Sea to Sky",
    tagline: "The outdoor recreation capital, halfway to Whistler.",
    overview:
      "Squamish suits outdoor-recreation-focused professionals and families who want to be near Vancouver's job market without living in it, and who can tolerate the Sea-to-Sky commute in exchange for genuinely exceptional access to hiking, climbing, and skiing.\n\nAverage rent runs high for a smaller city — roughly $1,600-2,300/month for a one-bedroom as of 2026, depending on source, with the mid-point closer to $1,650-1,700. That reflects Squamish's position as an increasingly desirable, land-constrained community between two much more expensive markets (Vancouver and Whistler), rather than a genuinely low-cost alternative.\n\nSquamish sits about 45-64km north of Vancouver along the Sea-to-Sky Highway, with a typical drive of 45-60 minutes in good conditions — longer, and more weather-dependent, in winter. There's no SkyTrain or rail link; commuting to Vancouver means driving the Sea-to-Sky corridor, which is scenic but exposed to weather delays and highway congestion at peak times. Within Squamish itself, the town is increasingly walkable and bike-friendly, with local transit covering short trips.\n\nCharacter-wise, Squamish has branded itself (accurately) as Canada's Outdoor Recreation Capital — the Stawamus Chief for climbing, extensive mountain biking and hiking trail networks, and windsurfing on Howe Sound, alongside a growing brewery and arts scene. It suits people who prioritize outdoor access and a growing small-town amenity base, and who either work remotely, commute to Vancouver only occasionally, or have flexibility around the daily drive.",
    bestFor: ["Outdoor enthusiasts", "Young families", "Remote workers", "Vancouver commuters"],
    climate:
      "Coastal and wet with strong valley winds, cool summers, and winters that stay mostly above freezing at sea level.",
    commuteNotes: "",
    neighbourhoods: [],
    costOfLiving: {
      housing: "$1,800–2,250",
      groceries: "$400–440",
      transit: "$60–70",
      notes: "The 1BR range for Squamish is not yet independently verified.",
    }
      updated: "July 2026",
    },
  },
  {
    slug: "langley",
    name: "Langley",
    tier: "secondary",
    region: "Metro Vancouver",
    tagline: "Where Metro Vancouver meets horse country.",
    overview:
      "Langley suits families and first-time buyers who want Metro Vancouver access with meaningfully more space and lower prices — and whose timeline aligns well with the Surrey-Langley SkyTrain extension, targeted for 2029, which will materially change the calculus here.\n\nAverage rent sits around $2,192/month as of 2026, with one-bedrooms averaging roughly $1,950-2,000 and more affordable pockets like Aldergrove ($1,775) and Douglas ($1,995). Rents have actually softened over the past year — down modestly year-over-year — making Langley one of the more negotiable markets in Metro Vancouver right now, even as it remains meaningfully cheaper than Vancouver proper for comparable space.\n\nToday, Langley is largely car-dependent; most residents drive for work and errands, and a monthly transit pass covering the zone runs roughly $151. That will change with the SkyTrain extension: once it opens, Langley will gain direct rapid-transit access to Surrey and onward to Vancouver, which is already shaping where new development and demand are concentrating (particularly Willoughby, Langley's master-planned community closest to the coming line).\n\nCharacter-wise, Langley blends suburban new-build communities with a genuine rural edge — horse country, farms, and u-pick berry operations sit just outside newer neighbourhoods. It suits buyers and renters prioritizing home size, family amenities, and long-term value ahead of the SkyTrain extension over an immediate short commute today.",
    bestFor: ["Families", "First-time buyers", "Commuters", "Acreage seekers"],
    climate:
      "Slightly warmer summers and cooler winters than Vancouver, with wet autumns and occasional lasting snow.",
    commuteNotes: "",
    neighbourhoods: [],
    costOfLiving: {
      housing: "$1,950",
      groceries: "$370–400",
      transit: "$117.20–$161.35",
      notes: "",
    }
      updated: "July 2026",
    },
  },
];

export const primaryCities = cities.filter((c) => c.tier === "primary");
export const secondaryCities = cities.filter((c) => c.tier === "secondary");

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export interface CitySeo {
  title: string;
  description: string;
}

/** Exact per-city title tags and meta descriptions. */
export const citySeo: Record<string, CitySeo> = {
  vancouver: {
    title: "Moving to Vancouver, BC in 2026? Cost of Living & Neighbourhood Guide",
    description:
      "Vancouver rent averages $2,089/mo in 2026. See groceries, transit costs, and the best neighbourhoods for newcomers and professionals.",
  },
  victoria: {
    title: "Living in Victoria, BC 2026 — Cost of Living & Best Areas",
    description:
      "Victoria rent runs ~$2,000-2,010/mo. See why retirees and remote workers love BC's walkable capital, with 2026 cost data.",
  },
  kelowna: {
    title: "Kelowna, BC Cost of Living 2026 — Rent & Relocation Guide",
    description:
      "Kelowna rent averages $2,000/mo in 2026. See groceries, transit costs, and why families and remote workers are moving here.",
  },
  surrey: {
    title: "Moving to Surrey, BC 2026 — Rent & Family Relocation Guide",
    description:
      "Surrey is Metro Vancouver's fastest-growing city. See 2026 rent (~$1,750 1BR), cost of living, and top family neighbourhoods.",
  },
  burnaby: {
    title: "Living in Burnaby, BC 2026 — Cost of Living & Transit Guide",
    description:
      "Burnaby rent averages ~$2,200/mo (1BR) in 2026. See why it's Metro Vancouver's practical, transit-rich middle ground.",
  },
  richmond: {
    title: "Moving to Richmond, BC 2026 — Cost of Living Guide",
    description:
      "Richmond rent averages $2,541/mo in 2026. See why it's one of Canada's most multicultural, newcomer-friendly cities.",
  },
  coquitlam: {
    title: "Living in Coquitlam, BC 2026 — Family Relocation Guide",
    description:
      "Coquitlam rent averages $2,459/mo in 2026. See why families and first-time buyers choose this SkyTrain-connected suburb.",
  },
  "north-vancouver": {
    title: "North Vancouver, BC Cost of Living 2026 — Rent & Guide",
    description:
      "North Vancouver rent averages $2,955/mo, among Canada's highest. See 2026 costs and why outdoor lovers pay the premium.",
  },
  abbotsford: {
    title: "Moving to Abbotsford, BC 2026 — Affordable Family Guide",
    description:
      "Abbotsford rent averages $1,795/mo in 2026, the Fraser Valley's most attainable city living. See full cost breakdown.",
  },
  nanaimo: {
    title: "Living in Nanaimo, BC 2026 — Cost of Living Guide",
    description:
      "Nanaimo rent averages $1,895/mo in 2026. See why Vancouver Island's harbour city suits remote workers and retirees.",
  },
  kamloops: {
    title: "Moving to Kamloops, BC 2026 — Interior BC Relocation Guide",
    description:
      "Kamloops rent averages $1,811/mo in 2026. See cost of living in this sunny, practical interior hub.",
  },
  chilliwack: {
    title: "Living in Chilliwack, BC 2026 — Cost of Living Guide",
    description:
      "Chilliwack rent averages $1,650/mo in 2026. See why this mountain-framed Fraser Valley city offers room to grow.",
  },
  "prince-george": {
    title: "Moving to Prince George, BC 2026 — Northern BC Guide",
    description:
      "Prince George rent averages $1,495/mo in 2026, among BC's most affordable. Northern BC's service and education hub.",
  },
  vernon: {
    title: "Living in Vernon, BC 2026 — Okanagan Relocation Guide",
    description:
      "Vernon rent averages $1,850/mo in 2026. Three lakes, a ski hill, and a relaxed north Okanagan pace.",
  },
  nelson: {
    title: "Moving to Nelson, BC 2026 — Kootenay Cost of Living Guide",
    description:
      "Nelson, BC cost of living 2026: a heritage mountain town with an outsized arts scene in the West Kootenays.",
  },
  penticton: {
    title: "Living in Penticton, BC 2026 — Okanagan Guide",
    description:
      "Penticton, BC cost of living 2026: between two lakes, surrounded by wineries, in the South Okanagan.",
  },
  squamish: {
    title: "Moving to Squamish, BC 2026 — Sea-to-Sky Guide",
    description:
      "Squamish, BC cost of living 2026: the outdoor recreation capital, halfway between Vancouver and Whistler.",
  },
  langley: {
    title: "Living in Langley, BC 2026 — Cost of Living Guide",
    description:
      "Langley rent averages $2,192/mo in 2026. Where Metro Vancouver meets horse country — full cost breakdown inside.",
  },
};
