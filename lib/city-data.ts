export interface CityData {
  rank: number
  name: string
  country: string
  aqi: number
  mainPollutant: string
  status: 'good' | 'moderate' | 'unhealthy-for-sensitive' | 'unhealthy' | 'very-unhealthy' | 'hazardous'
  temp?: number
  humidity?: number
  windSpeed?: number
  lat?: number
  lng?: number
}

export function getCityRankings(): CityData[] {
  return [
    { rank: 1, name: 'Lahore', country: 'Pakistan', aqi: 268, mainPollutant: 'PM2.5', status: 'very-unhealthy', temp: 22, humidity: 65, windSpeed: 8, lat: 31.5204, lng: 74.3587 },
    { rank: 2, name: 'Delhi', country: 'India', aqi: 245, mainPollutant: 'PM2.5', status: 'very-unhealthy', temp: 24, humidity: 70, windSpeed: 6, lat: 28.6139, lng: 77.2090 },
    { rank: 3, name: 'Dhaka', country: 'Bangladesh', aqi: 232, mainPollutant: 'PM2.5', status: 'very-unhealthy', temp: 28, humidity: 75, windSpeed: 10, lat: 23.8103, lng: 90.4125 },
    { rank: 4, name: 'Kolkata', country: 'India', aqi: 198, mainPollutant: 'PM2.5', status: 'unhealthy', temp: 26, humidity: 68, windSpeed: 7, lat: 22.5726, lng: 88.3639 },
    { rank: 5, name: 'Mumbai', country: 'India', aqi: 187, mainPollutant: 'PM10', status: 'unhealthy', temp: 29, humidity: 80, windSpeed: 12, lat: 19.0760, lng: 72.8777 },
    { rank: 6, name: 'Balikpapan', country: 'Indonesia', aqi: 165, mainPollutant: 'PM2.5', status: 'unhealthy', temp: 29, humidity: 82, windSpeed: 8, lat: -1.2379, lng: 116.8529 },
    { rank: 7, name: 'Beijing', country: 'China', aqi: 154, mainPollutant: 'PM2.5', status: 'unhealthy', temp: 15, humidity: 45, windSpeed: 15, lat: 39.9042, lng: 116.4074 },
    { rank: 8, name: 'Chengdu', country: 'China', aqi: 142, mainPollutant: 'PM2.5', status: 'unhealthy-for-sensitive', temp: 18, humidity: 72, windSpeed: 5, lat: 30.5728, lng: 104.0668 },
    { rank: 9, name: 'Jakarta', country: 'Indonesia', aqi: 135, mainPollutant: 'PM10', status: 'unhealthy-for-sensitive', temp: 30, humidity: 78, windSpeed: 9, lat: -6.2088, lng: 106.8456 },
    { rank: 10, name: 'Ho Chi Minh City', country: 'Vietnam', aqi: 128, mainPollutant: 'PM2.5', status: 'unhealthy-for-sensitive', temp: 31, humidity: 76, windSpeed: 11, lat: 10.8231, lng: 106.6297 },
    { rank: 11, name: 'Bangkok', country: 'Thailand', aqi: 118, mainPollutant: 'PM2.5', status: 'unhealthy-for-sensitive', temp: 32, humidity: 70, windSpeed: 8, lat: 13.7563, lng: 100.5018 },
    { rank: 12, name: 'Hanoi', country: 'Vietnam', aqi: 112, mainPollutant: 'PM2.5', status: 'unhealthy-for-sensitive', temp: 27, humidity: 73, windSpeed: 6, lat: 21.0285, lng: 105.8542 },
    { rank: 13, name: 'Cairo', country: 'Egypt', aqi: 105, mainPollutant: 'PM10', status: 'unhealthy-for-sensitive', temp: 25, humidity: 55, windSpeed: 13, lat: 30.0444, lng: 31.2357 },
    { rank: 14, name: 'Los Angeles', country: 'USA', aqi: 92, mainPollutant: 'O3', status: 'moderate', temp: 21, humidity: 60, windSpeed: 10, lat: 34.0522, lng: -118.2437 },
    { rank: 15, name: 'Mexico City', country: 'Mexico', aqi: 88, mainPollutant: 'O3', status: 'moderate', temp: 19, humidity: 50, windSpeed: 7, lat: 19.4326, lng: -99.1332 },
    { rank: 16, name: 'São Paulo', country: 'Brazil', aqi: 85, mainPollutant: 'PM10', status: 'moderate', temp: 23, humidity: 65, windSpeed: 9, lat: -23.5505, lng: -46.6333 },
    { rank: 17, name: 'Istanbul', country: 'Turkey', aqi: 82, mainPollutant: 'PM2.5', status: 'moderate', temp: 16, humidity: 68, windSpeed: 12, lat: 41.0082, lng: 28.9784 },
    { rank: 18, name: 'Samarinda', country: 'Indonesia', aqi: 78, mainPollutant: 'PM2.5', status: 'moderate', temp: 28, humidity: 78, windSpeed: 12, lat: -0.5022, lng: 117.1536 },
    { rank: 19, name: 'Singapore', country: 'Singapore', aqi: 72, mainPollutant: 'PM2.5', status: 'moderate', temp: 30, humidity: 85, windSpeed: 8, lat: 1.3521, lng: 103.8198 },
    { rank: 20, name: 'Kuala Lumpur', country: 'Malaysia', aqi: 68, mainPollutant: 'PM10', status: 'moderate', temp: 29, humidity: 80, windSpeed: 7, lat: 3.1390, lng: 101.6869 },
    { rank: 21, name: 'London', country: 'UK', aqi: 62, mainPollutant: 'PM2.5', status: 'moderate', temp: 12, humidity: 75, windSpeed: 15, lat: 51.5074, lng: -0.1278 },
    { rank: 22, name: 'Paris', country: 'France', aqi: 58, mainPollutant: 'PM10', status: 'moderate', temp: 14, humidity: 70, windSpeed: 11, lat: 48.8566, lng: 2.3522 },
    { rank: 23, name: 'Berlin', country: 'Germany', aqi: 55, mainPollutant: 'PM2.5', status: 'moderate', temp: 11, humidity: 68, windSpeed: 13, lat: 52.5200, lng: 13.4050 },
    { rank: 24, name: 'Rome', country: 'Italy', aqi: 52, mainPollutant: 'PM10', status: 'moderate', temp: 17, humidity: 62, windSpeed: 9, lat: 41.9028, lng: 12.4964 },
    { rank: 25, name: 'Madrid', country: 'Spain', aqi: 50, mainPollutant: 'NO2', status: 'good', temp: 18, humidity: 55, windSpeed: 10, lat: 40.4168, lng: -3.7038 },
    { rank: 26, name: 'Bontang', country: 'Indonesia', aqi: 45, mainPollutant: 'PM2.5', status: 'good', temp: 27, humidity: 75, windSpeed: 15, lat: 0.1345, lng: 117.5007 },
    { rank: 27, name: 'Tokyo', country: 'Japan', aqi: 42, mainPollutant: 'PM2.5', status: 'good', temp: 16, humidity: 65, windSpeed: 12, lat: 35.6762, lng: 139.6503 },
    { rank: 28, name: 'Seoul', country: 'South Korea', aqi: 40, mainPollutant: 'PM2.5', status: 'good', temp: 14, humidity: 60, windSpeed: 14, lat: 37.5665, lng: 126.9780 },
    { rank: 29, name: 'Sydney', country: 'Australia', aqi: 38, mainPollutant: 'PM10', status: 'good', temp: 22, humidity: 70, windSpeed: 16, lat: -33.8688, lng: 151.2093 },
    { rank: 30, name: 'Melbourne', country: 'Australia', aqi: 35, mainPollutant: 'PM2.5', status: 'good', temp: 20, humidity: 65, windSpeed: 18, lat: -37.8136, lng: 144.9631 },
    { rank: 31, name: 'Vancouver', country: 'Canada', aqi: 32, mainPollutant: 'PM2.5', status: 'good', temp: 10, humidity: 75, windSpeed: 11, lat: 49.2827, lng: -123.1207 },
    { rank: 32, name: 'Toronto', country: 'Canada', aqi: 30, mainPollutant: 'O3', status: 'good', temp: 8, humidity: 70, windSpeed: 13, lat: 43.6532, lng: -79.3832 },
    { rank: 33, name: 'Montreal', country: 'Canada', aqi: 28, mainPollutant: 'PM2.5', status: 'good', temp: 6, humidity: 68, windSpeed: 12, lat: 45.5017, lng: -73.5673 },
    { rank: 34, name: 'Stockholm', country: 'Sweden', aqi: 25, mainPollutant: 'PM10', status: 'good', temp: 7, humidity: 72, windSpeed: 15, lat: 59.3293, lng: 18.0686 },
    { rank: 35, name: 'Copenhagen', country: 'Denmark', aqi: 23, mainPollutant: 'PM2.5', status: 'good', temp: 9, humidity: 70, windSpeed: 16, lat: 55.6761, lng: 12.5683 },
    { rank: 36, name: 'Oslo', country: 'Norway', aqi: 20, mainPollutant: 'PM10', status: 'good', temp: 5, humidity: 75, windSpeed: 14, lat: 59.9139, lng: 10.7522 },
    { rank: 37, name: 'Helsinki', country: 'Finland', aqi: 18, mainPollutant: 'PM2.5', status: 'good', temp: 4, humidity: 78, windSpeed: 13, lat: 60.1699, lng: 24.9384 },
    { rank: 38, name: 'Auckland', country: 'New Zealand', aqi: 16, mainPollutant: 'PM10', status: 'good', temp: 19, humidity: 72, windSpeed: 17, lat: -36.8485, lng: 174.7633 },
    { rank: 39, name: 'Wellington', country: 'New Zealand', aqi: 15, mainPollutant: 'PM2.5', status: 'good', temp: 17, humidity: 75, windSpeed: 20, lat: -41.2865, lng: 174.7762 },
    { rank: 40, name: 'Reykjavik', country: 'Iceland', aqi: 12, mainPollutant: 'PM10', status: 'good', temp: 3, humidity: 80, windSpeed: 22, lat: 64.1466, lng: -21.9426 },
    { rank: 41, name: 'Zurich', country: 'Switzerland', aqi: 28, mainPollutant: 'PM2.5', status: 'good', temp: 12, humidity: 65, windSpeed: 9, lat: 47.3769, lng: 8.5417 },
    { rank: 42, name: 'Geneva', country: 'Switzerland', aqi: 26, mainPollutant: 'PM10', status: 'good', temp: 13, humidity: 63, windSpeed: 10, lat: 46.2044, lng: 6.1432 },
    { rank: 43, name: 'Vienna', country: 'Austria', aqi: 48, mainPollutant: 'PM2.5', status: 'good', temp: 14, humidity: 68, windSpeed: 11, lat: 48.2082, lng: 16.3738 },
    { rank: 44, name: 'Brussels', country: 'Belgium', aqi: 54, mainPollutant: 'NO2', status: 'moderate', temp: 11, humidity: 72, windSpeed: 13, lat: 50.8503, lng: 4.3517 },
    { rank: 45, name: 'Amsterdam', country: 'Netherlands', aqi: 44, mainPollutant: 'PM2.5', status: 'good', temp: 10, humidity: 76, windSpeed: 14, lat: 52.3676, lng: 4.9041 },
    { rank: 46, name: 'Dublin', country: 'Ireland', aqi: 36, mainPollutant: 'PM10', status: 'good', temp: 9, humidity: 80, windSpeed: 18, lat: 53.3498, lng: -6.2603 },
    { rank: 47, name: 'Lisbon', country: 'Portugal', aqi: 46, mainPollutant: 'PM2.5', status: 'good', temp: 18, humidity: 68, windSpeed: 12, lat: 38.7223, lng: -9.1393 },
    { rank: 48, name: 'Athens', country: 'Greece', aqi: 64, mainPollutant: 'PM10', status: 'moderate', temp: 20, humidity: 60, windSpeed: 11, lat: 37.9838, lng: 23.7275 },
    { rank: 49, name: 'Warsaw', country: 'Poland', aqi: 76, mainPollutant: 'PM2.5', status: 'moderate', temp: 8, humidity: 70, windSpeed: 10, lat: 52.2297, lng: 21.0122 },
    { rank: 50, name: 'Prague', country: 'Czech Republic', aqi: 58, mainPollutant: 'PM2.5', status: 'moderate', temp: 10, humidity: 72, windSpeed: 9, lat: 50.0755, lng: 14.4378 },
  ]
}

export function getCityByName(name: string): CityData | undefined {
  return getCityRankings().find(city => city.name.toLowerCase() === name.toLowerCase())
}
