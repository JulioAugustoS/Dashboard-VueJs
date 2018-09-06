<template>
	<main>
		<div class="login-container">
			<div class="boxLogin">
				<div class="logo">
					<h1>Beautyhall</h1>
				</div>
				<div class="divider"></div>	
				<div class="formLogin">
					<Form class="form">
						<div class="form-group">
							<Input v-model="email" size="large" placeholder="Digite seu e-mail" />
						</div>
						<div class="form-group">
							<Input v-model="senha" type="password" size="large" placeholder="Digite sua senha" />
						</div>
						<router-link to="/" style="float: right; margin-bottom: 15px; font-size: 13px;">Esqueceu sua senha?</router-link>
						<Button class="btn" @click="logar">Logar</Button>	
					</Form>		
				</div>	
			</div>
			<footer>
				<p>Dashboard Beautyhall App</p>
				<p>© 2018 Todos os direitos reservados</p>
			</footer>	
		</div>	
	</main>
</template>

<script>
	import axios from 'axios'
	export default{
		data() {
			return {
				email: '',
				senha: '',
				url: 'http://localhost:3888/'	
			}
		},
		methods: {
			logar(){
				this.$Loading.start()

				axios.post(this.url + 'users/login', {
					email: this.email,
					senha: this.senha,
					nivel: 3,
					status: 0
				})
				.then(res => {
					this.$Loading.finish()
					if(res.data.Error == true){
						this.$Notice.warning({
							title: 'Atenção!',
							desc: res.data.Message
						})

						this.$Loading.error()
					}else{	
						sessionStorage.setItem('auth', true)
						// Armazena o id do usuario
						sessionStorage.setItem('authbase', btoa(res.data.Dados.id))
						// Armazena o id do estabelecimento
						sessionStorage.setItem('authestab', btoa(res.data.Dados.id_establishment))	
						this.$Message.success('Login realizado com sucesso!');
						// Redireciona para o dashboard
						this.$router.push({name: 'Agenda', params: {data: res.data.Dados[0]}})
					}
				})
				.catch(err => {
					this.$Loading.error()
					this.$Notice.error({
						title: 'Error!',
						desc: 'Ops!!! Houve um erro não identificado, tente novamente ou entre em contato com o administrador.'
					})
				})
			}
		},
		beforeRouteEnter(to, from, next) {
			next()
		}
	}
</script>

<style scoped>
	footer {
		text-align: center;
		color: #e1e1e1;
		font-size: 14px;
		margin-top: 10px;
	}

	.login-container {
		width: 100%;
		height: 100%;
		position: fixed;
		background: url("../assets/images/salao1.jpg") no-repeat center;
		background-size: cover;
	}

	.btn {
		width: 100%;
		background: #e74c3c !important;
		border: 1px solid #e74c3c !important;
		color: #FFF !important;
		font-size: 14px !important;
		font-weight: 500 !important;
	}

	.btn:hover {
		background: #c0392b !important;
		border: 1px solid #c0392b !important;
		color: #FFF !important;
	}

	.boxLogin {
		width: 320px;
		margin: 50px auto;
		background: white;
		border: #ddd;
		color: #333333;
		padding: 20px;
		border-radius: 3px;
	}

	.logo {
		text-align: center;
		margin-bottom: 20px;
	}

	.form {
		margin-top: 20px;
		margin-bottom: 20px;
	}
	
	.form-group {
		margin-bottom: 20px;
		position: relative;
	}

	.divider {
	    position: relative;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: -ms-flexbox;
	    display: flex;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    -ms-flex-align: center;
	    align-items: center;
	    -webkit-box-pack: center;
	    -webkit-justify-content: center;
	    -ms-flex-pack: center;
	    justify-content: center;
	}

	.divider:before {
	    content: " ";
	    display: block;
	    height: 1px;
	    -webkit-box-flex: 1;
	    -webkit-flex: 1;
	    -ms-flex: 1;
	    flex: 1 1 0%;
	    min-width: 0;
	    background-color: #e1e1e1;
	}

	.divider:after {
	    content: " ";
	    display: block;
	    height: 1px;
	    -webkit-box-flex: 1;
	    -webkit-flex: 1;
	    -ms-flex: 1;
	    flex: 1 1 0%;
	    min-width: 0;
	    background-color: #e1e1e1;
	}

	.divider > span {
	    padding: 0 8px;
	}

	.u-mt-30 {
	    margin-top: 30px !important;
	}

	.u-mb-10 {
	    margin-bottom: 10px !important;
	}
</style>
