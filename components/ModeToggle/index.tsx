'use client';

import { Sun, Moon, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useModeToggle } from './hooks/useModeToggle';

export function ModeToggle() {
	const { theme, setTheme, mounted, Icon } = useModeToggle();

	if (!mounted) {
		return (
			<Button variant='ghost' size='icon' className='h-9 w-9'>
				<Sun className='h-4 w-4' />
				<span className='sr-only'>Toggle light/dark mode</span>
			</Button>
		);
	}

	const IconComponent = Icon;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size='icon' className='h-9 w-9'>
					<IconComponent className='h-4 w-4' />
					<span className='sr-only'>Toggle light/dark mode</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
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
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
