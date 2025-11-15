<script lang="ts">
import { createUser, getUsers } from "$lib/api/admin.remote";

import { getSession } from "$lib/api/auth.remote";
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

<div class=" flex justify-end p-4 mt-4">
    <a class="btn btn-primary" href="/admin/users/create">Ajouter</a>
</div>

<div class="overflow-x-auto">
    <table class="table">
        <thead>
            <tr>
                <th>email</th>
                <th>name</th>
                <th>role</th>
            </tr>
        </thead>
        <tbody>
            {#each await getUsers() as user}
                <tr>
                    <th>{user.name}</th>
                    <th>{user.email}</th>
                    <th>{user.role}</th>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
