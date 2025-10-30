'use client';

import { Button } from '@/components/ui/button';
import { useErrorState } from './hooks/useErrorState';

interface ErrorStateProps {
	isNetworkError: boolean;
	isOnline: boolean;
	searchTerm: string | null;
	hasCachedData: boolean;
	onRetry: () => void;
}

export function ErrorState({
	isNetworkError,
	isOnline,
	searchTerm,
	hasCachedData,
	onRetry,
}: ErrorStateProps) {
	const { Icon, iconSize, errorMessage, errorDescription, showRetryButton } = useErrorState({
		isNetworkError,
		isOnline,
		searchTerm,
		hasCachedData,
	});

	return (
		<div className='animate-fade-in-up animation-delay-200'>
			<div className='bg-destructive/10 border border-destructive/20 rounded-xl p-6 text-center space-y-4'>
				<div className='flex flex-col items-center justify-center gap-3'>
					<Icon className={`${iconSize} text-destructive`} />
					<div className='space-y-1'>
						<p className='text-destructive font-medium'>{errorMessage}</p>
						{errorDescription && (
							<p className='text-sm text-muted-foreground'>{errorDescription}</p>
						)}
					</div>
				</div>
				{showRetryButton && (
					<Button
						variant='outline'
						onClick={onRetry}
						className='hover:scale-105 transition-transform duration-300'
					>
						Try Again
					</Button>
				)}
			</div>
		</div>
	);
}
