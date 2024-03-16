<svelte:options immutable={true}/>

<script>
	import {slidy} from '@slidy/core'
	import * as animations from '@slidy/animation'
	import * as easings from '@slidy/easing'
	import pkg from '@slidy/core/package.json'
	import {getPhotos} from './api.js'

	// import Git from './Git.svelte'
	import Dots from './Dots.svelte'

	let items = [],
			index = 4,
			length = 9,
			position = 0,
			easing = easings.linear, 
			animation = animations.stairs,
			snap = 'center', flow = 'row', axis = 'x',
			played = false,
			timer = 0,
			duration = 375,
			loop = false

	const snaps = ['unset', 'start', 'center', 'end', 'deck'],
				flows = ['row', 'row-reverse', 'column', 'column-reverse'],
				axises = ['x', 'y']

	function onMove(e) {
		index = e.detail.index
		position = e.detail.position
	}

	function reload() {
		page = Math.trunc((Math.random()*100))
	}
	
	function play() {
		played = !played
		if (timer) clearInterval(timer)
		timer = played ? setInterval(() => {
			if(!loop && index === length -1) {
				clearInterval(timer)
				played = !played
			}
			index++
		}, duration) : 0
	}
	
	function looping() {
		loop = !loop
	}
</script>

<!-- <h1>{pkg.name}@{pkg.version} <Git /></h1> -->
<p>index: [<b>{index}</b>] position: <b>{Math.trunc(position)}</b>px</p>

<section style:--flow={flow}>
	{#await getPhotos(length) then items}
	<ul tabindex="0" 
			role="listbox" 
			use:slidy={{
				index,
				clamp: 0,
				indent: 1,
				sensity: 5,
				gravity: 1.2,
				duration,
				animation,
				easing,
				axis,
				snap,
				loop,
			}} on:move={onMove}>
		{#each items as item, i}
		<li id={i} class:active={i === index}>
			<img 
					 alt={i} 
					 loading="lazy"
					 width={item.width}
					 height={item.height}
					 src={item.src}/>
		</li>
		{/each}
	</ul>
	{/await}
</section>

<Dots bind:index bind:length />

<nav class="text-black">
	<label>Axis
		<select bind:value={axis}>
			{#each axises as axis} 
			<option>{axis}</option>
			{/each}
		</select>
	</label>
	<label>Animation
		<select bind:value={animation}>
			{#each Object.entries(animations) as [k,v]} 
			<option value={v}>{k}</option>
			{/each}
		</select>
	</label>
	<label>Easing
		<select bind:value={easing}>
			{#each Object.entries(easings) as [k,v]} 
			<option value={v}>{k}</option>
			{/each}
		</select>
	</label>
</nav>

<nav class="text-black">
	<label>Flow
		<select bind:value={flow}>
			{#each flows as flow} 
			<option>{flow}</option>
			{/each}
		</select>
	</label>
	<label>Snap
		<select bind:value={snap}>
			{#each snaps as snap} 
			<option>{snap}</option>
			{/each}
		</select>
	</label>
</nav>

<nav>
	<button on:click={looping} class:active={loop}>loop</button>
	<button on:click={reload}>reload</button>
	<button on:click={play} class:active={played}>{played ? 'pause' : 'play'}</button>
</nav>

<style>
	section {
		overflow: hidden; 
		height: 300px;
	}
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-flow: var(--flow) nowrap;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		width: 100%;
		height: 100%;
	}
	ul li {
		flex: 1 0 auto; 
		width: auto; 
		max-width: 100%;
		max-height: calc(100% - 2rem);
		height: 100%;
		position: relative;
		background: whitesmoke;
	}
	ul li:before {
		content: attr(id);
		position: absolute;
		bottom: 0;
		padding: 0.75rem 1rem;
		z-index: 1;
	}
	ul li img {
		width: 100%;
		width: auto;
		height: 100%; 
		display: flex; 
		object-fit: cover;
		max-width: 100%;
	}
	:global(nav) {
		display: flex; 
		justify-content: center;
		margin: 1rem 0;
		flex-wrap: wrap;
		align-items: center;
		gap: 1rem
	}
	.active, b {color: red;}
	h1, p {
		text-align: center;
	}
	:global(body) {
		padding: 0;
	}
</style>