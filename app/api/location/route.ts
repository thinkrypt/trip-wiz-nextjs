import { NextRequest, NextResponse } from 'next/server';

export interface LocationImage {
	id: string;
	url: string;
	thumbnail: string;
	photographer: string;
	photographerUrl: string;
}

export interface LocationDetails {
	name: string;
	country: string;
	region?: string;
	latitude?: number;
	longitude?: number;
	population?: number;
	description?: string;
	wikipediaUrl?: string;
}

export interface LocationData {
	location: LocationDetails;
	images: LocationImage[];
}

// Fetch images from Unsplash API
async function fetchLocationImages(
	locationName: string,
	count: number = 12
): Promise<LocationImage[]> {
	try {
		const accessKey = process.env.UNSPLASH_ACCESS_KEY;

		if (!accessKey) {
			console.warn('Unsplash API key not found. Using placeholder images.');
			return generatePlaceholderImages(locationName, count);
		}

		const query = encodeURIComponent(locationName);
		const response = await fetch(
			`https://api.unsplash.com/search/photos?query=${query}&per_page=${count}&client_id=${accessKey}`,
			{
				headers: {
					'Accept-Version': 'v1',
				},
			}
		);

		if (!response.ok) {
			console.error('Unsplash API error:', response.status);
			return generatePlaceholderImages(locationName, count);
		}

		const data = await response.json();

		if (!data.results || data.results.length === 0) {
			return generatePlaceholderImages(locationName, count);
		}

		return data.results.map(
			(
				photo: {
					id?: string;
					urls?: { regular?: string; full?: string; thumb?: string; small?: string };
					user?: { name?: string; links?: { html?: string } };
				},
				index: number
			) => ({
				id: photo.id || `${locationName}-${index}`,
				url: photo.urls?.regular || photo.urls?.full || '',
				thumbnail: photo.urls?.thumb || photo.urls?.small || '',
				photographer: photo.user?.name || 'Unsplash',
				photographerUrl: photo.user?.links?.html || 'https://unsplash.com',
			})
		);
	} catch (error) {
		console.error('Error fetching images:', error);
		return generatePlaceholderImages(locationName, count);
	}
}

// Fallback placeholder images
function generatePlaceholderImages(locationName: string, count: number): LocationImage[] {
	const images: LocationImage[] = [];
	for (let i = 0; i < count; i++) {
		images.push({
			id: `${locationName}-placeholder-${i}`,
			url: `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=900&fit=crop&sig=${i}`,
			thumbnail: `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&sig=${i}`,
			photographer: 'Unsplash',
			photographerUrl: 'https://unsplash.com',
		});
	}
	return images;
}

// Fetch location details using Geonames API
async function fetchLocationDetails(locationName: string): Promise<LocationDetails | null> {
	try {
		// Use Geonames Search API (free, no key required for basic usage)
		// For higher limits, get free API key at https://www.geonames.org/login
		const geonamesResponse = await fetch(
			`https://secure.geonames.org/searchJSON?q=${encodeURIComponent(locationName)}&maxRows=1&username=demo`
		);

		let locationData: LocationDetails | null = null;
		if (geonamesResponse.ok) {
			const geonamesData = await geonamesResponse.json();
			if (geonamesData.geonames && geonamesData.geonames.length > 0) {
				const place = geonamesData.geonames[0];
				locationData = {
					name: place.name,
					country: place.countryName || 'Unknown',
					region: place.adminName1 || undefined,
					latitude: place.lat ? parseFloat(place.lat) : undefined,
					longitude: place.lng ? parseFloat(place.lng) : undefined,
					population: place.population ? parseInt(place.population) : undefined,
					wikipediaUrl: `https://en.wikipedia.org/wiki/${encodeURIComponent(locationName)}`,
				};
			}
		}

		// Fallback: try REST Countries if it's a country name
		if (!locationData) {
			const countriesResponse = await fetch(
				`https://restcountries.com/v3.1/name/${encodeURIComponent(locationName)}`
			);

			if (countriesResponse.ok) {
				const countries = await countriesResponse.json();
				if (countries && countries.length > 0) {
					const country = countries[0];
					locationData = {
						name: country.name.common,
						country: country.name.common,
						region: country.region,
						latitude: country.latlng?.[0],
						longitude: country.latlng?.[1],
						population: country.population,
						wikipediaUrl: `https://en.wikipedia.org/wiki/${encodeURIComponent(locationName)}`,
					};
				}
			}
		}

		// If still no data, create basic entry
		if (!locationData) {
			locationData = {
				name: locationName,
				country: 'Unknown',
				description: `Discover the beauty and culture of ${locationName}.`,
				wikipediaUrl: `https://en.wikipedia.org/wiki/${encodeURIComponent(locationName)}`,
			};
		}

		return locationData;
	} catch (error) {
		console.error('Error fetching location details:', error);
		return {
			name: locationName,
			country: 'Unknown',
			description: `Discover the beauty and culture of ${locationName}.`,
			wikipediaUrl: `https://en.wikipedia.org/wiki/${encodeURIComponent(locationName)}`,
		};
	}
}

// Fetch Wikipedia description
async function fetchWikipediaDescription(locationName: string): Promise<string | null> {
	try {
		const response = await fetch(
			`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(locationName)}`
		);

		if (!response.ok) {
			return null;
		}

		const data = await response.json();
		return data.extract || null;
	} catch (error) {
		console.error('Error fetching Wikipedia description:', error);
		return null;
	}
}

// Main API route handler
export async function GET(request: NextRequest) {
	try {
		const searchParams = request.nextUrl.searchParams;
		const locationName = searchParams.get('q');

		if (!locationName) {
			return NextResponse.json({ error: 'Location name is required' }, { status: 400 });
		}

		// Fetch all data in parallel
		const [locationDetails, images, description] = await Promise.all([
			fetchLocationDetails(locationName),
			fetchLocationImages(locationName, 12),
			fetchWikipediaDescription(locationName),
		]);

		if (!locationDetails) {
			return NextResponse.json({ error: 'Location not found' }, { status: 404 });
		}

		// Enhance description with Wikipedia data if available
		if (description) {
			locationDetails.description = description;
		}

		const locationData: LocationData = {
			location: locationDetails,
			images,
		};

		return NextResponse.json(locationData);
	} catch (error) {
		console.error('Error in location API route:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
