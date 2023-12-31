<script>
	import { fade } from 'svelte/transition';
	// import { signIn } from '$lib/helpers/dataAPI/api-google';
</script>

<div class="cloud-sync" in:fade>
	<caption>
		You don't actually need to back up your data since there is no critical information required or
		generated within this simulator. The Backup/Restore feature becomes more useful if you have
		custom banners to edit on different devices. However, the decision is ultimately yours.
	</caption>
	<button type="button" class="google-sign-in-button" disabled> Sign in with Google </button>
	<small style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
		<i>Cloud Sync is not yet available</i>
	</small>
</div>

<style>
	.cloud-sync {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	caption {
		display: block;
		padding: 1rem;
	}

	.google-sign-in-button {
		transition: background-color 0.3s, box-shadow 0.3s, transform 0.25s;
		padding: 12px 16px 12px 42px;
		border: none;
		border-radius: 3px;
		border: 1px solid rgba(0, 0, 0, 0.25);
		color: #757575;
		font-size: 14px;
		font-weight: 500;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
		background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=');
		background-color: white;
		background-repeat: no-repeat;
		background-position: 12px 11px;
	}

	.google-sign-in-button:hover {
		box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25);
	}

	.google-sign-in-button:not(:disabled):active {
		background-color: #eeeeee;
		transform: scale(0.95);
		outline: none;
		box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25), 0 0 0 3px #c8dafc;
	}

	.google-sign-in-button:disabled {
		filter: grayscale(100%);
		background-color: #ebebeb;
		box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);
		cursor: not-allowed;
	}
</style>
