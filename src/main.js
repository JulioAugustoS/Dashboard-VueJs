import Vue from 'vue'
import iview from 'iview'
import App from './App'
import router from './router'
import locale from 'iview/dist/locale/pt-BR'

// Style
import './assets/css/estilo.css'
import 'iview/dist/styles/iview.css'

// Utilizadores
Vue.use(iview, { locale })

Vue.config.productionTip = false

new Vue({
	el: '#app',
	data: {
		id: null
	},
	router,
	components: { App },
	template: '<App/>'
})

router.beforeEach((to, from, next) => {
	if(to.name == 'Dashboard') {
		next()
	}else{
		next()
	}
})
