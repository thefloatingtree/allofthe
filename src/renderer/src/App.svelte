<script lang="ts">
	import { Router, Route } from "svelte-navigator";
	import ProjectListPage from "./pages/ProjectListPage.svelte";
	import ProjectPage from "./pages/ProjectPage.svelte";
	import VideoPage from "./pages/VideoPage.svelte";

</script>

<div class="p-6 md:p-12 transition-all">
	<Router>
		<Route path="/">
			<ProjectListPage />
		</Route>

		<Route path="/project">
			<ProjectPage />
		</Route>

		<Route path="/video">
			<VideoPage />
		</Route>
	</Router>
</div>

