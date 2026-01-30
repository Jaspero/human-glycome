<script lang="ts">
  import {db} from '$lib/firebase';
  import {collection, addDoc} from 'firebase/firestore';

  export let data;

  let name = '';
  let email = '';
  let permission = false;
  let loading = false;
  let message = '';

  async function handleSubmit() {
    if (!name || !email || !permission) return;

    loading = true;
    message = '';

    try {
      await addDoc(collection(db, 'contact'), {
        name,
        email,
        permission,
        createdAt: new Date()
      });
      message = 'Submission sent. Thank you.';
      name = '';
      email = '';
      permission = false;
    } catch (e) {
      console.error(e);
      message = 'An error occurred. Please try again later.';
    } finally {
      loading = false;
    }
  }
</script>

<div class="grid jc-center bg-img p-y-m">
  <div class="col-6 col-m-8 col-s-10 col-xs-12">
    <h1 class="c-dt-primary"><span class="title-dt">Members</span></h1>
  </div>
</div>

<section class="p-b-l">
  <div class="grid jc-center">
    <div class="col-6 col-m-8 col-s-10 col-xs-12">
      <div class="read-format">
        <br />
        <p>
          Here you will find an alphabetical list of current full members and
          associate members of Human Glycome Project. If you would like to
          participate in the project or pledge the resources, apply for the
          membership.
        </p>

        <h5>Full Members</h5>
        <ul>
          {#each data.fullMembers as member}
            <li>
              <a href={member.link} target="_blank" rel="noopener">
                {member.title || ''}
                {member.fullName || member.name || ''}
              </a>
            </li>
          {/each}
        </ul>
        <p>
          Each Full member of the Human Glycome Project is expected to be an
          independent principal investigator whose laboratory will contribute to
          the goals of Human Glycome Project by leading an independently funded
          project that will result in depositing data in the Human Glycome
          Project standardized repositories. Full Members will also have access
          to specific shared materials for analyses in multiple institutions.
        </p>

        <h5>Associate Members</h5>
        <ul>
          {#each data.associateMembers as member}
            <li>
              <a href={member.link} target="_blank" rel="noopener"
                >{member.name}</a
              >
            </li>
          {/each}
        </ul>
        <p>
          Any researcher, company or an institution that shares vision of the
          HGP can become an associate member by pledging resources or services
          to the glycoscience community, or by participating in education and
          dissemination activities.
        </p>
        <p>
          Interested candidates should send an email to the Human Glycome
          Project Steering Committee at <a
            href="mailto:info@human-glycome.org?Subject=Associate%20member%20request"
            target="_top">info@human-glycome.org</a
          >.
        </p>

        <hr class="m-y-l" />

        <form
          class="bg-lt-primary p-a-m"
          on:submit|preventDefault={handleSubmit}
        >
          <h5>Mailing List</h5>
          <p>
            Researchers, journalists, educators and other individuals interested
            in following and sharing the latest scientific advances and news
            related to Human Glycome Project can sign up for our mailing list.
          </p>

          <div class="m-b-m">
            <input
              type="text"
              placeholder="Name"
              bind:value={name}
              required
              class="w-full p-a-s"
            />
          </div>

          <div class="m-b-m">
            <input
              type="email"
              placeholder="Email"
              bind:value={email}
              required
              class="w-full p-a-s"
            />
          </div>

          <div class="m-b-m flex ai-start fw-nowrap">
            <input
              type="checkbox"
              id="permission"
              bind:checked={permission}
              required
              class="m-r-s flex-shrink-0"
              style="margin-top: 4px;"
            />
            <label for="permission" class="fs-xs">
              I have read and agree to The Human Glycome Project <a
                href="/privacy-policy"
                class="c-primary">Privacy Policy</a
              >. I give my consent to The Human Glycome Project to store my
              email and periodically send me news.
            </label>
          </div>

          {#if message}
            <p
              class="m-b-m"
              class:c-error={message.includes('error')}
              class:c-success={!message.includes('error')}
            >
              {message}
            </p>
          {/if}

          <div class="ta-center">
            <button
              class="btn"
              type="submit"
              disabled={loading || !name || !email || !permission}
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>

<style lang="scss">
  h5 {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  ul {
    list-style: disc;
    padding-left: 1.5rem;
    margin-bottom: 1.5rem;
    li {
      margin-bottom: 0.5rem;
    }
  }
  a {
    color: dodgerblue;
    text-decoration: underline;
  }
  input[type='text'],
  input[type='email'] {
    border: 1px solid #ccc;
    border-radius: 4px;
    background: white;
  }
  .c-primary {
    color: dodgerblue;
  }
  .c-error {
    color: red;
  }
  .c-success {
    color: green;
  }
  .fs-xs {
    font-size: 0.8rem;
  }
  .flex-shrink-0 {
    flex-shrink: 0;
  }
</style>
