import { AlertCircle, WifiOff } from 'lucide-react';

interface UseErrorStateProps {
	isNetworkError: boolean;
	isOnline: boolean;
	searchTerm: string | null;
	hasCachedData: boolean;
}

export function useErrorState({
	isNetworkError,
	isOnline,
	searchTerm,
	hasCachedData,
}: UseErrorStateProps) {
	const isNetworkIssue = isNetworkError || !isOnline;
	const Icon = isNetworkIssue ? WifiOff : AlertCircle;
	const iconSize = isNetworkIssue ? 'h-8 w-8' : 'h-6 w-6';

	const errorMessage = isNetworkIssue
		? 'No internet connection'
		: searchTerm
			? `Sorry, we couldn't find information about "${searchTerm}". Try another location!`
			: 'Something went wrong. Please try again.';

	const errorDescription = isNetworkIssue
		? hasCachedData
			? 'Showing cached data. Connect to the internet for the latest information.'
			: 'Please check your internet connection and try again.'
		: null;

	return {
		Icon,
		iconSize,
		errorMessage,
		errorDescription,
		showRetryButton: isOnline,
	};
}
