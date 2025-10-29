'use client';

import { useState, useEffect } from 'react';
import { Search, MapPin, AlertCircle, WifiOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { LocationResults } from '@/components/location-results';
import { LoadingState } from '@/components/loading-state';
import { OfflineBanner } from '@/components/offline-banner';
import { useLocationData, usePrefetchLocation } from '@/lib/queries';
import { useOnlineStatus } from '@/lib/use-online-status';

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

export default function Home() {
	const [searchQuery, setSearchQuery] = useState('');
	const [searchTerm, setSearchTerm] = useState<string | null>(null);
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

	const handleSearch = (e: React.FormEvent, query?: string) => {
		e.preventDefault();
		const term = query || searchQuery.trim();

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
			{/* Offline Banner */}
			<OfflineBanner />

			{/* Header */}
			<header className='border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50'>
				<div className='container mx-auto flex h-16 items-center justify-between px-4'>
					<div className='flex items-center gap-2'>
						<MapPin className='h-6 w-6 text-primary animate-pulse' />
						<h1 className='text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent'>
							TripWiz
						</h1>
					</div>
					<nav className='flex items-center gap-4'>
						<div className='hidden md:flex items-center gap-6'>
							<a
								href='#'
								className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:scale-105 inline-block'
							>
								My Trips
							</a>
							<a
								href='#'
								className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:scale-105 inline-block'
							>
								Saved
							</a>
						</div>
						<ThemeToggle />
					</nav>
				</div>
			</header>

			{/* Main Content - Centered Search */}
			<main className='flex flex-1 items-center justify-center px-4 py-12'>
				<div className='w-full max-w-4xl space-y-8'>
					{/* Hero Section */}
					<div className='text-center space-y-4 animate-fade-in-up'>
						<h2 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent'>
							Plan Your Perfect Trip
						</h2>
						<p className='text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animation-delay-200'>
							Discover amazing destinations, create itineraries, and make
							unforgettable memories
						</p>
					</div>

					{/* Search Bar */}
					<form
						onSubmit={handleSearch}
						className='w-full animate-fade-in-up animation-delay-300'
					>
						<div className='relative group'>
							<div className='absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
							<div className='relative flex items-center gap-2 bg-card border border-border rounded-xl p-2 shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-300'>
								<div className='flex-1 flex items-center gap-3 px-4'>
									<Search className='h-5 w-5 text-muted-foreground shrink-0 group-hover:text-primary transition-colors duration-300' />
									<Input
										type='text'
										placeholder='Where do you want to go?'
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										className='border-0 bg-transparent text-lg focus-visible:ring-0 focus-visible:ring-offset-0 h-auto py-3 px-3 placeholder:text-muted-foreground'
									/>
								</div>
								<div className='flex items-center gap-2 pr-2'>
									<Button
										type='submit'
										size='lg'
										className='h-10 px-6 shrink-0 hover:scale-105 transition-transform duration-300'
										disabled={isLoading || !isOnline}
										title={
											!isOnline
												? 'You are offline. Please check your connection.'
												: ''
										}
									>
										<Search className='h-4 w-4 mr-2' />
										{isLoading
											? 'Searching...'
											: !isOnline
												? 'Offline'
												: 'Search'}
									</Button>
								</div>
							</div>
						</div>
					</form>

					{/* Loading State */}
					{isLoading && <LoadingState />}

					{/* Error State */}
					{isError && (
						<div className='animate-fade-in-up animation-delay-200'>
							<div className='bg-destructive/10 border border-destructive/20 rounded-xl p-6 text-center space-y-4'>
								<div className='flex flex-col items-center justify-center gap-3'>
									{isNetworkError || !isOnline ? (
										<WifiOff className='h-8 w-8 text-destructive' />
									) : (
										<AlertCircle className='h-6 w-6 text-destructive' />
									)}
									<div className='space-y-1'>
										<p className='text-destructive font-medium'>
											{isNetworkError || !isOnline
												? 'No internet connection'
												: searchTerm
													? `Sorry, we couldn't find information about "${searchTerm}". Try another location!`
													: 'Something went wrong. Please try again.'}
										</p>
										{isNetworkError || !isOnline ? (
											<p className='text-sm text-muted-foreground'>
												{locationData
													? 'Showing cached data. Connect to the internet for the latest information.'
													: 'Please check your internet connection and try again.'}
											</p>
										) : null}
									</div>
								</div>
								{isOnline && (
									<Button
										variant='outline'
										onClick={() => {
											// Retry by resetting search term
											const currentTerm = searchTerm;
											setSearchTerm(null);
											setTimeout(() => {
												if (currentTerm) {
													setSearchTerm(currentTerm);
												}
											}, 100);
										}}
										className='hover:scale-105 transition-transform duration-300'
									>
										Try Again
									</Button>
								)}
							</div>
						</div>
					)}

					{/* Quick Suggestions */}
					{!searchTerm && !isLoading && (
						<div className='flex flex-wrap items-center justify-center gap-3 text-sm animate-fade-in-up animation-delay-400'>
							<span className='text-muted-foreground'>Popular destinations:</span>
							{POPULAR_DESTINATIONS.map((destination, index) => (
								<button
									key={destination}
									onClick={() => handleQuickSearch(destination)}
									className='px-4 py-2 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-all duration-300 hover:scale-110 hover:shadow-md'
									style={{ animationDelay: `${index * 50}ms` }}
								>
									{destination}
								</button>
							))}
						</div>
					)}
				</div>
			</main>
		</div>
	);
}
