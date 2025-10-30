'use client';

import { Loader2 } from 'lucide-react';

export function LoadingState() {
	return (
		<div className='flex flex-col items-center justify-center min-h-[60vh] space-y-6 animate-fade-in'>
			<div className='relative'>
				<div className='absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse' />
				<div className='relative bg-primary/10 rounded-full p-6'>
					<Loader2 className='h-12 w-12 text-primary animate-spin' />
				</div>
			</div>
			<div className='text-center space-y-2'>
				<h3 className='text-xl font-semibold'>Discovering amazing places...</h3>
				<p className='text-muted-foreground'>
					Finding the best images and details for your destination
				</p>
			</div>
			<div className='flex gap-2'>
				<div
					className='w-2 h-2 bg-primary rounded-full animate-bounce'
					style={{ animationDelay: '0ms' }}
				/>
				<div
					className='w-2 h-2 bg-primary rounded-full animate-bounce'
					style={{ animationDelay: '150ms' }}
				/>
				<div
					className='w-2 h-2 bg-primary rounded-full animate-bounce'
					style={{ animationDelay: '300ms' }}
				/>
			</div>
		</div>
	);
}
