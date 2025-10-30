'use client';

import { useState, useEffect } from 'react';

export function useOnlineStatus() {
	// Start with true to avoid hydration mismatch
	// Will be updated to actual value after mount
	const [isOnline, setIsOnline] = useState(true);

	useEffect(() => {
		// Set initial online status after mount to avoid hydration mismatch
		// Use requestAnimationFrame to defer update and avoid cascading renders
		requestAnimationFrame(() => {
			setIsOnline(navigator.onLine);
		});

		const handleOnline = () => setIsOnline(true);
		const handleOffline = () => setIsOnline(false);

		window.addEventListener('online', handleOnline);
		window.addEventListener('offline', handleOffline);

		return () => {
			window.removeEventListener('online', handleOnline);
			window.removeEventListener('offline', handleOffline);
		};
	}, []);

	return isOnline;
}
