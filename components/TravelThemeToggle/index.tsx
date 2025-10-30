'use client';

import { Trees, MountainSnow, Tent, UtilityPole } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTravelThemeToggle } from './hooks/useTravelThemeToggle';

export function TravelThemeToggle() {
	const { travelTheme, setTravelTheme, mounted, Icon } = useTravelThemeToggle();

	if (!mounted) {
		return (
			<Button variant='ghost' size='icon' className='h-9 w-9'>
				<UtilityPole className='h-4 w-4' />
				<span className='sr-only'>Toggle travel theme</span>
			</Button>
		);
	}

	const IconComponent = Icon;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size='icon' className='h-9 w-9'>
					<IconComponent className='h-4 w-4' />
					<span className='sr-only'>Toggle travel theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem onClick={() => setTravelTheme('forest')}>
					<Trees className='mr-2 h-4 w-4' />
					<span>Forest</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTravelTheme('mountain')}>
					<MountainSnow className='mr-2 h-4 w-4' />
					<span>Mountain</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTravelTheme('desert')}>
					<Tent className='mr-2 h-4 w-4' />
					<span>Desert</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTravelTheme(null)}>
					<UtilityPole className='mr-2 h-4 w-4' />
					<span>Default</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
