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
    <h1 class="c-dt-primary">
      <span class="title-dt">{data.education.title}</span>
    </h1>
  </div>
</div>

<section class="p-b-l">
  <div class="grid jc-center">
    <div class="col-6 col-m-8 col-s-10 col-xs-12">
      <div class="read-format">
        <p><small>{formatDate(data.education.createdAt)}</small></p>
        <div class="m-t-m">
          {@html data.education.content ||
            data.education.shortDescription ||
            ''}
        </div>

        <div class="m-t-xl">
          <a href="/education" class="btn">&larr; Back to Education</a>
        </div>
      </div>
    </div>
  </div>
</section>
