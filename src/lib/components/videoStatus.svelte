<script lang="ts">
import { updateStatus } from "$lib/api/video.remote";

let video: {
	id: number;
	live: string;
	title: string;
	subtitle: string;
	after: number;
	notes: string | null;
	status: "à faire" | "en cours" | "terminée" | null;
	created_at: Date | null;
} = $props();
</script>
