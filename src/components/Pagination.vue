<template id="pagination">
	<ul class="pagination">
		<li v-for="i in maxPages">
			<a href="#" @click="$emit('change', i)"> {{ i }}</a>	
		</li>	
	</ul>
</template>

<script>
	data() {
		
	}
</script>

<style>
	
</style>