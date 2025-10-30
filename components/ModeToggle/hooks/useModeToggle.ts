import { useState, useEffect } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';

export function useModeToggle() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const getModeIcon = () => {
		switch (theme) {
			case 'dark':
				return Moon;
			case 'light':
				return Sun;
			default:
				return Monitor;
		}
	};

	return {
		theme,
		setTheme,
		mounted,
		Icon: getModeIcon(),
	};
}
