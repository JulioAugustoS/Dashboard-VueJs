import Vue from 'vue'
import Router from 'vue-router'

// Pages
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import Agenda from '@/pages/Agenda'
import Clientes from '@/pages/Clientes'
import Profissionais from '@/pages/Profissionais'
import Servicos from '@/pages/Servicos'
import Produtos from '@/pages/estoque/Produtos'
import lancarMovimentacao from '@/pages/estoque/lancarMovimentacao'
import Fornecedores  from '@/pages/Fornecedores'
import Relatorios from '@/pages/Relatorios'
import Configuracoes from '@/pages/Configuracoes'
import ControleAcesso from '@/pages/ControleAcesso'
import Ajuda from '@/pages/Ajuda'

Vue.use(Router)

export default new Router({
	mode: 'history',
  	routes: [
  		{
  			path: '/',
  			name: 'login',
  			component: Login
  		},
	    {
	    	path: '/dashboard',
	    	name: 'dashboard',
	    	beforeEnter(to, from, next){
	    		if(sessionStorage.auth){
	    			next()
	    		}
	    	},
	    	children: [
	    		{
	    			path: '/',
	    			name: 'Agenda',
	    			component: Agenda,
	    			meta: { requiresAuth: true }
	    		},
	    		{
	    			path: '/clientes',
	    			name: 'clientes',
	    			component: Clientes
	    		},
	    		{
	    			path: '/profissionais',
	    			name: 'profissionais',
	    			component: Profissionais
	    		},
	    		{
	    			path: '/servicos',
	    			name: 'servicos',
	    			component: Servicos
	    		},
	    		{
	    			path: '/estoque/produtos',
	    			name: 'produtos',
	    			component: Produtos
	    		},
	    		{
	    			path: '/estoque/lancar-movimentacao',
	    			name: 'lancarMovimentacao',
	    			component: lancarMovimentacao
	    		},
	    		{
	    			path: '/fornecedores',
	    			name: 'fornecedores',
	    			component: Fornecedores
	    		},
	    		{
	    			path: '/relatorios',
	    			name: 'relatorios',
	    			component: Relatorios
	    		},
	    		{
	    			path: '/configuracoes',
	    			name: 'configuracoes',
	    			component: Configuracoes
	    		},
	    		{
	    			path: '/controleAcesso',
	    			name: 'controleAcesso',
	    			component: ControleAcesso
	    		},
	    		{
	    			path: '/ajuda',
	    			name: 'ajuda',
	    			component: Ajuda
	    		}
	    	],
	    	component: Dashboard

	    }
	   	
	]
})




