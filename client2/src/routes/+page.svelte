<script lang="ts">
  import News from '$lib/components/News.svelte';
  import Members from '$lib/components/Members.svelte';
</script>

<div class="grid grid-full grid-no-gutter">
  <div class="col-4 col-m-12">
    <section class="intro-description bg-img c-dt-primary p-a-m">
      <h1 style="font-size:32px;" class="m-b-m c-dt-primary">
        <span class="title-dt">The Human Glycome Project</span>
      </h1>
      <blockquote>
        “ Glycans are directly involved in the pathophysiology of every major
        disease… Additional knowledge from glycoscience will be needed to
        realize the goals of personalized medicine and to take advantage of the
        substantial investments in human genome and proteome research and its
        impact on human health. ”
      </blockquote>
      <cite>— US National Academies, 2012</cite>
      <br />
      <p class="m-b-m">
        The Human Glycome Project addresses this major societal challenge.
      </p>
      <Members />
    </section>
  </div>
  <div class="col-8 col-m-12">
    <div class="grid grid-full p-a-s">
      <div class="col-6 col-s-12">
        <News />
      </div>
      <div class="col-6 col-s-12">
        <h3 class="m-b-m"><span class="title-lt">Promotion</span></h3>

        <article class="bg-lt-primary m-b-m p-a-m">
          <h5 class="m-b-s">The 6th Meeting Highlights</h5>
          <div class="read-format m-b-s">
            <p>
              For the sixth year, leading scientists in glycobiology gathered at
              the Human Glycome Project Meeting to share discoveries and foster
              global collaboration.
            </p>
            <p>
              This short video captures the highlights — engaging lectures,
              inspiring discussions, and the collaborative spirit driving the
              Human Glycome Project forward.
            </p>
            <p>
              Watch the highlights and join us in looking forward to future
              meetings and achievements in advancing glycoscience!
            </p>
          </div>
          <video class="promo-video" controls preload="metadata" playsinline>
            <source src="/assets/videos/sixth-hgp-promo.mp4" type="video/mp4" />
          </video>
        </article>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @import '../lib/scss/_variables.scss';

  .promo-video {
    aspect-ratio: 16 / 9;
    width: 100%;
  }

  .intro-description {
    overflow-y: auto;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: calc((100% - 40px) / 3);

    @media (max-width: 1200px) {
      position: static;
      height: auto;
      width: 100%;
    }
  }

  :global(.support-list) {
    padding: 0;
    list-style: none;
    transition: all 0.3s ease-in-out;
  }

  :global(.support-list > li) {
    border-left: 1px solid $fg-dt-tertiary;
    padding: 2px 2px 2px 10px;
  }
</style>
