import {getCollection} from '$lib/services/db.service';

export async function load() {
  const {items: education} = await getCollection('education', {
    orderByField: 'createdAt',
    orderDirection: 'desc'
  });

  return {
    education
  };
}
