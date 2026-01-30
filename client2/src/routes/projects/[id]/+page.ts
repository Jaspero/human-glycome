import { error } from '@sveltejs/kit';
import { getDocument } from '$lib/services/db.service';

export async function load({ params }) {
    const { id } = params;

    try {
        const project = await getDocument('projects', id);
        if (project) {
            return {
                project
            };
        }
    } catch (e) {
        console.error('Error fetching project', e);
    }

    error(404, 'Project not found');
}
