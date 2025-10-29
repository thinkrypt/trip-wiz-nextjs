'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MapPin, Globe, Users, ArrowLeft, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LocationData } from '@/lib/api';
import { cn } from '@/lib/utils';

interface LocationResultsProps {
	data: LocationData;
	onBack: () => void;
}

export function LocationResults({ data, onBack }: LocationResultsProps) {
	const [selectedImageIndex, setSelectedImageIndex] = useState(0);
	const [likedImages, setLikedImages] = useState<Set<string>>(new Set());

	const toggleLike = (imageId: string) => {
		setLikedImages((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(imageId)) {
				newSet.delete(imageId);
			} else {
				newSet.add(imageId);
			}
			return newSet;
		});
	};

	const mainImages = data.images.slice(0, 5);
	const galleryImages = data.images.slice(5);

	return (
		<div className='min-h-screen bg-background'>
			{/* Hero Image Section */}
			<div className='relative h-[60vh] min-h-[500px] overflow-hidden'>
				<div className='absolute inset-0'>
					<Image
						src={data.images[selectedImageIndex]?.url || data.images[0]?.url}
						alt={data.location.name}
						fill
						className='object-cover transition-opacity duration-700 ease-in-out'
						priority
						sizes='100vw'
					/>
					<div className='absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent' />
				</div>

				{/* Navigation */}
				<div className='relative z-10 container mx-auto px-4 pt-6'>
					<Button
						variant='secondary'
						size='sm'
						onClick={onBack}
						className='mb-4 backdrop-blur-sm bg-background/80 hover:bg-background/90 transition-all duration-300 hover:scale-105'
					>
						<ArrowLeft className='h-4 w-4 mr-2' />
						Back to Search
					</Button>
				</div>

				{/* Image Thumbnails */}
				<div className='absolute bottom-32 left-0 right-0 z-10 container mx-auto px-4'>
					<div className='flex gap-2 overflow-x-auto pb-2 scrollbar-hide'>
						{mainImages.map((image, index) => (
							<button
								key={image.id}
								onClick={() => setSelectedImageIndex(index)}
								className={cn(
									'relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-110',
									selectedImageIndex === index
										? 'border-primary shadow-lg shadow-primary/50'
										: 'border-transparent opacity-70 hover:opacity-100'
								)}
							>
								<Image
									src={image.thumbnail}
									alt={`${data.location.name} ${index + 1}`}
									fill
									className='object-cover'
									sizes='80px'
								/>
							</button>
						))}
					</div>
				</div>

				{/* Location Info Overlay */}
				<div className='absolute bottom-0 left-0 right-0 z-10 container mx-auto px-4 pb-6'>
					<div className='space-y-2 animate-fade-in-up'>
						<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-foreground drop-shadow-lg'>
							{data.location.name}
						</h1>
						<div className='flex items-center gap-2 text-lg text-foreground/90 drop-shadow-md'>
							<MapPin className='h-5 w-5' />
							<span>
								{data.location.region && `${data.location.region}, `}
								{data.location.country}
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className='container mx-auto px-4 py-8'>
				{/* Action Buttons */}
				<div className='flex gap-3 mb-8 animate-fade-in-up animation-delay-200'>
					<Button
						variant='outline'
						size='lg'
						className='flex-1 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105'
					>
						<Heart className='h-4 w-4 mr-2' />
						Save Trip
					</Button>
					<Button
						variant='outline'
						size='lg'
						className='flex-1 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105'
					>
						<Share2 className='h-4 w-4 mr-2' />
						Share
					</Button>
				</div>

				{/* Description */}
				{data.location.description && (
					<div className='mb-12 animate-fade-in-up animation-delay-300'>
						<h2 className='text-2xl font-bold mb-4'>About {data.location.name}</h2>
						<p className='text-muted-foreground text-lg leading-relaxed max-w-3xl'>
							{data.location.description}
						</p>
						{data.location.wikipediaUrl && (
							<a
								href={data.location.wikipediaUrl}
								target='_blank'
								rel='noopener noreferrer'
								className='inline-flex items-center gap-2 mt-4 text-primary hover:text-primary/80 transition-colors'
							>
								<Globe className='h-4 w-4' />
								Learn more on Wikipedia
							</a>
						)}
					</div>
				)}

				{/* Image Gallery */}
				<div className='mb-12 animate-fade-in-up animation-delay-400'>
					<h2 className='text-2xl font-bold mb-6'>Photo Gallery</h2>
					<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
						{galleryImages.map((image, index) => (
							<div
								key={image.id}
								className='group relative aspect-square rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300'
								style={{ animationDelay: `${index * 50}ms` }}
							>
								<Image
									src={image.url}
									alt={`${data.location.name} gallery ${index + 1}`}
									fill
									className='object-cover'
									sizes='(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
								/>
								<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
								<div className='absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
									<div className='flex items-center justify-between'>
										<p className='text-white text-sm truncate'>
											{image.photographer}
										</p>
										<button
											onClick={(e) => {
												e.stopPropagation();
												toggleLike(image.id);
											}}
											className='p-1.5 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors'
										>
											<Heart
												className={cn(
													'h-4 w-4 transition-colors',
													likedImages.has(image.id)
														? 'fill-red-500 text-red-500'
														: 'text-white'
												)}
											/>
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Info Cards */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up animation-delay-500'>
					<div className='bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:scale-105 transition-all duration-300'>
						<div className='flex items-center gap-3 mb-2'>
							<MapPin className='h-5 w-5 text-primary' />
							<h3 className='font-semibold'>Location</h3>
						</div>
						<p className='text-muted-foreground'>
							{data.location.region && `${data.location.region}, `}
							{data.location.country}
						</p>
					</div>

					{data.location.population && (
						<div className='bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:scale-105 transition-all duration-300'>
							<div className='flex items-center gap-3 mb-2'>
								<Users className='h-5 w-5 text-primary' />
								<h3 className='font-semibold'>Population</h3>
							</div>
							<p className='text-muted-foreground'>
								{data.location.population.toLocaleString()}
							</p>
						</div>
					)}

					<div className='bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:scale-105 transition-all duration-300'>
						<div className='flex items-center gap-3 mb-2'>
							<Globe className='h-5 w-5 text-primary' />
							<h3 className='font-semibold'>Discover</h3>
						</div>
						<p className='text-muted-foreground'>
							Explore {data.location.name} and its unique attractions
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
