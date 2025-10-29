// Client-side API utilities - calls server-side API routes

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
	weather?: {
		temperature: number;
		condition: string;
		humidity: number;
	};
}

// Main function to fetch all location data from server-side API
export async function fetchLocationData(locationName: string): Promise<LocationData | null> {
	try {
		const response = await fetch(`/api/location?q=${encodeURIComponent(locationName)}`);

		if (!response.ok) {
			if (response.status === 404) {
				return null;
			}
			throw new Error(`API error: ${response.status}`);
		}

		const data: LocationData = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching location data:', error);
		return null;
	}
}
