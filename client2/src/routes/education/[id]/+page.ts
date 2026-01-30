import { error } from '@sveltejs/kit';
import { getDocument } from '$lib/services/db.service';

export async function load({ params }) {
    const { id } = params;

    try {
        const education = await getDocument('education', id);
        if (education) {
            return {
                education
            };
        }
    } catch (e) {
        console.error('Error fetching education item', e);
    }

    error(404, 'Education item not found');
}
