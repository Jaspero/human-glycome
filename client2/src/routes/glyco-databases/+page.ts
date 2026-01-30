import {getCollection} from '$lib/services/db.service';

export async function load() {
  const {items: glycoDatabases} = await getCollection('glyco-databases');

  return {
    glycoDatabases
  };
}
