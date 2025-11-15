<script lang="ts">
import { login } from "$lib/api/auth.remote";
</script>

<div
    class="flex flex-col min-h-screen w-full items-center justify-center p-6 gap-3"
>
    <div class="card w-full max-w-lg bg-base-300 mx-auto p-4">
        <div class="card-body">
            <h2 class="card-title">Connexion</h2>
            <form {...login} class="space-y-6 mt-4">
                <label class="input w-full">
                    <span class="label">Email</span>
                    <input {...login.fields.email.as("email")} required />
                </label>
                <label class="input w-full">
                    <span class="label">Mot de passe</span>
                    <input {...login.fields.password.as("password")} required />
                </label>
                <button class="btn btn-success w-full">Connexion</button>
            </form>
        </div>
    </div>
</div>
