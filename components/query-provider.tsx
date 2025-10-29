'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export function QueryProvider({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						// Cache data for 5 minutes
						staleTime: 1000 * 60 * 5,
						// Keep data in cache for 10 minutes after component unmounts
						gcTime: 1000 * 60 * 10,
						// Retry failed requests
						retry: 2,
						// Retry delay
						retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
						// Refetch on window focus (for fresh data)
						refetchOnWindowFocus: false,
						// Refetch on reconnect
						refetchOnReconnect: true,
					},
				},
			})
	);

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			{process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
		</QueryClientProvider>
	);
}
