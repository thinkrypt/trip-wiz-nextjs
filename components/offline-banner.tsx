'use client';

import { WifiOff, Wifi } from 'lucide-react';
import { useOnlineStatus } from '@/lib/use-online-status';
import { useEffect, useState, useRef, startTransition } from 'react';

export function OfflineBanner() {
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

	if (isOnline && !showOnlineMessage) {
		return null;
	}

	return (
		<div
			className={`fixed top-16 left-0 right-0 z-50 transition-transform duration-300 ${
				isOnline ? 'translate-y-0' : 'translate-y-0'
			}`}
		>
			<div
				className={`container mx-auto px-4 py-3 ${
					isOnline
						? 'bg-green-500/90 dark:bg-green-600/90 text-white'
						: 'bg-yellow-500/90 dark:bg-yellow-600/90 text-white'
				} backdrop-blur-sm shadow-lg`}
			>
				<div className='flex items-center justify-center gap-2 text-sm font-medium'>
					{isOnline ? (
						<>
							<Wifi className='h-4 w-4' />
							<span>Connection restored! You&apos;re back online.</span>
						</>
					) : (
						<>
							<WifiOff className='h-4 w-4' />
							<span>You&apos;re offline. Showing cached data when available.</span>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
