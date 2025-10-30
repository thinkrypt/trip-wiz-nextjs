import { useState, useEffect, useRef } from 'react';
import { startTransition } from 'react';
import { useOnlineStatus } from '@/lib/use-online-status';

export function useOfflineBanner() {
	const isOnline = useOnlineStatus();
	const [showOnlineMessage, setShowOnlineMessage] = useState(false);
	const prevIsOnlineRef = useRef(isOnline);

	useEffect(() => {
		const prevIsOnline = prevIsOnlineRef.current;
		prevIsOnlineRef.current = isOnline;

		// Only update state on transitions, not on every render
		if (!prevIsOnline && isOnline) {
			// Transitioned from offline to online - show message
			startTransition(() => {
				setShowOnlineMessage(true);
			});
			const timer = setTimeout(() => {
				startTransition(() => {
					setShowOnlineMessage(false);
				});
			}, 3000);
			return () => clearTimeout(timer);
		} else if (prevIsOnline && !isOnline) {
			// Transitioned from online to offline - hide message
			startTransition(() => {
				setShowOnlineMessage(false);
			});
		}
	}, [isOnline]);

	const shouldShow = !isOnline || showOnlineMessage;

	return {
		isOnline,
		shouldShow,
	};
}
