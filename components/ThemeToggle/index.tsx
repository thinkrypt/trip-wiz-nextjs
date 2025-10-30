'use client';

import { Sun, Moon, Monitor, Trees, Mountain, Sun as SunIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
	DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { useThemeToggle } from './hooks/useThemeToggle';

export function ThemeToggle() {
	const { theme, setTheme, travelTheme, setTravelTheme, mounted, Icon } = useThemeToggle();

	if (!mounted) {
		return (
			<Button variant='ghost' size='icon' className='h-9 w-9'>
				<Sun className='h-4 w-4' />
				<span className='sr-only'>Toggle theme</span>
			</Button>
		);
	}

	const IconComponent = Icon;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size='icon' className='h-9 w-9'>
					<IconComponent className='h-4 w-4' />
					<span className='sr-only'>Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='w-40'>
				<DropdownMenuLabel>Light / Dark</DropdownMenuLabel>
				<DropdownMenuItem onClick={() => setTheme('light')}>
					<Sun className='mr-2 h-4 w-4' />
					<span>Light</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('dark')}>
					<Moon className='mr-2 h-4 w-4' />
					<span>Dark</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('system')}>
					<Monitor className='mr-2 h-4 w-4' />
					<span>System</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuLabel>Travel Themes</DropdownMenuLabel>
				<DropdownMenuItem onClick={() => setTravelTheme('forest')}>
					<Trees className='mr-2 h-4 w-4' />
					<span>Forest</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTravelTheme('mountain')}>
					<Mountain className='mr-2 h-4 w-4' />
					<span>Mountain</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTravelTheme('desert')}>
					<SunIcon className='mr-2 h-4 w-4' />
					<span>Desert</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTravelTheme(null)}>
					<span className='ml-6'>None</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
