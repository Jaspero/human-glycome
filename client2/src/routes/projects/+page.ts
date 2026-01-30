import {getCollection} from '$lib/services/db.service';

export async function load() {
  const {items: projects} = await getCollection('projects');

  // Group projects by category
  const groupedProjects = projects.reduce((acc: any[], cur: any) => {
    const index = acc.findIndex(item => item.category === cur.category);

    if (index === -1) {
      acc.push({
        category: cur.category,
        projects: [cur]
      });
    } else {
      acc[index].projects.push(cur);
    }
    return acc;
  }, []);

  return {
    projects: groupedProjects
  };
}
