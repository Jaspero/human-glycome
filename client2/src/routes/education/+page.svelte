<script lang="ts">
  export let data;

  function formatDate(val: any) {
    if (!val) return '';
    try {
      const date = val.toDate ? val.toDate() : new Date(val);
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return '';
    }
  }
</script>

<div class="grid jc-center bg-img p-y-m">
  <div class="col-6 col-m-8 col-s-10 col-xs-12">
    <h1 class="c-dt-primary"><span class="title-dt">Education</span></h1>
  </div>
</div>

<section class="p-b-l">
  <div class="grid jc-center">
    <div class="col-6 col-m-8 col-s-10 col-xs-12">
      {#each data.education as item}
        <div class="read-format m-b-l">
          <h4>{item.title}</h4>
          <p><small>{formatDate(item.createdAt)}</small></p>
          <p>{item.shortDescription || ''}</p>
          <p>
            <a href="/education/{item.id}" class="c-primary td-underline"
              >Read more</a
            >
          </p>
          <hr class="m-y-m" />
        </div>
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
  h4 {
    margin-bottom: 0.5rem;
  }
</style>
