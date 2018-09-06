<template>
	<main>
		
	</main>
</template>

<script>
	import axios from 'axios'
	import Header from '@/components/Header/Header'
	export default{
		data(){
			return{
				data: {},
				Nome: '',
				Email: '',
				Senha: '',
				Key: ''
			}
		},
		components: { Header },
		mounted(){
			this.data = JSON.parse(atob(localStorage.dados))[0]
		},
		methods: {
			Cadastrar(){
				axios.post('http://104.236.76.212:3000/users/cadastro', {
					nome: this.Nome,
					email: this.Email,
					senha: this.Senha
				})
				.then(res => {
					if(res.data.Error){
						this.$Notice.error({
							desc: res.data.Message
						})
					}else{
						this.$Notice.success({
							desc: res.data.Message
						})
					}
				})
				.catch(err => console.log(err))
			},
			Update(){
				axios.put('http://104.236.76.212:3000/users/alterarFCM', {
					id: 63,
					key: this.Key	
				})
				.then(res => {
					console.log('')
				})
				.catch(err => console.log(err))
			}
		}
	}
</script>