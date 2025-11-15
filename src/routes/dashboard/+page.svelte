<script lang="ts">
import { getSession } from "$lib/api/auth.remote";
import {
	getVideoInformations,
	getVideosInformations,
} from "$lib/api/video.remote";
import { signOut } from "$lib/auth-client";

const session = await getSession();
</script>

<div class="navbar bg-base-100 shadow-sm">
    <div class="flex-1">
        <a href="/dashboard" class="btn btn-ghost text-xl"
            >Gestionnaire de vidéos</a
        >
    </div>
    <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
            <li>
                <details>
                    <summary>{session?.user.name}</summary>
                    <ul class="bg-base-100 rounded-t-none p-2">
                        <li><a href="/admin">administration</a></li>
                        <li>
                            <a
                                class="link link-error"
                                href="/"
                                onclick={async () => await signOut()}
                                >Déconnexion</a
                            >
                        </li>
                    </ul>
                </details>
            </li>
        </ul>
    </div>
</div>
<div class="mt-4 p-8">
    <div class=" flex justify-end">
        <a class="btn btn-primary" href="/videos/create">Ajouter</a>
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
            {#each await getVideosInformations() as { id, live, title, subtitle, status }}
                <tr>
                    <td>{live}</td>
                    <td>{title}</td>
                    <td>{subtitle}</td>
                    <td>
                        {#if status === "en cours"}
                            <span class="badge badge-sm badge-warning"
                                >{status}</span
                            >
                        {:else if status === "terminée"}
                            <span class="badge badge-sm badge-success">
                                {status}
                            </span>
                        {:else if status === "à faire"}
                            <span class="badge badge-sm badge-error"
                                >{status}</span
                            >
                        {:else}
                            <span class="badge badge-sm">(N/a)</span>
                        {/if}
                    </td>
                    <td>
                        <a class="btn btn-sm" href="/videos/{id}">détails</a>
                    </td>
                </tr>{/each}
        </tbody>
    </table>
</div>
