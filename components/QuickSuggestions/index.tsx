'use client';

import { useQuickSuggestions } from './hooks/useQuickSuggestions';

interface QuickSuggestionsProps {
	onDestinationClick: (destination: string) => void;
	hidden?: boolean;
}

export function QuickSuggestions({ onDestinationClick, hidden = false }: QuickSuggestionsProps) {
	const { destinations } = useQuickSuggestions();

	if (hidden) {
		return null;
	}

	return (
		<div className='flex flex-wrap items-center justify-center gap-3 text-sm animate-fade-in-up animation-delay-400'>
			<span className='text-muted-foreground'>Popular destinations:</span>
			{destinations.map((destination, index) => (
				<button
					key={destination}
					onClick={() => onDestinationClick(destination)}
					className='px-4 py-2 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-all duration-300 hover:scale-110 hover:shadow-md'
					style={{ animationDelay: `${index * 50}ms` }}
				>
					{destination}
				</button>
			))}
		</div>
	);
}
