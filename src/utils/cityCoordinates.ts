/**
 * City Coordinates Lookup Utility
 *
 * Provides coordinate mappings for major cities worldwide to enable
 * map visualization when the API returns city names without coordinates.
 *
 * Format: "City, Region" => { latitude, longitude }
 */

export const cityCoordinatesMap: Record<string, { latitude: number; longitude: number }> = {
  // United States - Major Cities
  "New York, NY": { latitude: 40.7128, longitude: -74.0060 },
  "Los Angeles, CA": { latitude: 34.0522, longitude: -118.2437 },
  "Chicago, IL": { latitude: 41.8781, longitude: -87.6298 },
  "Houston, TX": { latitude: 29.7604, longitude: -95.3698 },
  "Phoenix, AZ": { latitude: 33.4484, longitude: -112.0740 },
  "Philadelphia, PA": { latitude: 39.9526, longitude: -75.1652 },
  "San Antonio, TX": { latitude: 29.4241, longitude: -98.4936 },
  "San Diego, CA": { latitude: 32.7157, longitude: -117.1611 },
  "Dallas, TX": { latitude: 32.7767, longitude: -96.7970 },
  "San Jose, CA": { latitude: 37.3382, longitude: -121.8863 },
  "Austin, TX": { latitude: 30.2672, longitude: -97.7431 },
  "Jacksonville, FL": { latitude: 30.3322, longitude: -81.6557 },
  "Fort Worth, TX": { latitude: 32.7555, longitude: -97.3308 },
  "Columbus, OH": { latitude: 39.9612, longitude: -82.9988 },
  "San Francisco, CA": { latitude: 37.7749, longitude: -122.4194 },
  "Charlotte, NC": { latitude: 35.2271, longitude: -80.8431 },
  "Indianapolis, IN": { latitude: 39.7684, longitude: -86.1581 },
  "Seattle, WA": { latitude: 47.6062, longitude: -122.3321 },
  "Denver, CO": { latitude: 39.7392, longitude: -104.9903 },
  "Washington, DC": { latitude: 38.9072, longitude: -77.0369 },
  "Boston, MA": { latitude: 42.3601, longitude: -71.0589 },
  "El Paso, TX": { latitude: 31.7619, longitude: -106.4850 },
  "Nashville, TN": { latitude: 36.1627, longitude: -86.7816 },
  "Detroit, MI": { latitude: 42.3314, longitude: -83.0458 },
  "Oklahoma City, OK": { latitude: 35.4676, longitude: -97.5164 },
  "Portland, OR": { latitude: 45.5152, longitude: -122.6784 },
  "Las Vegas, NV": { latitude: 36.1699, longitude: -115.1398 },
  "Memphis, TN": { latitude: 35.1495, longitude: -90.0490 },
  "Louisville, KY": { latitude: 38.2527, longitude: -85.7585 },
  "Baltimore, MD": { latitude: 39.2904, longitude: -76.6122 },
  "Milwaukee, WI": { latitude: 43.0389, longitude: -87.9065 },
  "Albuquerque, NM": { latitude: 35.0844, longitude: -106.6504 },
  "Tucson, AZ": { latitude: 32.2226, longitude: -110.9747 },
  "Fresno, CA": { latitude: 36.7378, longitude: -119.7871 },
  "Sacramento, CA": { latitude: 38.5816, longitude: -121.4944 },
  "Mesa, AZ": { latitude: 33.4152, longitude: -111.8315 },
  "Kansas City, MO": { latitude: 39.0997, longitude: -94.5786 },
  "Atlanta, GA": { latitude: 33.7490, longitude: -84.3880 },
  "Miami, FL": { latitude: 25.7617, longitude: -80.1918 },
  "Raleigh, NC": { latitude: 35.7796, longitude: -78.6382 },
  "Omaha, NE": { latitude: 41.2565, longitude: -95.9345 },
  "Colorado Springs, CO": { latitude: 38.8339, longitude: -104.8214 },
  "Virginia Beach, VA": { latitude: 36.8529, longitude: -75.9780 },
  "Oakland, CA": { latitude: 37.8044, longitude: -122.2712 },
  "Minneapolis, MN": { latitude: 44.9778, longitude: -93.2650 },
  "Tulsa, OK": { latitude: 36.1540, longitude: -95.9928 },
  "Arlington, TX": { latitude: 32.7357, longitude: -97.1081 },
  "Tampa, FL": { latitude: 27.9506, longitude: -82.4572 },
  "New Orleans, LA": { latitude: 29.9511, longitude: -90.0715 },
  "Wichita, KS": { latitude: 37.6872, longitude: -97.3301 },
  "Cleveland, OH": { latitude: 41.4993, longitude: -81.6944 },
  "Bakersfield, CA": { latitude: 35.3733, longitude: -119.0187 },
  "Long Beach, CA": { latitude: 33.7701, longitude: -118.1937 },
  "Anaheim, CA": { latitude: 33.8366, longitude: -117.9143 },
  "Honolulu, HI": { latitude: 21.3099, longitude: -157.8581 },
  "Riverside, CA": { latitude: 33.9533, longitude: -117.3962 },
  "Stockton, CA": { latitude: 37.9577, longitude: -121.2908 },
  "Orlando, FL": { latitude: 28.5383, longitude: -81.3792 },
  "Irvine, CA": { latitude: 33.6846, longitude: -117.8265 },
  "Cincinnati, OH": { latitude: 39.1031, longitude: -84.5120 },
  "Newark, NJ": { latitude: 40.7357, longitude: -74.1724 },
  "St. Louis, MO": { latitude: 38.6270, longitude: -90.1994 },
  "Pittsburgh, PA": { latitude: 40.4406, longitude: -79.9959 },
  "Greensboro, NC": { latitude: 36.0726, longitude: -79.7920 },
  "Jersey City, NJ": { latitude: 40.7178, longitude: -74.0431 },
  "Anchorage, AK": { latitude: 61.2181, longitude: -149.9003 },
  "Lincoln, NE": { latitude: 40.8136, longitude: -96.7026 },
  "Plano, TX": { latitude: 33.0198, longitude: -96.6989 },
  "Durham, NC": { latitude: 35.9940, longitude: -78.8986 },
  "Buffalo, NY": { latitude: 42.8864, longitude: -78.8784 },
  "Chandler, AZ": { latitude: 33.3062, longitude: -111.8413 },
  "Chula Vista, CA": { latitude: 32.6401, longitude: -117.0842 },
  "Toledo, OH": { latitude: 41.6528, longitude: -83.5379 },
  "Madison, WI": { latitude: 43.0731, longitude: -89.4012 },
  "Reno, NV": { latitude: 39.5296, longitude: -119.8138 },
  "Fort Wayne, IN": { latitude: 41.0793, longitude: -85.1394 },
  "St. Petersburg, FL": { latitude: 27.7676, longitude: -82.6403 },
  "Laredo, TX": { latitude: 27.5306, longitude: -99.4803 },
  "Lubbock, TX": { latitude: 33.5779, longitude: -101.8552 },
  "Irving, TX": { latitude: 32.8140, longitude: -96.9489 },
  "Scottsdale, AZ": { latitude: 33.4942, longitude: -111.9261 },
  "Gilbert, AZ": { latitude: 33.3528, longitude: -111.7890 },
  "Glendale, AZ": { latitude: 33.5387, longitude: -112.1860 },
  "Winston-Salem, NC": { latitude: 36.0999, longitude: -80.2442 },
  "Garland, TX": { latitude: 32.9126, longitude: -96.6389 },
  "Fremont, CA": { latitude: 37.5485, longitude: -121.9886 },
  "Richmond, VA": { latitude: 37.5407, longitude: -77.4360 },
  "Boise, ID": { latitude: 43.6150, longitude: -116.2023 },
  "Spokane, WA": { latitude: 47.6588, longitude: -117.4260 },

  // Canada - Major Cities
  "Toronto, ON": { latitude: 43.6532, longitude: -79.3832 },
  "Montreal, QC": { latitude: 45.5017, longitude: -73.5673 },
  "Vancouver, BC": { latitude: 49.2827, longitude: -123.1207 },
  "Calgary, AB": { latitude: 51.0447, longitude: -114.0719 },
  "Edmonton, AB": { latitude: 53.5461, longitude: -113.4938 },
  "Ottawa, ON": { latitude: 45.4215, longitude: -75.6972 },
  "Winnipeg, MB": { latitude: 49.8951, longitude: -97.1384 },
  "Quebec City, QC": { latitude: 46.8139, longitude: -71.2080 },
  "Hamilton, ON": { latitude: 43.2557, longitude: -79.8711 },
  "Kitchener, ON": { latitude: 43.4516, longitude: -80.4925 },
  "London, ON": { latitude: 42.9849, longitude: -81.2453 },
  "Victoria, BC": { latitude: 48.4284, longitude: -123.3656 },
  "Halifax, NS": { latitude: 44.6488, longitude: -63.5752 },
  "Saskatoon, SK": { latitude: 52.1332, longitude: -106.6700 },
  "Regina, SK": { latitude: 50.4452, longitude: -104.6189 },

  // United Kingdom
  "London, UK": { latitude: 51.5074, longitude: -0.1278 },
  "Birmingham, UK": { latitude: 52.4862, longitude: -1.8904 },
  "Manchester, UK": { latitude: 53.4808, longitude: -2.2426 },
  "Glasgow, UK": { latitude: 55.8642, longitude: -4.2518 },
  "Liverpool, UK": { latitude: 53.4084, longitude: -2.9916 },
  "Leeds, UK": { latitude: 53.8008, longitude: -1.5491 },
  "Edinburgh, UK": { latitude: 55.9533, longitude: -3.1883 },
  "Bristol, UK": { latitude: 51.4545, longitude: -2.5879 },
  "Sheffield, UK": { latitude: 53.3811, longitude: -1.4701 },
  "Newcastle, UK": { latitude: 54.9783, longitude: -1.6178 },

  // Europe - Major Cities
  "Paris, France": { latitude: 48.8566, longitude: 2.3522 },
  "Berlin, Germany": { latitude: 52.5200, longitude: 13.4050 },
  "Madrid, Spain": { latitude: 40.4168, longitude: -3.7038 },
  "Rome, Italy": { latitude: 41.9028, longitude: 12.4964 },
  "Amsterdam, Netherlands": { latitude: 52.3676, longitude: 4.9041 },
  "Brussels, Belgium": { latitude: 50.8503, longitude: 4.3517 },
  "Vienna, Austria": { latitude: 48.2082, longitude: 16.3738 },
  "Barcelona, Spain": { latitude: 41.3851, longitude: 2.1734 },
  "Munich, Germany": { latitude: 48.1351, longitude: 11.5820 },
  "Milan, Italy": { latitude: 45.4642, longitude: 9.1900 },
  "Prague, Czech Republic": { latitude: 50.0755, longitude: 14.4378 },
  "Copenhagen, Denmark": { latitude: 55.6761, longitude: 12.5683 },
  "Stockholm, Sweden": { latitude: 59.3293, longitude: 18.0686 },
  "Oslo, Norway": { latitude: 59.9139, longitude: 10.7522 },
  "Helsinki, Finland": { latitude: 60.1699, longitude: 24.9384 },
  "Warsaw, Poland": { latitude: 52.2297, longitude: 21.0122 },
  "Budapest, Hungary": { latitude: 47.4979, longitude: 19.0402 },
  "Lisbon, Portugal": { latitude: 38.7223, longitude: -9.1393 },
  "Athens, Greece": { latitude: 37.9838, longitude: 23.7275 },
  "Dublin, Ireland": { latitude: 53.3498, longitude: -6.2603 },
  "Zurich, Switzerland": { latitude: 47.3769, longitude: 8.5417 },
  "Geneva, Switzerland": { latitude: 46.2044, longitude: 6.1432 },

  // Asia - Major Cities
  "Tokyo, Japan": { latitude: 35.6762, longitude: 139.6503 },
  "Seoul, South Korea": { latitude: 37.5665, longitude: 126.9780 },
  "Beijing, China": { latitude: 39.9042, longitude: 116.4074 },
  "Shanghai, China": { latitude: 31.2304, longitude: 121.4737 },
  "Hong Kong, China": { latitude: 22.3193, longitude: 114.1694 },
  "Singapore, Singapore": { latitude: 1.3521, longitude: 103.8198 },
  "Bangkok, Thailand": { latitude: 13.7563, longitude: 100.5018 },
  "Dubai, UAE": { latitude: 25.2048, longitude: 55.2708 },
  "Mumbai, India": { latitude: 19.0760, longitude: 72.8777 },
  "Delhi, India": { latitude: 28.7041, longitude: 77.1025 },
  "Bangalore, India": { latitude: 12.9716, longitude: 77.5946 },
  "Manila, Philippines": { latitude: 14.5995, longitude: 120.9842 },
  "Jakarta, Indonesia": { latitude: -6.2088, longitude: 106.8456 },
  "Kuala Lumpur, Malaysia": { latitude: 3.1390, longitude: 101.6869 },
  "Taipei, Taiwan": { latitude: 25.0330, longitude: 121.5654 },
  "Tel Aviv, Israel": { latitude: 32.0853, longitude: 34.7818 },
  "Istanbul, Turkey": { latitude: 41.0082, longitude: 28.9784 },

  // Australia & New Zealand
  "Sydney, Australia": { latitude: -33.8688, longitude: 151.2093 },
  "Melbourne, Australia": { latitude: -37.8136, longitude: 144.9631 },
  "Brisbane, Australia": { latitude: -27.4698, longitude: 153.0251 },
  "Perth, Australia": { latitude: -31.9505, longitude: 115.8605 },
  "Adelaide, Australia": { latitude: -34.9285, longitude: 138.6007 },
  "Auckland, New Zealand": { latitude: -36.8485, longitude: 174.7633 },
  "Wellington, New Zealand": { latitude: -41.2865, longitude: 174.7762 },

  // South America
  "Sao Paulo, Brazil": { latitude: -23.5505, longitude: -46.6333 },
  "Rio de Janeiro, Brazil": { latitude: -22.9068, longitude: -43.1729 },
  "Buenos Aires, Argentina": { latitude: -34.6037, longitude: -58.3816 },
  "Santiago, Chile": { latitude: -33.4489, longitude: -70.6693 },
  "Lima, Peru": { latitude: -12.0464, longitude: -77.0428 },
  "Bogota, Colombia": { latitude: 4.7110, longitude: -74.0721 },
  "Caracas, Venezuela": { latitude: 10.4806, longitude: -66.9036 },

  // Africa
  "Cairo, Egypt": { latitude: 30.0444, longitude: 31.2357 },
  "Lagos, Nigeria": { latitude: 6.5244, longitude: 3.3792 },
  "Johannesburg, South Africa": { latitude: -26.2041, longitude: 28.0473 },
  "Cape Town, South Africa": { latitude: -33.9249, longitude: 18.4241 },
  "Nairobi, Kenya": { latitude: -1.2921, longitude: 36.8219 },
  "Casablanca, Morocco": { latitude: 33.5731, longitude: -7.5898 },

  // Mexico
  "Mexico City, Mexico": { latitude: 19.4326, longitude: -99.1332 },
  "Guadalajara, Mexico": { latitude: 20.6597, longitude: -103.3496 },
  "Monterrey, Mexico": { latitude: 25.6866, longitude: -100.3161 },
  "Cancun, Mexico": { latitude: 21.1619, longitude: -86.8515 },
};

/**
 * Get coordinates for a city name
 * @param {string} cityName - City name in format "City, Region" (e.g., "New York, NY")
 * @returns {object|null} - { latitude, longitude } or null if not found
 */
export const getCityCoordinates = (cityName: string): { latitude: number; longitude: number } | null => {
  if (!cityName || typeof cityName !== 'string') {
    return null;
  }

  // Direct lookup
  if (cityCoordinatesMap[cityName]) {
    return cityCoordinatesMap[cityName];
  }

  // Try case-insensitive lookup
  const normalizedName = cityName.trim();
  const matchingKey = Object.keys(cityCoordinatesMap).find(
    key => key.toLowerCase() === normalizedName.toLowerCase()
  );

  if (matchingKey) {
    return cityCoordinatesMap[matchingKey];
  }

  // Try partial match (city name only, ignore region)
  const cityPart = cityName.split(',')[0]?.trim();
  if (cityPart) {
    const partialMatch = Object.keys(cityCoordinatesMap).find(
      key => key.toLowerCase().startsWith(cityPart.toLowerCase() + ',')
    );
    if (partialMatch) {
      return cityCoordinatesMap[partialMatch];
    }
  }

  return null;
};

/**
 * Enhance city data with coordinates for mapping
 * @param {Array} cityData - Array of [cityName, { count }] entries from API
 * @returns {Array} - Array of [cityName, { count, coordinates }] with coordinates added
 */
export const enhanceCityDataWithCoordinates = (cityData: Array<[string, Record<string, unknown>]>): Array<[string, Record<string, unknown>]> => {
  if (!Array.isArray(cityData)) {
    return [];
  }

  return cityData.map(([cityName, data]) => {
    const coordinates = getCityCoordinates(cityName);
    return [
      cityName,
      {
        ...data,
        coordinates: coordinates || null,
      },
    ];
  });
};

/**
 * Check if city coordinates are available
 * @param {string} cityName - City name to check
 * @returns {boolean} - True if coordinates are available
 */
export const hasCityCoordinates = (cityName: string): boolean => {
  return getCityCoordinates(cityName) !== null;
};

/**
 * Get all available cities
 * @returns {Array<string>} - Array of all city names with available coordinates
 */
export const getAvailableCities = () => {
  return Object.keys(cityCoordinatesMap);
};

/**
 * Get statistics about coordinate coverage
 * @param {Array} cityData - Array of [cityName, { count }] entries
 * @returns {object} - { total, withCoordinates, withoutCoordinates, coverage }
 */
export const getCoordinateCoverage = (cityData: Array<[string, Record<string, unknown>]>) => {
  if (!Array.isArray(cityData) || cityData.length === 0) {
    return {
      total: 0,
      withCoordinates: 0,
      withoutCoordinates: 0,
      coverage: 0,
    };
  }

  const withCoordinates = cityData.filter(([cityName]) =>
    hasCityCoordinates(cityName)
  ).length;

  const total = cityData.length;
  const withoutCoordinates = total - withCoordinates;
  const coverage = total > 0 ? (withCoordinates / total) * 100 : 0;

  return {
    total,
    withCoordinates,
    withoutCoordinates,
    coverage: Math.round(coverage * 10) / 10, // Round to 1 decimal
  };
};

const cityCoordinatesUtils = {
  getCityCoordinates,
  enhanceCityDataWithCoordinates,
  hasCityCoordinates,
  getAvailableCities,
  getCoordinateCoverage,
};

export default cityCoordinatesUtils;
