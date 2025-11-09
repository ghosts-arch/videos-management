<script lang="ts">
    import { getVideoInformations } from "$lib/api/video.remote";
    import { getUser } from "$lib/api/auth.remote";
    const user = await getUser();
</script>

<div class="mt-4 p-8">
    <div class=" flex justify-end">
        <a class="btn btn-primary" href="/questions/create">Ajouter</a>
    </div>

    <table class="table">
        <thead>
            <tr>
                <th>live</th>
                <th>titre</th>
                <th>sous-titre</th>
                <th>status</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {#each await getVideoInformations() as { live, title, subtitle }}
                <tr>
                    <td>{live}</td>
                    <td>{title}</td>
                    <td>{subtitle}</td>
                    <td
                        ><span class="badge badge-success badge-sm"
                            >terminée</span
                        ></td
                    >
                    <td>
                        <button class="btn btn-sm">détails</button>
                    </td>
                </tr>{/each}
        </tbody>
    </table>
</div>
