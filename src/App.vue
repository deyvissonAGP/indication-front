<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Indicação Front</a>
      </div>
    </nav>

    <div class="container">

      <ul>
        <li v-for="(erro, index) of errors" :key="index">
          campo <b>{{erro.field}}</b> - {{erro.defaultMessage}}
        </li>
      </ul>


      <form @submit.prevent="salvar">

          <label>Nome</label>
            <input type="text" placeholder="Nome" v-model="indicacao.nome" >
          <label>CPF</label>
            <input type="text" placeholder="cpf" v-model="indicacao.cpf" >
          <label>Telefone</label>
            <input type="tel" placeholder="telefone" v-model="indicacao.telefone" >
          <label>Email</label>
            <input type="email" placeholder="email" v-model="indicacao.email" >
            
          <br><button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

      </form>

      <table>

        <thead>

          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>status</th>
            <th>OPÇÕES</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="indicacao of indicacoes" v-bind:key="indicacao.id">

            <td>{{ indicacao.nome }}</td>
            <td>{{ indicacao.cpf }}</td>
            <td>{{ indicacao.telefone }}</td>
            <td>{{ indicacao.email }}</td>
            <td>{{ indicacao.status_id }}</td>
            <td>
              <button @click="editar(indicacao)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="remover(indicacao)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>
      
      </table>

    </div>

  </div>
</template>

<script>

import Indicacao from './services/indicacao'

export default {
  name: 'app',
  data () {
    return {
      indicacao:{
        id: '',
        nome: '',
        cpf: '',
        telefone: '',
        email: '',
        status_id: ''
      },
      indicacoes: [],
      errors: []
    }
  },

  mounted(){
    this.listar()
  },

  methods:{
    
    listar(){
      Indicacao.listar().then(resposta => {
        this.indicacoes = resposta.data
      }).catch(e => {
        console.log(e)
      })
    },

    salvar(){

      if(!this.indicacao.id){

        Indicacao.salvar(this.indicacao).then(resposta => {
          this.indicacao = {}
          alert('Cadastrado com sucesso!')
          this.listar()
          this.errors = {}
        }).catch(e => {
          this.errors = e.response.data.errors
        })

      }else{

        Indicacao.atualizar(this.indicacao).then(resposta => {
          this.indicacao = {}
          this.errors = {}
          alert('Atualizado com sucesso!')
          this.listar()
        }).catch(e => {
          this.errors = e.response.data.errors
        })

      }
      

    },

    editar(indicacao){
      this.indicacao = indicacao
    },

    remover(indicacao){

      if(confirm('Deseja excluir esta indicação ?')){

        Indicacao.apagar(indicacao).then(resposta => {
          this.listar()
          this.errors = {}
        }).catch(e => {
          this.errors = e.response.data.errors
        })

      }

    }
  }

}
</script>

<style>



</style>
