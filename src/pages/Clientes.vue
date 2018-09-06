<template>
    <div class="ui-view-container" style="height: calc(100% - 50px); position: relative;">
    	<div style="height:100%;">
    		<main class="main_admin">
    			<div>
    				<div class="header center">
    					<h1>Clientes</h1>
                        <Row :gutter="24">
                            <hr>
                        </Row>
    				</div>

    				<Col span="4" style="float: left;">
    					<Button type="success" @click="novoClienteModal = true">Novo Cliente</Button>
    				</Col>

    				<!-- Modal Novo Cliente -->
    				<Modal v-model="novoClienteModal" title="Cadastro de Cliente" @on-ok="salvarCliente" @on-cancel="cancelar" :mask-closable="false">
    					<Form>
    						<Row :gutter="16">
    							<Col span="14">
		    						<FormItem label="Nome Completo" required>
		    							<Input v-model="form.name"></Input>
		    						</FormItem>
		    					</Col>
		    					<Col span="10">
		    						<FormItem label="Telefone" required>
		    							<Input v-model="form.phone" v-mask="['(##) ####-####', '(##) #####-####']"></Input>
		    						</FormItem>
		    					</Col>
		    					<Col span="14">
		    						<FormItem label="E-mail" required>
		    							<Input v-model="form.email"></Input>
		    						</FormItem>
		    					</Col>
		    					<Col span="10">
		    						<FormItem label="Sexo">
							            <Select v-model="form.sex">
							                <Option value="Feminino">Feminino</Option>
							                <Option value="Masculino">Masculino</Option>
							            </Select>
							        </FormItem>
		    					</Col>
		    					<Col span="14">
		    						<FormItem label="CPF">
		    							<Input v-model="form.cpf" v-mask="['###.###.###-##']"></Input>
		    						</FormItem>
		    					</Col>
		    					<Col span="10">
		    						<FormItem label="Data de Nascimento">
							            <Input v-model="form.birth" v-mask="['##/##/####']"></Input>
							        </FormItem>
		    					</Col>
		    					<Col span="24">
		    						<FormItem label="Notas">
							            <Input v-model="form.notes" type="textarea" :autosize="{minRows: 5,maxRows: 7}"></Input>
							        </FormItem>
		    					</Col>
		    				</Row>
    					</Form>
				    </Modal>

 		 			<!-- Modal Editar Cliente -->
				    <Modal v-model="editarClienteModal" title="Editar Dados do Cliente" @on-ok="editCliente" @on-cancel="cancelar" :mask-closable="false">
    					<Form>
    						<Row :gutter="16">
    							<Col span="14">
									<Input v-model="form.id" style="display: none;"></Input>
    							</Col>
    							<Col span="14">
		    						<FormItem label="Nome Completo" required>
		    							<Input v-model="form.name"></Input>
		    						</FormItem>
		    					</Col>
		    					<Col span="10">
		    						<FormItem label="Telefone" required>
		    							<Input v-model="form.phone" v-mask="['(##) ####-####', '(##) #####-####']"></Input>
		    						</FormItem>
		    					</Col>
		    					<Col span="14">
		    						<FormItem label="E-mail" required>
		    							<Input v-model="form.email"></Input>
		    						</FormItem>
		    					</Col>
		    					<Col span="10">
		    						<FormItem label="Sexo">
							            <Select v-model="form.sex">
							                <Option value="Feminino">Feminino</Option>
							                <Option value="Masculino">Masculino</Option>
							            </Select>
							        </FormItem>
		    					</Col>
		    					<Col span="14">
		    						<FormItem label="CPF">
		    							<Input v-model="form.cpf" v-mask="['###.###.###-##']"></Input>
		    						</FormItem>
		    					</Col>
		    					<Col span="10">
		    						<FormItem label="Data de Nascimento">
							            <Input v-model="form.birth" v-mask="['##/##/####']"></Input>
							        </FormItem>
		    					</Col>
		    					<Col span="24">
		    						<FormItem label="Notas">
							            <Input v-model="form.notes" type="textarea" :autosize="{minRows: 5,maxRows: 7}"></Input>
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
                      <h3>Nenhum cliente cadastrado!</h3>
                  </div>
              </div>

              <div v-else>
                  <Col span="4" style="float: right; margin-bottom: 20px;">
                      <Input placeholder="Pesquisar..."></Input>
                  </Col>
                  <Col span="24">
		                  <Table :columns="colunas" :data="data" no-data-text="Nenhum cliente cadastrado!" stripe></Table>
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
				novoClienteModal: false,
				verClienteModal: false,
				editarClienteModal: false,
				url: 'http://localhost:3888/',
				erroGeral: 'Erro desconhecido, entre em contato com o administrador do sistema!',
				form: {
					id: '',
					name: '',
					phone: '',
					email: '',
					sex: '',
					cpf: '',
					birth: '',
					notes: ''
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
            	title: 'Data Nascimento',
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
                                    this.editarCliente(params.index, params.row.id)
                                }
                            }
                        }, 'Editar'),
                        h('Button', {
                        	props: {
                        		type: 'error',
                        		size: 'small'
                        	},
                        	on: {
                        		click: () => {
                        			this.deletarCliente(params.index, params.row.name, params.row.id)
                        		}
                        	}
                        }, 'Excluir')
                    ])
                }
            }
        ],
        data: []
			}
		},
		directives: { mask },
		mounted() {
			this.dadosClients()
		},
		methods: {
			dadosClients() {
				this.$Loading.start()
				axios.get(this.url + 'clients/listarClientes', {
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
					console.log(error)
				})
			},
			salvarCliente() {
				this.$Loading.start()
				axios.post(this.url + 'clients/cadastrarCliente', {
					id_establishment: atob(sessionStorage.authestab),
					name: this.form.name,
					phone: this.form.phone,
					email: this.form.email,
					sex: this.form.sex,
					cpf: this.form.cpf,
					birth: this.form.birth,
					notes: this.form.notes
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
			editCliente() {
				this.$Loading.start()
				axios.put(this.url + 'clients/editarCliente', {
					id: this.form.id,
					id_establishment: atob(sessionStorage.authestab),
					name: this.form.name,
					phone: this.form.phone,
					email: this.form.email,
					sex: this.form.sex,
					cpf: this.form.cpf,
					birth: this.form.birth,
					notes: this.form.notes
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
							desc: 'Dados do cliente atualizados com sucesso'
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
		        let self = this;

		        Object.keys(this.form).forEach(function(key, index) {
		          self.form[key] = ''
		        })
		    },
			success() {
				this.$Notice.success({
					title: 'Novo Cliente',
					desc: 'Novo cliente cadastrado com sucesso :)'
				})
			},
			mudarStatus(id, status) {
       	axios.put(this.url + 'clients/statusCliente', {
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
       				desc: 'Status do cliente alterado com sucesso'
       			})
       		}
       		this.$Loading.finish()

       	})
       	.catch(error => {
       		this.$loading.error()
       		this.$Notice.error({
       			title: 'Error!',
       			desc: this.erroGeral
       		})
       	})
      },
      editarCliente(index, id) {
          axios.get(this.url + 'clients/cliente', {
          	params: {
          		id: id,
          		is_deleted: 0
          	}
          })
          .then(response => {
          	this.$Loading.finish()
          	this.editarClienteModal = true
          	let dados = response.data.Dados[0]

          	if(this.form.id == ''){
          		this.form.id = id
          	}

          	if(this.form.name == ''){
          		this.form.name = dados.name
          	}

          	if(this.form.phone == ''){
          		this.form.phone = dados.phone
          	}

          	if(this.form.email == ''){
          		this.form.email = dados.email
          	}

          	if(this.form.sex == ''){
          		this.form.sex = dados.sex
          	}

          	if(this.form.cpf == ''){
          		this.form.cpf = dados.cpf
          	}

          	if(this.form.birth == ''){
          		this.form.birth = dados.birth
          	}

          	if(this.form.notes == ''){
          		this.form.notes = dados.notas
          	}

          })
          .catch(error => {
          	this.$Loading.error()
          	this.$Notice.error({
          		title: 'Error!',
          		desc: this.erroGeral
          	})
          })
      },
      deletarCliente(index, item, id) {
      	this.$Modal.confirm({
      		title: 'Deseja excluir esse cliente?',
      		content: '<p>Você está prestes a excluir o cliente <b>'+item+'</b>, deseja realmente continuar?<br><br> <b>Essa operação não poderá ser desfeita!</b></p>',
      		okText: 'Sim',
      		cancelText: 'Não',
      		onOk: () => {
      			axios.put(this.url + 'clients/excluirCliente', {
      				id: id,
      				is_deleted: 1
      			})
      			.then(response => {
      				this.data.splice(index, 1)
      				if(response.data.Error == true){
      					this.$Notice.error({
      						title: 'Error!',
      						desc: response.data.Message
      					})
      				}else{
      					this.$Notice.success({
      						title: 'Tudo certo!',
      						desc: 'O cliente <b>'+item+'</b> foi excluido com sucesso!'
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
      	})
      }
		}
	}
</script>

<style scoped>

</style>
