<script lang="ts">
import {
	getVideoInformations,
	updateStatus,
	updateVideoInformations,
} from "$lib/api/video.remote";
import { signOut, useSession } from "$lib/auth-client";

const session = useSession();
const { params } = $props();
const videoInformations = $derived(await getVideoInformations(params.video_id));
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
                    <summary>{$session.data?.user.name}</summary>
                    <ul class="bg-base-100 rounded-t-none p-2">
                        <li><a href="/admin">administration</a></li>
                        <li>
                            <a
                                class="link link-error"
                                href="/"
                                onclick={() => signOut()}>Déconnexion</a
                            >
                        </li>
                    </ul>
                </details>
            </li>
        </ul>
    </div>
</div>

<div class="">
    <div class="mt-4 p-8">
        <div class="flex justify-end">
            {#if videoInformations.status === "à faire"}
                <button
                    class="btn btn-primary"
                    onclick={() =>
                        updateStatus({
                            id: String(videoInformations.id),
                            newStatus: "en cours",
                        }).updates(getVideoInformations(params.video_id))}
                    >Commencer</button
                >
            {:else if videoInformations.status === "en cours"}
                <button
                    class="btn btn-warning"
                    onclick={() =>
                        updateStatus({
                            id: params.video_id,
                            newStatus: "terminée",
                        }).updates(getVideoInformations(params.video_id))}
                    >Finaliser</button
                >
            {:else if videoInformations.status === "terminée"}
                <div class="space-x-2">
                    <span class="badge badge-success badge-outline"
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-[1em]"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                            />
                        </svg>
                        Finalisée</span
                    >
                </div>
            {/if}
        </div>
    </div>

    <div class="card w-full max-w-lg bg-base-300 mx-auto p-4">
        <div class="card-body">
            <h2 class="card-title">Editer les informations du clip</h2>
            <form {...updateVideoInformations} class="space-y-6 mt-4">
                <input
                    {...updateVideoInformations.fields.id.as(
                        "hidden",
                        videoInformations.id.toString(),
                    )}
                />
                <label class="input w-full">
                    <span class="label">Live</span>
                    <input
                        {...updateVideoInformations.fields.live.as("text")}
                        value={videoInformations.live}
                    />
                </label>
                <label class="input w-full">
                    <span class="label">Texte</span>
                    <input
                        {...updateVideoInformations.fields.title.as("text")}
                        value={videoInformations.title}
                    />
                </label>
                <label class="input w-full">
                    <span class="label">Sous-titre</span>
                    <input
                        {...updateVideoInformations.fields.subtitle.as("text")}
                        value={videoInformations.subtitle}
                    />
                </label>
                <label class="input w-full">
                    <span class="label">Question</span>
                    <input
                        {...updateVideoInformations.fields.after.as("number")}
                        value={videoInformations.after}
                    />
                </label>
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Notes</legend>
                    <textarea
                        {...updateVideoInformations.fields.notes.as("text")}
                        value={videoInformations.notes}
                        class="textarea w-full max-h-24"
                        maxlength="255"
                    ></textarea>
                    <div class="label">Optional</div>
                </fieldset>
                {#each updateVideoInformations.fields.allIssues() as issue}
                    <p>{issue.message}</p>{/each}
                <button class="btn btn-success w-full">Modifier</button>
            </form>
        </div>
    </div>
</div>
