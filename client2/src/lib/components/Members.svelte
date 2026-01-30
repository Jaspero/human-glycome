<script lang="ts">
  import {onMount, onDestroy} from 'svelte';
  import {getCollection} from '$lib/services/db.service';

  let fullMem = $state<any[]>([]);
  let assMem = $state<any[]>([]);
  let showFullMembers = $state(true);
  let interval: any;

  onMount(async () => {
    // Fetch members
    const fullRes = await getCollection('full-members', {limit: 5});
    fullMem = fullRes.items;

    const assRes = await getCollection('associate-members');
    assMem = assRes.items;

    interval = setInterval(() => {
      showFullMembers = !showFullMembers;
    }, 60000);
  });

  onDestroy(() => {
    if (interval) clearInterval(interval);
  });
</script>

<h5 class="m-b-m c-dt-primary">
  <a class="title-dt" href="/members">
    {showFullMembers ? 'Full Members' : 'Associate Members'}
  </a>
</h5>

<ul class="support-list m-b-m">
  {#if showFullMembers}
    {#each fullMem as item}
      <li>
        <a class="link" href={item.link} target="_blank" rel="noopener"
          >{item.fullName}</a
        >
      </li>
    {/each}
  {:else}
    {#each assMem as item}
      <li>
        <a class="link" href={item.link} target="_blank" rel="noopener"
          >{item.name}</a
        >
      </li>
    {/each}
  {/if}
</ul>

<style lang="scss">
  .support-list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 0.5rem;
    }
  }
</style>
