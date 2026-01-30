<script lang="ts">
  import {onMount} from 'svelte';
  import {getCollection} from '$lib/services/db.service';

  let allNews = $state<any[]>([]);
  let displayedCount = $state(3);
  let loading = $state(false);
  let news = $derived(allNews.slice(0, displayedCount));
  let hasMore = $derived(allNews.length > displayedCount);
  let lastVisible = $state<any>(null);

  async function fetchNews() {
    if (loading || allNews.length > 0) return;
    loading = true;

    try {
      // Fetch all items (dataset is small)
      const res = await getCollection('news', {
        limit: 50
      });

      let fetchedItems = res.items;

      // Patch dates for known items with incorrect DB timestamps
      fetchedItems = fetchedItems.map((item: any) => {
        let timestamp = item.createdOn;
        // Handle number or Timestamp object
        if (typeof timestamp !== 'number' && timestamp?.toMillis) {
          timestamp = timestamp.toMillis();
        }

        const id = item.id || '';
        const title = item.title || '';

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

        // If it's one of the lecture videos from 2nd meeting, group them with 2nd meeting
        if (
          title?.toLowerCase().includes('lecture') ||
          title?.includes('Prof')
        ) {
          if (timestamp > new Date('2020-01-01').getTime()) {
            // If it has the wrong 2020 import date
            timestamp = new Date('2019-06-21').getTime(); // Day after 2nd meeting
          }
        }

        return {
          ...item,
          createdOn: timestamp
        };
      });

      // Sort by date descending
      fetchedItems.sort((a: any, b: any) => {
        const dateA = a.createdOn || 0;
        const dateB = b.createdOn || 0;
        return dateB - dateA;
      });

      allNews = fetchedItems;
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    fetchNews();
  });

  function loadMore() {
    displayedCount += 3;
  }
  function formatDate(val: any) {
    if (!val) return '';
    try {
      const date = val.toDate ? val.toDate() : new Date(val);
      return date.toLocaleDateString();
    } catch (e) {
      return '';
    }
  }
</script>

<h3 class="m-b-m"><span class="title-lt">News</span></h3>

{#each news as item}
  <article class="bg-lt-primary m-b-m p-a-m">
    <p>
      <small class="ff-secondary"
        >{formatDate(item.createdOn || item.createdAt)}</small
      >
    </p>
    <a href="/news/{item.url || item.id}">
      <h5 class="m-b-s">{item.title}</h5>
    </a>
    {#if item.shortDescription}
      <p class="m-b-s read-format">
        {@html item.shortDescription}
      </p>
    {/if}
    {#if item.featuredImage}
      <img alt="featured" src={item.featuredImage} />
    {/if}
    <div class="flex jc-center m-t-s">
      <a href="/news/{item.url || item.id}" class="btn"> Read more... </a>
    </div>
  </article>
{/each}

<div class="ta-center">
  <button class="btn" class:loading disabled={!hasMore} onclick={loadMore}>
    {hasMore ? 'Load More' : 'No more news'}
  </button>
</div>

<style lang="scss">
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
</style>
