<script lang="ts">
  export let data;
</script>

<div class="grid jc-center bg-img p-y-m">
  <div class="col-6 col-m-8 col-s-10 col-xs-12">
    <h1 class="c-dt-primary"><span class="title-dt">Projects</span></h1>
  </div>
</div>

<section class="p-b-l">
  <div class="grid jc-center">
    <div class="col-6 col-m-8 col-s-10 col-xs-12" style="overflow-y: auto">
      <div class="read-format">
        <br />
        <p>
          Individual, independently funded, projects that contribute to the
          goals of the Human Glycome Project are:
        </p>

        {#each data.projects as group}
          <article>
            <h6>{group.category}</h6>
            <table>
              <thead>
                <tr>
                  <th>Short Name</th>
                  <th>Description</th>
                  <th>Coordinating Institution</th>
                </tr>
              </thead>
              <tbody>
                {#each group.projects as project}
                  <tr>
                    <td>{project.shortName || project.title}</td>
                    <td>{project.description || project.shortDescription}</td>
                    <td>{project.coordinatingInstitution || ''}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
            <br />
          </article>
        {/each}

        <h6>
          To include your projects in projects of the Human Glycome Project,
          please send short description of the project to the Steering Committee
          of the Human Glycome Project at
          <a
            href="mailto:info@human-glycome.org?Subject=Project%20Addition%20Request"
            target="_top">info@human-glycome.org</a
          >
        </h6>
      </div>
    </div>
  </div>
</section>
