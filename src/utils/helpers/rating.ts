import { CUSTOM_PLACE_RATINGS } from '@/data/customRatings';
import type { NotionPlace } from '@/types';

const normalize = (value?: string) =>
    (value ?? '').replace(/\s+/g, '').toLowerCase();

const ratingsById = new Map<string, number>();
const ratingsByName = new Map<string, number>();

CUSTOM_PLACE_RATINGS.forEach(({ id, name, rating }) => {
    if (typeof rating !== 'number') return;
    if (id) {
        ratingsById.set(id, rating);
    }
    if (name) {
        ratingsByName.set(normalize(name), rating);
    }
});

export function getCustomRating(place: Pick<NotionPlace, 'id' | 'name'>): number | null {
    if (place.id && ratingsById.has(place.id)) {
        return ratingsById.get(place.id)!;
    }

    const normalizedName = normalize(place.name);
    if (normalizedName && ratingsByName.has(normalizedName)) {
        return ratingsByName.get(normalizedName)!;
    }

    return null;
}

export function getEffectiveRating(place: NotionPlace): number | null {
    const custom = getCustomRating(place);
    if (custom !== null && custom !== undefined) {
        return custom;
    }

    return typeof place.score === 'number' ? place.score : null;
}

