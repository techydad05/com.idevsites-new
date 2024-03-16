<script>
	export let length = 0, index = 0
</script>

<nav id="dots">
	<button on:click={() => length--}>-</button>
	<button on:click={() => index--}>←</button>
		{#each { length } as dot, i}
			<button on:click={() => (index = i)} class:active={i === index}>{i}</button>
		{/each}
	<button on:click={() => index++}>→</button>
	<button on:click={() => length++}>+</button>
</nav>

<style>
	#dots { gap: 0}
	#dots > :first-child, #dots > :last-child {
		color: red;
		font-weight: 600;
	}
	.active {color: red;}
</style>