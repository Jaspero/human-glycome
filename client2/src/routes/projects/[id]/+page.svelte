<script lang="ts">
  export let data;
</script>

<div class="grid grid-full p-a-m jc-center">
  <div class="col-8 col-m-12">
    <article class="bg-lt-primary p-a-l">
      <div class="m-b-m">
        <a href="/projects" class="btn">&larr; Back to Projects</a>
      </div>

      <h1 class="m-b-m"><span class="title-lt">{data.project.title}</span></h1>

      {#if data.project.image}
        <img
          src={data.project.image}
          alt={data.project.title}
          class="m-b-l w-full"
        />
      {/if}

      <div class="read-format">
        {@html data.project.content || data.project.shortDescription}
      </div>

      <div class="m-t-l">
        <a href="/projects" class="btn">Back to Projects</a>
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
</style>
