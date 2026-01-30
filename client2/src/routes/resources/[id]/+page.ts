import { error } from '@sveltejs/kit';
import { getDocument } from '$lib/services/db.service';

export async function load({ params }) {
    const { id } = params;

    try {
        const resource = await getDocument('resources', id);
        if (resource) {
            return {
                resource
            };
        }
    } catch (e) {
        console.error('Error fetching resource', e);
    }

    error(404, 'Resource not found');
}
