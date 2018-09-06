<template>
	<div class="ui-view-container" style="height: calc(100% - 50px); position: relative;">
    	<div style="height:100%;">
    		<main class="main_admin">
    			<div>
    				<div class="header center">
    					<h1>Profissionais</h1>
    					<Row :gutter="24">
                            <hr>
                        </Row>
    				</div>

    				<Col span="4" style="float: left;">
    					<Button type="success" @click="novoProfissionalModal = true">Novo Profissional</Button>
    				</Col>

					<!-- Modal Novo Profissional -->
    				<Modal v-model="novoProfissionalModal" title="Cadastro de Profissional" @on-ok="salvarProfissional" @on-cancel="cancelar" :mask-closable="false">
    					<Form>
    						<Row :gutter="16">
    							<Col span="14">
		    						<FormItem label="Nome Completo" required>
		    							<Input v-model="form.nameProfissional"></Input>
		    						</FormItem>
		    					</Col>
		    					<Col span="10">
		    						<FormItem label="Telefone" required>
		    							<Input v-model="form.phoneProfissional" v-mask="['(##) ####-####', '(##) #####-####']"></Input>
		    						</FormItem>
		    					</Col>
		    					<Col span="14">
		    						<FormItem label="E-mail" required>
		    							<Input v-model="form.emailProfissional"></Input>
		    						</FormItem>
		    					</Col>
		    					<Col span="10">
		    						<FormItem label="Sexo" required>
							            <Select v-model="form.sexProfissional">
							                <Option value="Feminino">Feminino</Option>
							                <Option value="Masculino">Masculino</Option>
							            </Select>
							        </FormItem>
		    					</Col>
		    					<Col span="14">
		    						<FormItem label="CPF" required>
		    							<Input v-model="form.cpfProfissional" v-mask="['###.###.###-##']"></Input>
		    						</FormItem>
		    					</Col>
		    					<Col span="10">
		    						<FormItem label="Data de Nascimento" required>
							            <Input v-model="form.birthProfissional" v-mask="['##/##/####']"></Input>
							        </FormItem>
		    					</Col>
		    				</Row>
    					</Form>
				    </Modal>

 		 			<!-- Modal Editar Profissional -->
				    <Modal v-model="editarProfissionalModal" title="Editar Dados do Profissional" @on-ok="editProfissional" @on-cancel="cancelar" :mask-closable="false">
    					<Form>
    						<Row :gutter="16">
    							<Col span="14">
									<Input v-model="form.idProfissional" style="display: none;"></Input>
    							</Col>
    							<Col span="14">
		    						<FormItem label="Nome Completo">
		    							<Input v-model="form.nameProfissional"></Input>
		    						</FormItem>
		    					</Col>
		    					<Col span="10">
		    						<FormItem label="Telefone">
		    							<Input v-model="form.phoneProfissional" v-mask="['(##) ####-####', '(##) #####-####']"></Input>
		    						</FormItem>
		    					</Col>
		    					<Col span="14">
		    						<FormItem label="E-mail">
		    							<Input v-model="form.emailProfissional"></Input>
		    						</FormItem>
		    					</Col>
		    					<Col span="10">
		    						<FormItem label="Sexo">
							            <Select v-model="form.sexProfissional">
							                <Option value="Feminino">Feminino</Option>
							                <Option value="Masculino">Masculino</Option>
							            </Select>
							        </FormItem>
		    					</Col>
		    					<Col span="14">
		    						<FormItem label="CPF">
		    							<Input v-model="form.cpfProfissional" v-mask="['###.###.###-##']" readonly></Input>
		    						</FormItem>
		    					</Col>
		    					<Col span="10">
		    						<FormItem label="Data de Nascimento">
							            <Input v-model="form.birthProfissional" v-mask="['##/##/####']"></Input>
							        </FormItem>
		    					</Col>
		    				</Row>
    					</Form>
				    </Modal>

    				<Col span="24" style="">
    					<div v-if="data == ''">
							<div class="fundoTableVazio">
								<div class="icon">
									<Icon class="icone" type="ios-help-outline"></Icon>
								</div>
								<h3>Nenhum profissional cadastrado!</h3>
							</div>
						</div>

						<div v-else>
							<Col span="4" style="float: right; margin-bottom: 20px;">
		    					<Input placeholder="Pesquisar..."></Input>
		    				</Col>
		    				<Col span="24">
    							<Table :columns="colunas" :data="data" no-data-text="Nenhum profissional cadastrado!" stripe></Table>
    						</Col>
    					</div>
    				</Col>

    			</div>
    		</main>
    	</div>
    </div>
</template>

<script>
	import axios from 'axios'
	import {mask} from 'vue-the-mask'
	export default {
		data(){
			return {
				novoProfissionalModal: false,
				verProfissionalModal: false,
				editarProfissionalModal: false,
				url: 'http://localhost:3888/',
				erroGeral: 'Erro desconhecido, entre em contato com o administrador do sistema!',
				form: {
					idProfissional: '',
					nameProfissional: '',
					phoneProfissional: '',
					emailProfissional: '',
					sexProfissional: '',
					cpfProfissional: '',
					birthProfissional: ''
				},
				colunas: [
					{
						title: '#ID',
						width: 80,
						key: 'id'
					},
					{
						title: 'Nome',
						width: 300,
						key: 'name'
					},
					{
						title: 'Telefone',
						width: 150,
						key: 'phone'
					},
					{
						title: 'E-mail',
						width: 250,
						key: 'email'
					},
					{
						title: 'Data de Nascimento',
						width: 200,
						key: 'birth'
					},
					{
						title: 'Status',
						width: 200,
						key: 'status'
					},
					{
						title: 'Ações',
						key: 'action',
						width: 250,
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Button', {
		                            props: {
		                                type: 'primary',
		                                size: 'small'
		                            },
		                            style: {
		                                marginRight: '5px'
		                            },
		                            on: {
		                                click: () => {
		                                    this.mudarStatus(params.row.id, params.row.status),
		                                    params.row.status = params.row.status == 'Ativo' ? 'Desativado' : 'Ativo'
		                                }
		                            }
		                        }, params.row.status == 'Desativado' ? 'Ativar' : 'Desativar'),
		                        h('Button', {
		                            props: {
		                                type: 'info',
		                                size: 'small'
		                            },
		                            style: {
		                                marginRight: '5px'
		                            },
		                            on: {
		                                click: () => {
		                                    this.editarProfissional(params.row.id)
		                                }
		                            }
		                        }, 'Editar')
		                    ])
						}
					}
				],
				data: []
			}
		},
		directives: { mask },
		mounted() {
			this.dadosProfissionais()
		},
		methods: {
			dadosProfissionais() {
				this.$Loading.start()
				axios.get(this.url + 'professionals/listarProfissional', {
					params: {
						id: atob(sessionStorage.authestab)
					}
				})
				.then(response => {
					this.$Loading.finish()
					this.data = response.data.Dados
				})
				.catch(error => {
					this.$Loading.error()
					this.$Notice.error({
						title: "Error!",
						desc: this.erroGeral
					})
				})
			},
			salvarProfissional() {
				this.$Loading.start()
				axios.post(this.url + 'professionals/cadastrarProfissional', {
					id_establishment: atob(sessionStorage.authestab),
					name: this.form.nameProfissional,
					phone: this.form.phoneProfissional,
					email: this.form.emailProfissional,
					sex: this.form.sexProfissional,
					cpf: this.form.cpfProfissional,
					birth: this.form.birthProfissional
				})
				.then(response => {
					if(response.data.Error == true){
						this.$Loading.error()
						this.$Notice.error({
							title: "Aviso!",
							desc: response.data.Message
						})
					}else{
						this.$Loading.finish()
						this.success()
						this.resetForm()

						this.data = response.data.Dados
					}
				})
				.catch(error => {
					this.$Notice.error({
						title: "Error!",
						desc: this.erroGeral
					})
					this.$Loading.error()
				})
			},
			editProfissional() {
				this.$Loading.start()
				axios.put(this.url + 'professionals/editarProfissional', {
					id: this.form.idProfissional,
					id_establishment: atob(sessionStorage.authestab),
					name: this.form.nameProfissional,
					phone: this.form.phoneProfissional,
					email: this.form.emailProfissional,
					sex: this.form.sexProfissional,
					cpf: this.form.cpfProfissional,
					birth: this.form.birthProfissional
				})
				.then(response => {
					if(response.data.Error == true){
						this.$Loading.error()
						this.$Notice.error({
							title: "Aviso!",
							desc: response.data.Message
						})
					}else{
						this.$Loading.finish()
						this.$Notice.success({
							title: 'Tudo certo!',
							desc: 'Dados do profissional atualizados com sucesso'
						})
						this.resetForm()

						this.data = response.data.Dados
					}
				})
				.catch(error => {
					this.$Notice.error({
						title: "Error!",
						desc: this.erroGeral
					})
					this.$Loading.error()
				})
			},
			cancelar() {
				this.resetForm()
			},
			resetForm() {
				let self = this

				Object.keys(this.form).forEach(function(key, index){
					self.form[key] = ''
				})
			},
			success() {
				this.$Notice.success({
					title: 'Novo Profissional',
					desc: 'Novo profissional cadastrado com sucesso :)'
				})
			},
			mudarStatus(id, status) {
				axios.put(this.url + 'professionals/statusProfissional', {
					id: id,
					status: status,
					id_establishment: atob(sessionStorage.authestab)
				})
				.then(response => {
					if(response.data.Error == true){
						this.$Loading.error()
						this.$Notice.error({
							title: 'Aviso!',
							desc: response.data.Message
						})
					}else{
						this.$Loading.finish()
						this.$Notice.success({
							title: 'Tudo certo!',
							desc: 'Status do profissional alterado com sucesso'
						})
					}
					this.$Loading.finish()
				})
				.catch(error => {
					this.$Loading.error()
					this.$Notice.error({
						title: 'Error!',
						desc: this.erroGeral
					})
				})
			},
			editarProfissional(id) {
				axios.get(this.url + 'professionals/profissional', {
					params: {
						id: id,
						is_deleted: 0
					}
				})
				.then(response => {
					if(response.data.Error == false){
						this.$Loading.finish()
						this.editarProfissionalModal = true
						let dados = response.data.Dados[0]

						if(this.form.idProfissional == ''){
          		this.form.idProfissional = id
          	}

          	if(this.form.nameProfissional == ''){
          		this.form.nameProfissional = dados.name
          	}

          	if(this.form.phoneProfissional == ''){
          		this.form.phoneProfissional = dados.phone
          	}

          	if(this.form.emailProfissional == ''){
          		this.form.emailProfissional = dados.email
          	}

          	if(this.form.sexProfissional == ''){
          		this.form.sexProfissional = dados.sex
          	}

          	if(this.form.cpfProfissional == ''){
          		this.form.cpfProfissional = dados.cpf
          	}

          	if(this.form.birthProfissional == ''){
          		this.form.birthProfissional = dados.birth
          	}
          }else{
          	this.$Loading.error()
          	this.$Notice.erro({
          		title: 'Aviso!',
          		desc: response.data.Message
          	})
          }	
				})
				.catch(error => {
					this.$Loading.error()
					this.$Notice.error({
						title: 'Error!',
						desc: this.erroGeral
					})
				})
			}
		}
	}
</script>
