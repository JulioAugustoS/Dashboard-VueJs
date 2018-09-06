<template>
    <div id="menu">
        <nav id="menu_adm" class="">
            <div class="border"></div>
            <span class="logo"></span>
            <ul>
                <li class="icon" @click="goHome">
                    <a class="icon ativo"><Icon class="icone" type="ios-calendar-outline"></Icon> Agenda</a>
                </li>
                <li class="icon" @click="$router.push({name: 'clientes'})">
                    <a class="icon"><Icon class="icone" type="ios-people-outline"></Icon>Clientes</a>
                </li>
                <li class="icon" @click="$router.push('/profissionais')">
                    <a class="icon"><Icon class="icone" type="clipboard"></Icon> Profissionais</a>
                </li>
                <li class="icon" @click="$router.push('/servicos')">
                    <a class="icon"><Icon class="icone" type="scissors"></Icon></Icon>Serviços</a>
                </li>
                <li class="icon" @click="$router.push('/estoque/produtos')">
                    <a class="icon"><Icon class="icone" type="ios-list-outline"></Icon>Estoque</a>
                </li>
                <li class="icon" @click="$router.push('/fornecedores')">
                    <a class="icon"><Icon class="icone" type="ios-cart-outline"></Icon>Fornecedores</a>
                </li>
                <li class="icon" @click="$router.push('/relatorios')">
                    <a class="icon"><Icon class="icone" type="ios-pie-outline"></Icon>Relatórios</a>
                </li>
                <li class="icon" @click="$router.push('/configuracoes')">
                    <a class="icon"><Icon class="icone" type="ios-gear-outline"></Icon>Configurações</a>
                </li>
                <li class="icon" @click="$router.push('/controleAcesso')">
                    <a class="icon"><Icon class="icone" type="ios-unlocked-outline"></Icon> Controle de Acesso</a>
                </li>
                <li class="icon" @click="$router.push('/ajuda')">
                    <a class="icon"><Icon class="icone" type="ios-help-outline"></Icon>Ajuda</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
  import axios from 'axios'
	export default {
		data() {
      return {
        url: 'http://localhost:3888/'
      }
    },
    mounted() {
      this.dadosMenu()
    },
    methods: {
      dadosMenu() {
        axios.get(this.url + 'index/menu', {
          params: {
            idUser: atob(sessionStorage.authbase),
            idEstablishment: atob(sessionStorage.authestab)
          }
        })
        .then(response => {
          this.data = response.data.Dados
        })
        .catch(error => {
          this.$Loading.error()
        })
      },
      goPage(id) {
        this.$router.push({name: 'Dashboard', params: {id: id}})
      },
      goHome() {
        this.$router.push({name: 'Agenda'})
      }
    }
	}
</script>

<style scoped>

</style>
