<template>
	<div class="ui-view-container" style="height: calc(100% - 50px); position: relative;">
    	<div style="height:100%;">
    		<main class="main_admin">
    			<div>
    				<div class="header center">
    					<h1>Estoque</h1>
    					<Row :gutter="24">
                            <hr>
                        </Row>
    				</div>

    				<Col style="float: left; margin-right: 20px;">
    					<Button type="success" @click="novoProdutoModal = true">Novo Produto</Button>
    				</Col>

					<div v-if="data != ''">
	    				<Col style="float: left;">
							<Button type="info" @click="novoLancamento()">Fazer Lançamento</Button>
	    				</Col>
	    			</div>

					<!-- Modal Novo Produto -->
    				<Modal v-model="novoProdutoModal" title="Cadastro de Produto" @on-ok="salvarProduto" @on-cancel="cancelar" :mask-closable="false">
    					<Form>
    						<Row :gutter="16">
    							<Col span="24">
		    						<FormItem label="Nome do Produto" required>
		    							<Input v-model="form.nomeProduto"></Input>
		    						</FormItem>
		    					</Col>
		    					<Col span="24">
		    						<FormItem label="Tipo do Produto" required>
							            <Select v-model="form.tipoProduto">
							                <Option value="Feminino">Feminino</Option>
							                <Option value="Masculino">Masculino</Option>
							            </Select>
							        </FormItem>
		    					</Col>
		    				</Row>
		    				<Row :gutter="16">
		    					<Col span="12">
		    						<FormItem label="Valor de Venda" required>
		    							<Input v-model="form.valorVenda"></Input>
		    						</FormItem>
		    					</Col>
		    				</Row>
		    				<Row :gutter="16">
		    					<Col span="12">
		    						<FormItem label="Desconto Máximo">
		    							<Input v-model="form.descontoMaximo"></Input>
		    						</FormItem>
		    					</Col>
		    				</Row>
		    				<Row :gutter="16">
		    					<Col span="12">
		    						<FormItem label="Desconto Promocional">
							            <Input v-model="form.descontoPromocional"></Input>
							        </FormItem>
		    					</Col>
		    				</Row>
		    				<Row :gutter="16">
		    					<Col span="24">
		    						<FormItem label="Descrição do Produto">
							            <Input v-model="form.descricaoProduto"></Input>
							        </FormItem>
		    					</Col>
		    				</Row>
    					</Form>
				    </Modal>

				    <!-- Modal Novo Produto -->
    				<Modal v-model="editarProdutoModal" title="Cadastro de Produto" @on-ok="editProduto" @on-cancel="cancelar" :mask-closable="false">
    					<Form>
    						<Row :gutter="16">
    							<Col span="14">
									<Input v-model="form.idProduto" style="display:none;"></Input>
    							</Col>
    							<Col span="24">
		    						<FormItem label="Nome do Produto" >
		    							<Input v-model="form.nomeProduto"></Input>
		    						</FormItem>
		    					</Col>
		    					<Col span="24">
		    						<FormItem label="Tipo do Produto">
							            <Select v-model="form.tipoProduto">
							                <Option value="Feminino">Feminino</Option>
							                <Option value="Masculino">Masculino</Option>
							            </Select>
							        </FormItem>
		    					</Col>
		    				</Row>
		    				<Row :gutter="16">
		    					<Col span="12">
		    						<FormItem label="Valor de Venda">
		    							<Input v-model="form.valorVenda"></Input>
		    						</FormItem>
		    					</Col>
		    				</Row>
		    				<Row :gutter="16">
		    					<Col span="12">
		    						<FormItem label="Desconto Máximo">
		    							<Input v-model="form.descontoMaximo"></Input>
		    						</FormItem>
		    					</Col>
		    				</Row>
		    				<Row :gutter="16">
		    					<Col span="12">
		    						<FormItem label="Desconto Promocional">
							            <Input v-model="form.descontoPromocional"></Input>
							        </FormItem>
		    					</Col>
		    				</Row>
		    				<Row :gutter="16">
		    					<Col span="24">
		    						<FormItem label="Descrição do Produto">
							            <Input v-model="form.descricaoProduto"></Input>
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
                    <h3>Nenhum produto cadastrado!</h3>
                </div>
            </div>

             <div v-else>
                <Col span="4" style="float: right; margin-bottom: 20px;">
                    <Input placeholder="Pesquisar..."></Input>
                </Col>
                <Col span="24">
    							<Table :columns="colunas" :data="data" no-data-text="Nenhum produto cadastrado!" stripe></Table>
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
				novoProdutoModal: false,
				editarProdutoModal: false,
				url: 'http://localhost:3888/',
				erroGeral: 'Erro desconhecido, entre em contato com o administrador do sistema!',
				form: {
					idProduto: '',
					nomeProduto: '',
					tipoProduto: '',
					valorVenda: '',
					descontoMaximo: '',
					descontoPromocional: '',
					descricaoProduto: ''
				},
				colunas: [
					{
						title: '#ID',
						key: 'id'
					},
					{
						title: 'Produto',
						key: 'name'
					},
					{
						title: 'Tipo',
						key: 'type'
					},
					{
						title: 'Quantidade',
						key: 'qtd'
					},
					{
						title: 'Valor Unit. Médio',
						key: 'unit_cost'
					},
					{
						title: 'Valor Total',
						key: 'total'
					},
					{
						title: 'Ações',
						key: 'action',
						width: 300,
						align: 'center',
						render: (h, params) => {
							return h('div', [
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
											this.editarProduto(params.index, params.row.id)
										}
									}
								}, 'Editar'),
								h('Button', {
									props: {
										type: 'error',
										size: 'small'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.deletarProduto(params.index, params.row.name, params.row.id)
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
			this.dadosProdutos()
		},
		methods: {
			dadosProdutos() {
				this.$Loading.start()
				axios.get(this.url + 'stock/listarProdutos', {
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
			salvarProduto() {
				this.$Loading.start()
				axios.post(this.url + 'stock/cadastrarProduto', {
					id_establishment: atob(sessionStorage.authestab),
					id_user_register: atob(sessionStorage.authbase),
					name: this.form.nomeProduto,
					type: this.form.tipoProduto,
					sale_price: this.form.valorVenda,
					maximum_discount: this.form.descontoMaximo,
					promotional_discount: this.form.descontoPromocional,
					description: this.form.descricaoProduto
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
							desc: 'Produto cadastrado com sucesso'
						})
						this.resetForm()

						this.data = response.data.Dados
					}
				})
				.catch(error => {
					this.$Loading.error()
					this.$Notice.error({
						title: "Error!",
						desc: this.erroGeral
					})
				})
			},
			resetForm() {
				let self = this

				Object.keys(this.form).forEach(function(key, index){
					self.form[key] = ''
				})
			},
			cancelar() {
				this.resetForm()
			},
			novoLancamento() {
				this.$router.push({name: 'lancarMovimentacao'})
			},
			editarProduto(index, id) {
				axios.get(this.url + 'stock/produto', {
					params: {
						id: id
					}
				})
				.then(response => {
					if(response.data.Error == false){
						this.$Loading.finish()
						this.editarProdutoModal = true
						let dados = response.data.Dados[0]

						if(this.form.idProduto == ''){
							this.form.idProduto = dados.id
						}

						if(this.form.nomeProduto == ''){
							this.form.nomeProduto = dados.name
						}

						if(this.form.tipoProduto == ''){
							this.form.tipoProduto = dados.type
						}

						if(this.form.valorVenda == ''){
							this.form.valorVenda = dados.sale_price
						}

						if(this.form.descontoMaximo == ''){
							this.form.descontoMaximo = dados.maximum_discount
						}

						if(this.form.descontoPromocional == ''){
							this.form.descontoPromocional = dados.promotional_discount
						}

						if(this.form.descricaoProduto == ''){
							this.form.descricaoProduto = dados.description
						}
					}else{
						this.$Loading.error()
						this.$Notice.error({
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
			},
			editProduto() {
				this.$Loading.start()
				axios.put(this.url + 'stock/editarProduto', {
					id: this.form.idProduto,
					id_establishment: atob(sessionStorage.authestab),
					name: this.form.nomeProduto,
					type: this.form.tipoProduto,
					sale_price: this.form.valorVenda,
					maximum_discount: this.form.descontoMaximo,
					promotional_discount: this.form.descontoPromocional,
					description: this.form.descricaoProduto
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
							desc: 'Dados do produto atualizados com sucesso'
						})
						this.resetForm()

						this.data = response.data.Dados
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
			deletarProduto(index, item, id) {
				this.$Modal.confirm({
					title: 'Deseja excluir esse produto?',
					content: '<p>Você está prestes a excluir o produto <b>'+item+'</b>, deseja realmente continuar?<br><br> <b>Essa operação não poderá ser desfeita!</b></p>',
					okText: 'Sim',
					cancelText: 'Não',
					onOk: () => {
						axios.put(this.url + 'stock/excluirProduto', {
							id: id,
							is_deleted: 1
						})
						.then(response => {
							this.data.splice(index, 1)
							if(response.data.Error == true){
								alert()
								this.$Notice.error({
									title: 'Aviso!',
									desc: response.data.Message
								})
							}else{
								this.$Notice.success({
									title: 'Tudo certo!',
									desc: 'O produto <b>'+item+'</b> foi excluido com sucesso!'
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
