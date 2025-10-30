import { usePrefetchLocation } from '@/lib/queries';
import { useOnlineStatus } from '@/lib/use-online-status';
import { useEffect } from 'react';

const POPULAR_DESTINATIONS = [
	'Paris',
	'Tokyo',
	'New York',
	'Bali',
	'London',
	'Rome',
	'Dubai',
	'Barcelona',
];

export function useQuickSuggestions() {
	const isOnline = useOnlineStatus();
	const prefetchLocation = usePrefetchLocation();

	// Prefetch popular destinations in the background for instant loading (only when online)
	useEffect(() => {
		if (isOnline) {
			POPULAR_DESTINATIONS.forEach((destination) => {
				prefetchLocation(destination);
			});
		}
	}, [prefetchLocation, isOnline]);

	return {
		destinations: POPULAR_DESTINATIONS,
	};
}
