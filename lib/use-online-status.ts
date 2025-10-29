'use client';

import { useState, useEffect } from 'react';

export function useOnlineStatus() {
	const [isOnline, setIsOnline] = useState(() => {
		if (typeof window !== 'undefined') {
			return navigator.onLine;
		}
		return true;
	});

	useEffect(() => {
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
