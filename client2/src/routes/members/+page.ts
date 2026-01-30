import {getCollection} from '$lib/services/db.service';

export async function load() {
  const [fullMembers, associateMembers] = await Promise.all([
    getCollection('full-members'),
    getCollection('associate-members')
  ]);

  return {
    fullMembers: fullMembers.items,
    associateMembers: associateMembers.items
  };
}
