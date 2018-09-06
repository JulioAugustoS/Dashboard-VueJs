<template>
	<div id="wrapper">
		<Menu />
		<div class="scroll man-callendar">
			<div class="scroll-inner"></div>
			<Headers />

			<div class="conteudo">
				<router-view />	
	        </div>
        </div>    
	</div>
</template>

<script>
	import Headers from '@/components/Header'
	import Menu from '@/components/Sidebar'

	export default {
		data(){
			return {

			}
		},
		components: {Menu, Headers},
		methods: {

		}
	}
</script>

<style scoped>
	
</style>