<script>
	import { getContext } from 'svelte';
	import { fly } from 'svelte/transition';

	const close = getContext('chatToggle');
</script>

<div class="sidebar" on:click|stopPropagation transition:fly={{ x: -50, duration: 100 }}>
	<div class="top">
		<button class="close" on:click={close}>
			<i class="gi-reply" />
		</button>
	</div>
	<div class="nav-item">
		<a href="#chat" class="link active" on:click|preventDefault>
			<span>
				<i class="gi-team" />
				<!-- WishSimulator.App -->
			</span>
		</a>
	</div>
</div>

<style>
	.sidebar {
		max-width: 220px;
		width: 15%;
		min-width: 170px;
		height: 100%;
		display: block;
		background-color: rgba(32, 36, 49, 0.6);
		border-right: 1px solid rgba(210, 198, 156, 0.6);
		border-left: 1px solid rgba(210, 198, 156, 0.6);
		color: #d2c69c;
		position: relative;
		z-index: +22;
	}

	@media screen and (max-width: 454px) {
		.sidebar {
			display: none;
		}
	}

	.top {
		width: 100%;
		height: 60px;
		background-color: #3b4255;
		padding: 0 20px 10px;
		display: flex;
		align-items: flex-end;
	}
	:global(.mobile) .top {
		height: 40px;
		padding: 0 20px 0px;
		margin-bottom: -10px;
	}

	.gi-reply {
		font-size: x-large;
	}

	:global(.mobile) .gi-reply {
		font-size: large;
	}

	.nav-item {
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		color: #f0e4d4;
	}

	.link {
		position: relative;
		transition: all 0.2s;
		text-decoration: none;
		color: #f0e4d4;
		aspect-ratio: 70/17.5;
		display: flex;
		align-items: center;
		padding-left: 5%;
		z-index: 1;
	}

	@media screen and (min-width: 900px) {
		.link {
			font-size: 80%;
		}
	}

	.link i {
		font-size: 1.3rem;
		display: inline-block;
		margin-right: 10px;
		opacity: 0.8;
	}
	:global(.mobile) .link i {
		font-size: 1.4rem;
	}

	.link.active,
	.link:hover {
		background-color: #414856;
		border-radius: 0.25rem;
	}

	.link::after,
	.link::before,
	span::after,
	span::before {
		content: '';
		position: absolute;
		background-size: contain;
		display: block;
	}

	.link.active::before {
		top: 50%;
		right: -3%;
		height: 100%;
		aspect-ratio: 1/1;
		transform: translateY(-50%) rotate(180deg);
		z-index: -1;
		line-height: 120%;
		background-color: #414856;
		border-radius: 100%;
	}

	.link.active::after {
		top: 50%;
		right: -1%;
		width: 100%;
		aspect-ratio: 708/156;
		transform: translateY(-50%) rotate(180deg);
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAsQAAACcCAMAAABPyU0CAAAAOVBMVEUAAADTu4vUvI7Uuo3TvI7TvI7UvI7TvozTu43TvI7Su47Pv4/fv43TvI7Tu43SvIzVuo3UvI/TvI7Io+VzAAAAEnRSTlMAQL9goL/eIHDvsBAQkIBQML8hIpUyAAADO0lEQVR42uzd22oCMRSG0dixM2oVZb//wzaOhzoWerjzh7VAxfuPkExibD9ZF7yg97YgYvKImHj/jHho8FJWIiadiIknYuKJmHgiJp6IiSdi4omYeL9G/FYLIublrOqZiAkjYuL9JeJVgxwiJp6IiSdi4omYeCImnoiJJ2LiiZh4IiaeiIknYuKJmHgiJp6IiSdi4omYeCImnoiJJ2LiiZh4Iibet4inrYjJ8hzxfqwaPxrkeI74ULWdGgR5injo3zcNkiwjnsaqdYMoy4jXVaPJBGEWEQ+uDyTQImKTCRI9RrwxmSDRQ8TTaDJBoh7x46quQZyviCerOjL1cg3EZLtHPG0NxGS6RzwYiAl1j9ijCVLdIj4aiEl1i3hns45U14in/mmzjkzXiIeq9waRrhG/WdYRq0dsNkG2Xq/ZBNkuEe/8so5cl4jHqlODTHPEJzsdBJsjHqp2DULNEa9NiQk2Rzy6fo1gPeL5bd8gVO/Xuo5s54iPtjpIdo54U3VokOoc8cHDCZKdI95VHRuk6hH7lw6y9YidnCDbHLHDxCTrEc8viCVi4omYeCImnoiJJ2LiecRGPBETz7Yz8eYDQO6wIpmjmMT7bO8OU1oHwgCKpiCtIdDHy/4XKxOjOFUQ//XCOWu4hJkk34yf4sk7xpMcO0HZiPhmUJQyI/vkOTyFPMdYkXdE/GpnR9gR8W3f1wWijoiX1agoXSNii2LSXDxD3nvEmzfFdJ1THf+tJ8g6I361niDrjHhzpShZI+JzPXFfoOgj4su+r7Z2JI2ID6sZJaI+I77b2hH1GfG2+h+TphGxRzFpI2KPYtJGxKe7UTuSvkS8rb49UzQi/nD3rpii6VjX676/LBAzRXzZ7e3omSIeRwteLSiImSPeVgsKcuaIl3+7NxTUPEQ8jnld/VhMymPE29WymJgR8eTm6zMx3yJ2gwc1IiZPxOSJmDwRkydi8kRMnojJEzF5IiZPxOSJmDwRkydi8kRMnojJEzF5IiZPxOSJmDwRkydi8n6KeOJSJZ7OZZ+ImB4Rk/drxLMXEfN0Lt9u+hIxMSImT8TkiZg8EZMnYvJETJ6IyftzxPCEREyeiMl7iPgNPx9ffAKGWGIAAAAASUVORK5CYII=');
		background-repeat: no-repeat;
		opacity: 0.5;
	}

	span {
		display: flex;
		align-items: center;
		width: 100%;
		height: 95%;
		position: relative;
		overflow: hidden;
	}
	span :global(i) {
		line-height: 0;
	}
</style>
