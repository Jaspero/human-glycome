<script lang="ts">
  export let data;
</script>

<div class="grid jc-center bg-img p-y-m">
  <div class="col-6 col-m-8 col-s-10 col-xs-12">
    <h1 class="c-dt-primary"><span class="title-dt">Resources</span></h1>
  </div>
</div>

<section class="p-b-l">
  <div class="grid jc-center">
    <div class="col-6 col-m-8 col-s-10 col-xs-12">
      {#each data.resources as resource}
        <h6 class="m-b-s">
          <a
            href="/resources/{resource.url || resource.id}"
            class="p-y-xs c-primary td-underline"
          >
            {resource.name}
          </a>
        </h6>
        <hr class="m-y-m" />
      {/each}
    </div>
  </div>
</section>

<style lang="scss">
  .c-primary {
    color: dodgerblue;
  }
  .td-underline {
    text-decoration: underline;
  }
</style>
