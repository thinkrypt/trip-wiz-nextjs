import { useState, useEffect } from 'react';
import { Trees, MountainSnow, Tent, UtilityPole } from 'lucide-react';
import { useTravelTheme } from '@/lib/use-travel-theme';

export function useTravelThemeToggle() {
	const { travelTheme, setTravelTheme, mounted } = useTravelTheme();

	const getThemeIcon = () => {
		switch (travelTheme) {
			case 'forest':
				return Trees;
			case 'mountain':
				return MountainSnow;
			case 'desert':
				return Tent;
			default:
				return UtilityPole;
		}
	};

	return {
		travelTheme,
		setTravelTheme,
		mounted,
		Icon: getThemeIcon(),
	};
}
