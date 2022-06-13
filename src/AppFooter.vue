<template>
	<div class="layout-footer">
		<span class="font-medium ml-2"></span>
	</div>
</template>

<script>
	export default {
		name: "AppFooter",
		methods: {
		},
		computed: {
			darkTheme() {
				return this.$appState.darkTheme;
			}
		}
	}
</script>