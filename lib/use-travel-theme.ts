'use client';

import { useState, useEffect, useSyncExternalStore, useRef } from 'react';

export type TravelTheme = 'forest' | 'mountain' | 'desert' | null;

const TRAVEL_THEME_STORAGE_KEY = 'travel-theme';

// Store for theme updates (used for notifying subscribers when we update localStorage)
const themeStore: {
	getSnapshot: () => TravelTheme;
	subscribe: (callback: () => void) => () => void;
	notify: () => void;
} = {
	getSnapshot: () => {
		if (typeof window === 'undefined') return null;
		const stored = localStorage.getItem(TRAVEL_THEME_STORAGE_KEY) as TravelTheme;
		if (stored && ['forest', 'mountain', 'desert'].includes(stored)) {
			return stored;
		}
		return null;
	},
	subscribe: (callback: () => void) => {
		if (typeof window === 'undefined') return () => {};
		// Listen to storage events from other tabs
		window.addEventListener('storage', callback);
		// Also listen to custom events for same-tab updates
		window.addEventListener('travel-theme-change', callback);
		return () => {
			window.removeEventListener('storage', callback);
			window.removeEventListener('travel-theme-change', callback);
		};
	},
	notify: () => {
		if (typeof window === 'undefined') return;
		window.dispatchEvent(new Event('travel-theme-change'));
	},
};

export function useTravelTheme() {
	// Use useSyncExternalStore to sync with localStorage and avoid hydration mismatch
	const travelTheme = useSyncExternalStore(
		themeStore.subscribe,
		themeStore.getSnapshot,
		() => null // Server snapshot (always null to avoid hydration mismatch)
	);
	// Use ref to track mount status without triggering re-renders during effect
	// This avoids the linter warning while still preventing hydration mismatches
	const mountedRef = useRef(false);
	const [mounted, setMounted] = useState(false);

	// Set mounted state after mount to avoid hydration mismatch
	// Using startTransition to batch the update and avoid cascading renders
	useEffect(() => {
		if (!mountedRef.current) {
			mountedRef.current = true;
			// Use flushSync alternative: batch update in next tick
			requestAnimationFrame(() => {
				setMounted(true);
			});
		}
	}, []);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const html = document.documentElement;

		// Remove all travel theme classes
		html.classList.remove('forest', 'mountain', 'desert');

		// Add the current travel theme class
		if (travelTheme) {
			html.classList.add(travelTheme);
		}
	}, [travelTheme]);

	const setTravelTheme = (theme: TravelTheme) => {
		if (typeof window === 'undefined') return;
		// Update localStorage
		if (theme) {
			localStorage.setItem(TRAVEL_THEME_STORAGE_KEY, theme);
		} else {
			localStorage.removeItem(TRAVEL_THEME_STORAGE_KEY);
		}
		// Notify subscribers (triggers re-render via useSyncExternalStore)
		themeStore.notify();
	};

	return { travelTheme, setTravelTheme, mounted };
}
