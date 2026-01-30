import { error } from '@sveltejs/kit';
import { getDocument } from '$lib/services/db.service';

export async function load({ params }) {
    const { id } = params;

    // Check Firestore
    try {
        const doc = await getDocument<any>('news', id);
        if (doc) {
            let timestamp = doc.createdOn;
            if (typeof timestamp !== 'number' && timestamp?.toMillis) {
                timestamp = timestamp.toMillis();
            }

            // Corrections based on actual event dates
            if (id.includes('6th-meeting'))
                timestamp = new Date('2025-10-08').getTime();
            else if (id.includes('5th-meeting'))
                timestamp = new Date('2024-10-23').getTime();
            else if (id.includes('4th-meeting'))
                timestamp = new Date('2023-10-01').getTime();
            else if (id.includes('3rd-meeting'))
                timestamp = new Date('2022-11-02').getTime();
            else if (id.includes('2nd-meeting'))
                timestamp = new Date('2019-06-20').getTime();
            else if (id.includes('official_launch'))
                timestamp = new Date('2018-10-01').getTime();
            else if (id.includes('solving-the-human'))
                timestamp = new Date('2018-10-02').getTime();
            else if (id.includes('importance-of'))
                timestamp = new Date('2018-10-03').getTime();

            return {
                newsItem: {
                    ...doc,
                    createdOn: timestamp
                }
            };
        }
    } catch (e) {
        console.error('Error fetching news item', e);
    }

    // Not found
    error(404, 'News item not found');
}
