import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchLocationData, type LocationData } from './api';
import { useOnlineStatus } from './use-online-status';

// Query keys for caching
export const locationKeys = {
	all: ['locations'] as const,
	detail: (name: string) => [...locationKeys.all, name] as const,
};

// Check if error is a network error
function isNetworkError(error: unknown): boolean {
	if (error instanceof Error) {
		return (
			error.message.includes('Failed to fetch') ||
			error.message.includes('NetworkError') ||
			error.message.includes('network') ||
			error.name === 'TypeError'
		);
	}
	return false;
}

// Hook to fetch location data with caching and offline support
export function useLocationData(locationName: string | null, enabled: boolean = true) {
	const isOnline = useOnlineStatus();
	const queryClient = useQueryClient();

	const query = useQuery<LocationData | null>({
		queryKey: locationName ? locationKeys.detail(locationName) : ['locations', 'null'],
		queryFn: async () => {
			if (!locationName) return null;
			// If offline, check for cached data first
			if (!isOnline) {
				const cachedData = queryClient.getQueryData<LocationData | null>(
					locationKeys.detail(locationName)
				);
				if (cachedData) {
					return cachedData;
				}
				// No cached data available, throw error
				throw new Error('Network request failed: Offline');
			}
			return fetchLocationData(locationName);
		},
		enabled: enabled && !!locationName, // Always enabled to allow cached data access
		staleTime: 1000 * 60 * 5, // 5 minutes - data is fresh for 5 minutes
		gcTime: 1000 * 60 * 10, // 10 minutes - cache persists for 10 minutes after unmount
		// Only fetch when online, but still return cached data when offline
		networkMode: 'online',
		// Retry only when online
		retry: (failureCount, error) => {
			if (!isOnline) return false;
			if (isNetworkError(error)) return failureCount < 2;
			return failureCount < 2;
		},
		// Return cached data when offline (even if stale)
		placeholderData: (previousData) => {
			if (!isOnline && previousData) {
				return previousData;
			}
			return undefined;
		},
	});

	return query;
}

// Hook to prefetch location data (useful for popular destinations)
export function usePrefetchLocation() {
	const queryClient = useQueryClient();

	return (locationName: string) => {
		queryClient.prefetchQuery({
			queryKey: locationKeys.detail(locationName),
			queryFn: () => fetchLocationData(locationName),
			staleTime: 1000 * 60 * 5,
		});
	};
}
