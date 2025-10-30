import { useState, useEffect } from 'react';
import { Trees, Mountain, Sun as SunIcon, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useTravelTheme } from '@/lib/use-travel-theme';

export function useThemeToggle() {
	const { theme, setTheme } = useTheme();
	const { travelTheme, setTravelTheme, mounted: travelMounted } = useTravelTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const getThemeIcon = () => {
		if (travelTheme) {
			switch (travelTheme) {
				case 'forest':
					return Trees;
				case 'mountain':
					return Mountain;
				case 'desert':
					return SunIcon;
			}
		}
		return theme === 'dark' ? Moon : Sun;
	};

	return {
		theme,
		setTheme,
		travelTheme,
		setTravelTheme,
		mounted: mounted && travelMounted,
		Icon: getThemeIcon(),
	};
}
