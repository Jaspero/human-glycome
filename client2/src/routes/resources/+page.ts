import {getCollection} from '$lib/services/db.service';

export async function load() {
  const {items: resources} = await getCollection('resources');

  return {
    resources
  };
}
