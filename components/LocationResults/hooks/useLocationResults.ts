import { useState } from 'react';
import { LocationData } from '@/lib/api';

export function useLocationResults(data: LocationData) {
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

	return {
		selectedImageIndex,
		setSelectedImageIndex,
		likedImages,
		toggleLike,
		mainImages,
		galleryImages,
	};
}
