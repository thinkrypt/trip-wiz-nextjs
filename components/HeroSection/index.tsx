'use client';

export function HeroSection() {
	return (
		<div className='text-center space-y-4 animate-fade-in-up'>
			<h2 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent'>
				Plan Your Perfect Trip
			</h2>
			<p className='text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animation-delay-200'>
				Discover amazing destinations, create itineraries, and make unforgettable memories
			</p>
		</div>
	);
}
