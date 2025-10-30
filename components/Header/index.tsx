'use client';

import { MapPin } from 'lucide-react';
import { ModeToggle } from '@/components/ModeToggle';
import { TravelThemeToggle } from '@/components/TravelThemeToggle';

export function Header() {
	return (
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
					<div className='flex items-center gap-2'>
						<ModeToggle />
						<TravelThemeToggle />
					</div>
				</nav>
			</div>
		</header>
	);
}
