'use client';

import { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Home() {
	const [searchQuery, setSearchQuery] = useState('');

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: Implement search functionality
		console.log('Searching for:', searchQuery);
	};

	return (
		<div className="flex min-h-screen flex-col">
			{/* Header */}
			<header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className="container mx-auto flex h-16 items-center justify-between px-4">
					<div className="flex items-center gap-2">
						<MapPin className="h-6 w-6 text-primary" />
						<h1 className="text-xl font-bold">TripWiz</h1>
					</div>
					<nav className="hidden md:flex items-center gap-6">
						<a
							href="#"
							className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
						>
							My Trips
						</a>
						<a
							href="#"
							className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
						>
							Saved
						</a>
					</nav>
				</div>
			</header>

			{/* Main Content - Centered Search */}
			<main className="flex flex-1 items-center justify-center px-4 py-12">
				<div className="w-full max-w-4xl space-y-8">
					{/* Hero Section */}
					<div className="text-center space-y-4">
						<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
							Plan Your Perfect Trip
						</h2>
						<p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
							Discover amazing destinations, create itineraries, and make
							unforgettable memories
						</p>
					</div>

					{/* Search Bar */}
					<form onSubmit={handleSearch} className="w-full">
						<div className="relative group">
							<div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
							<div className="relative flex items-center gap-2 bg-card border border-border rounded-xl p-2 shadow-lg backdrop-blur-sm">
								<div className="flex-1 flex items-center gap-3 px-4">
									<Search className="h-5 w-5 text-muted-foreground shrink-0" />
									<Input
										type="text"
										placeholder="Where do you want to go?"
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										className="border-0 bg-transparent text-lg focus-visible:ring-0 focus-visible:ring-offset-0 h-auto py-3 px-0 placeholder:text-muted-foreground"
									/>
								</div>
								<div className="flex items-center gap-2 pr-2">
									<Button
										type="button"
										variant="ghost"
										size="icon"
										className="h-10 w-10 shrink-0"
										title="Date"
									>
										<Calendar className="h-4 w-4" />
									</Button>
									<Button
										type="button"
										variant="ghost"
										size="icon"
										className="h-10 w-10 shrink-0"
										title="Travelers"
									>
										<Users className="h-4 w-4" />
									</Button>
									<Button type="submit" size="lg" className="h-10 px-6 shrink-0">
										<Search className="h-4 w-4 mr-2" />
										Search
									</Button>
								</div>
							</div>
						</div>
					</form>

					{/* Quick Suggestions */}
					<div className="flex flex-wrap items-center justify-center gap-3 text-sm">
						<span className="text-muted-foreground">Popular destinations:</span>
						{['Paris', 'Tokyo', 'New York', 'Bali', 'London'].map((destination) => (
							<button
								key={destination}
								onClick={() => setSearchQuery(destination)}
								className="px-4 py-2 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors"
							>
								{destination}
							</button>
						))}
					</div>
				</div>
			</main>
		</div>
	);
}
