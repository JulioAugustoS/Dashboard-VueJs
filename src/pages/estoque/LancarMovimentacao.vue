<template>
	<div class="ui-view-container" style="height: calc(100% - 50px); position: relative;">
    	<div style="height:100%;">
    		<main class="main_admin">
    			<div>
    				<div class="header">
    					<h2>Lançar Movimentação</h2>	
    				</div>

    				<Row>
						<Col span="6">
							<Form>	
								<FormItem label="Tipo de Movimentação" required>
									<Select v-model="form.tipoMovimentacao">
										<Option value="Compra">(+) Compra</Option>
										<Option value="Devolução de Compra">(-) Devolução de Compra</Option>
										<Option value="Devolução de Venda">(+) Devolução de Venda</Option>
										<Option value="Consumo Interno">(-) Consumo Interno</Option>
										<Option value="Perda">(-) Perda ou Quebra</Option>
										<Option value="Venda sem Comanda">(-) Venda sem Comanda</Option>
									</Select>	
								</FormItem>	
								<FormItem label="Fornecedor" required>
									<Input v-model="form.fornecedor"></Input>
								</FormItem>	
								<FormItem label="Nota Fiscal">
									<Input v-model="form.notaFiscal"></Input>
								</FormItem> 
								<FormItem label="Observações">
									<Input v-model="form.observacoes" type="textarea"></Input>
								</FormItem>	
							</Form>	
						</Col>

						<Col span="18" style="padding-left:40px;">
							<Row>
								<Col span="24">
									<Button type="success" @click="novoItemModal = true" style="float:right;margin-bottom:10px;">Adicionar Item</Button> 	
								</Col>
							</Row>	
							
							<div v-if="data == ''">
								<div class="fundoTableVazio">
									<div class="icon">
										<Icon class="icone" type="ios-help-outline"></Icon>
									</div>	
									<h3>Nenhum item cadastrado!</h3>
								</div>	
							</div>
							
							<div v-else>
								<Table :columns="colunas" :data="data" no-data-text="Nenhum item adicionado!" stripe></Table>
							</div>
						</Col>
    				</Row>

    				<Modal v-model="novoItemModal" title="Adicionar Item" @on-ok="salvarItem" @on-cancel="cancelar" :mask-closable="false">
						<Form>
							<Row :gutter="16">
								<Col span="24">
									<FormItem label="Produto" required>
										<Select v-model="form.addProduto">
											
										</Select>		
									</FormItem>	
									<FormItem label="Estoque Atual">
										<Input v-model="form.estoqueAtual" readonly></Input>
									</FormItem>
								</Col>
								<Col span="24">
									<Col span="8">
										<FormItem label="Validade">
											<Input v-model="form.validade" v-mask="['##/##/####']"></Input>
										</FormItem>	
									</Col>
									<Col span="8" style="margin-left:15px;">
										<FormItem label="Quantidade">
											<Input v-model="form.qtd" type="number"></Input>	
										</FormItem>	
									</Col>	
								</Col>
								<Col span="24">
									<Col span="8">
										<FormItem label="Valor Unit. Compras">
											<Input v-model="form.valorUnitCompras" v-money="money"></Input>
										</FormItem>	
									</Col>
									<Col span="8" style="margin-left:15px;">
										<FormItem label="Valor Total">
											<Input v-model="form.valorTotal" v-money="money" readonly></Input>
										</FormItem>	
									</Col>
								</Col>
								<Col span="24">
									<FormItem label="Estoque Após Movimentação">
										<Input v-model="form.estoqueAposMovimentacao" readonly></Input>
									</FormItem>	
								</Col>
							</Row>	
						</Form>	
    				</Modal>	
    			</div>
    		</main>
    	</div>
    </div>				
</template>

<script>
	import axios from 'axios'
	import {mask} from 'vue-the-mask'
	import {VMoney} from 'v-money'
	export default {
		data(){
			return {
				novoItemModal: false,
				data: '',
				money: {
		          decimal: ',',
		          thousands: '.',
		          prefix: 'R$ ',
		          suffix: '',
		          precision: 2,
		          masked: false
		        },  
				url: 'http://localhost:3888/',
				erroGeral: 'Erro desconhecido, entre em contato com o administrador do sistema!',
				form: {
					tipoMovimentacao: '',
					fornecedor: '',
					notaFiscal: '',
					observacoes: '',
					addProduto: '',
					estoqueAtual: '',
					validade: '',
					qtd: '',
					valorUnitCompras: '',
					valorTotal: '',
					estoqueAposMovimentacao: ''
				},
				colunas: [
					{
						title: 'Item',
						key: 'item'
					},
					{
						title: 'Quantidade',
						key: 'qtd'
					},
					{
						title: 'Valor Total',
						key: 'valor_total'
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
											this.editarItem(params.row.id)
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
											this.excluirItem(params.row.id)
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
		directives: { mask, money: VMoney },
		mounted() {

		},
		methods: {
			salvarItem() {

			},
			cancelar() {

			}
		}
	}	
</script>