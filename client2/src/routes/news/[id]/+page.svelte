<script lang="ts">
  export let data;
</script>

<div class="grid grid-full p-a-m jc-center">
  <div class="col-8 col-m-12">
    <article class="bg-lt-primary p-a-l">
      <div class="m-b-m">
        <a href="/" class="btn">&larr; Back to Home</a>
      </div>

      <h1 class="m-b-s"><span class="title-lt">{data.newsItem.title}</span></h1>
      <p class="ff-secondary m-b-l">
        {new Date(data.newsItem.createdOn).toLocaleDateString()}
      </p>

      {#if data.newsItem.featuredImage}
        <img
          src={data.newsItem.featuredImage}
          alt={data.newsItem.title}
          class="m-b-l"
        />
      {/if}

      <div class="read-format">
        {@html data.newsItem.content || data.newsItem.shortDescription}
      </div>
    </article>
  </div>
</div>

<style>
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
  .content :global(p) {
    margin-bottom: 1rem;
    line-height: 1.6;
  }
</style>
