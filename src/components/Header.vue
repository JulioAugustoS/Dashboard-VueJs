<template>
	<section class="header_top">
		<header>
			<div id="user_menu">
				<ul id="ident_user">
					<li class="login">						
						<Dropdown trigger="click">
							<a href="javascript:void(0)" class="button_head current">
								<Icon class="icon_header" type="ios-person-outline"></Icon>	
								<p class="name">Julio</p>
							</a>
							<DropdownMenu slot="list" class="ex">
								<DropdownItem>Meus Favoritos</DropdownItem>
								<DropdownItem>Minha Conta</DropdownItem>
							</DropdownMenu>	
						</Dropdown>		
					</li>	
					<li class="gerente">
						<a href="" class="button_head current">
							<Icon class="icon_header" type="ios-briefcase-outline"></Icon>
							<p class="name">Brutus Barber</p>
						</a>
					</li>
					<li class="gerente" @click="logout">
						<a class="button_head current">
							<Icon class="icon_header" type="log-out"></Icon>
							<p class="name">Sair</p>
						</a>
					</li>
				</ul>
			</div>	
		</header>
	</section>
</template>

<script>
	import axios from 'axios'
	export default{
		data() {
			return {
				data: [],
				res: [],
				url: 'http://localhost:3888/'
			}
		},
		mounted() {
			this.data = this.$route.params.data
			this.dadosEstablishment()
		},
		methods: {
			dadosEstablishment() {
				this.$Loading.start()
				axios.get(this.url + 'establishment/dados', {
					params: {
						id: atob(sessionStorage.authestab)
					}
				})
				.then(res => {
					this.$Loading.finish()
					this.res = res.data.Dados
				})
				.catch(error => {
					console.log(error)
				})
			},
			logout() {
				sessionStorage.clear()
                this.$Message.success('Logout realizado com sucesso!')
				this.$router.push({name: 'Login'})
			}
		}
	}
</script>

<style scoped>
	
</style>