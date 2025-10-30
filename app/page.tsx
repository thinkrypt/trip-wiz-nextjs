'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { SearchBar } from '@/components/SearchBar';
import { LocationResults } from '@/components/LocationResults';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { OfflineBanner } from '@/components/OfflineBanner';
import { QuickSuggestions } from '@/components/QuickSuggestions';
import { useLocationData } from '@/lib/queries';
import { useOnlineStatus } from '@/lib/use-online-status';

export default function Home() {
	const [searchQuery, setSearchQuery] = useState('');
	const [searchTerm, setSearchTerm] = useState<string | null>(null);
	const isOnline = useOnlineStatus();

	// Use TanStack Query for data fetching with caching
	const {
		data: locationData,
		isLoading,
		isError,
		error,
	} = useLocationData(searchTerm, !!searchTerm);

	// Check if error is network-related
	const isNetworkError =
		error instanceof Error &&
		(error.message.includes('Failed to fetch') ||
			error.message.includes('NetworkError') ||
			error.message.includes('network') ||
			error.name === 'TypeError');

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		const term = searchQuery.trim();

		if (!term) {
			return;
		}

		setSearchTerm(term);
	};

	const handleBackToSearch = () => {
		setSearchTerm(null);
		setSearchQuery('');
	};

	const handleQuickSearch = (destination: string) => {
		setSearchQuery(destination);
		setSearchTerm(destination);
	};

	const handleRetry = () => {
		// Retry by resetting search term
		const currentTerm = searchTerm;
		setSearchTerm(null);
		setTimeout(() => {
			if (currentTerm) {
				setSearchTerm(currentTerm);
			}
		}, 100);
	};

	// Show results if we have data (even if offline - show cached data)
	if (searchTerm && locationData) {
		return (
			<>
				<OfflineBanner />
				<LocationResults data={locationData} onBack={handleBackToSearch} />
			</>
		);
	}

	return (
		<div className='flex min-h-screen flex-col'>
			<OfflineBanner />
			<Header />

			<main className='flex flex-1 items-center justify-center px-4 py-12'>
				<div className='w-full max-w-4xl space-y-8'>
					<HeroSection />

					<SearchBar
						searchQuery={searchQuery}
						onSearchQueryChange={setSearchQuery}
						onSubmit={handleSearch}
						isLoading={isLoading}
						isOnline={isOnline}
					/>

					{isLoading && <LoadingState />}

					{isError && (
						<ErrorState
							isNetworkError={isNetworkError}
							isOnline={isOnline}
							searchTerm={searchTerm}
							hasCachedData={!!locationData}
							onRetry={handleRetry}
						/>
					)}

					<QuickSuggestions
						onDestinationClick={handleQuickSearch}
						hidden={!!searchTerm || isLoading}
					/>
				</div>
			</main>
		</div>
	);
}
