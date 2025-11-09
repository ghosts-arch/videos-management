<script lang="ts">
    import { createVideoInformations } from "$lib/api/video.remote";
</script>

<div class="flex min-h-screen w-full items-center justify-center p-6">
    <div class="card w-full max-w-lg bg-base-300 mx-auto p-4">
        <div class="card-body">
            <a href="/" class="link mb-4">Retour</a>
            <h2 class="card-title">Nouvelle Question</h2>
            <form {...createVideoInformations} class="space-y-6 mt-4">
                <label class="input w-full">
                    <span class="label">Live</span>
                    <input
                        {...createVideoInformations.fields.live.as("text")}
                        required
                    />
                </label>
                <label class="input w-full">
                    <span class="label">Texte</span>
                    <input
                        {...createVideoInformations.fields.title.as("text")}
                        required
                    />
                </label>
                <label class="input w-full">
                    <span class="label">Sous-titre</span>
                    <input
                        {...createVideoInformations.fields.subtitle.as("text")}
                        required
                    />
                </label>
                <label class="input w-full">
                    <span class="label">Question</span>
                    <input
                        {...createVideoInformations.fields.after.as("number")}
                        required
                    />
                </label>
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Notes</legend>
                    <textarea
                        {...createVideoInformations.fields.notes.as("text")}
                        class="textarea w-full max-h-24"
                        maxlength="255"
                    ></textarea>
                    <div class="label">Optional</div>
                </fieldset>

                <button class="btn btn-success w-full">Ajouter</button>
            </form>
        </div>
    </div>
</div>
