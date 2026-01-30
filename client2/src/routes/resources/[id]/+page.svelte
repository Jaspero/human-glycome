<script lang="ts">
  export let data;
</script>

<div class="grid jc-center bg-img p-y-m">
  <div class="col-6 col-m-8 col-s-10 col-xs-12">
    <h1 class="c-dt-primary">
      <span class="title-dt">{data.resource.name}</span>
    </h1>
  </div>
</div>

<section class="p-b-l">
  <div class="grid jc-center">
    <div class="col-6 col-m-8 col-s-10 col-xs-12">
      <div class="read-format">
        {@html data.resource.content}
      </div>
    </div>
  </div>
</section>
