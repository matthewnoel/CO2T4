<script lang="ts">
	import Icon from '$lib/Icon.svelte';
	import { theme } from '$lib/theme.svelte';
	import { t } from '$lib/i18n/locale.svelte';
</script>

<button
	class="icon-btn"
	data-theme-toggle
	aria-label={theme.mode === 'dark' ? t('Change to light theme.') : t('Change to dark theme.')}
	onclick={() => theme.toggle()}
>
	<Icon name={theme.mode === 'dark' ? 'sun' : 'moon'} size={18} />
</button>
