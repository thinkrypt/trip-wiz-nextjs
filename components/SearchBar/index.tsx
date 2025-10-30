'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSearchBar } from './hooks/useSearchBar';

interface SearchBarProps {
	searchQuery: string;
	onSearchQueryChange: (value: string) => void;
	onSubmit: (e: React.FormEvent) => void;
	isLoading: boolean;
	isOnline: boolean;
}

export function SearchBar({
	searchQuery,
	onSearchQueryChange,
	onSubmit,
	isLoading,
	isOnline,
}: SearchBarProps) {
	const { buttonText, buttonDisabled, buttonTitle } = useSearchBar({
		isLoading,
		isOnline,
	});

	return (
		<form onSubmit={onSubmit} className='w-full animate-fade-in-up animation-delay-300'>
			<div className='relative group'>
				<div className='absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
				<div className='relative flex items-center gap-2 bg-card border border-border rounded-xl p-2 shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-300'>
					<div className='flex-1 flex items-center gap-3 px-4'>
						<Search className='h-5 w-5 text-muted-foreground shrink-0 group-hover:text-primary transition-colors duration-300' />
						<Input
							type='text'
							placeholder='Where do you want to go?'
							value={searchQuery}
							onChange={(e) => onSearchQueryChange(e.target.value)}
							className='border-0 bg-transparent text-lg focus-visible:ring-0 focus-visible:ring-offset-0 h-auto py-3 px-3 placeholder:text-muted-foreground'
						/>
					</div>
					<div className='flex items-center gap-2 pr-2'>
						<Button
							type='submit'
							size='lg'
							className='h-10 px-6 shrink-0 hover:scale-105 transition-transform duration-300'
							disabled={buttonDisabled}
							title={buttonTitle}
						>
							<Search className='h-4 w-4 mr-2' />
							{buttonText}
						</Button>
					</div>
				</div>
			</div>
		</form>
	);
}
