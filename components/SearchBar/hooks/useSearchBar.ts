interface UseSearchBarProps {
	isLoading: boolean;
	isOnline: boolean;
}

export function useSearchBar({ isLoading, isOnline }: UseSearchBarProps) {
	const buttonText = isLoading ? 'Searching...' : !isOnline ? 'Offline' : 'Search';

	const buttonDisabled = isLoading || !isOnline;
	const buttonTitle = !isOnline ? 'You are offline. Please check your connection.' : '';

	return {
		buttonText,
		buttonDisabled,
		buttonTitle,
	};
}
