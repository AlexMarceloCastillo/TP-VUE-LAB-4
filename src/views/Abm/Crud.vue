<template>
  <b-container class="mt-4 mb-4">
    <b-button variant="primary" v-on:click="onModal()">Crear Instrumento</b-button>
    <modal v-bind:instrumento="instrumento" v-bind:edited="getInstrumentos" v-bind:created="last"></modal>
    <b-table-simple>
      <thead class="table-dark text-center">
        <b-tr>
          <b-th>ID</b-th>
          <b-th>Instrumento</b-th>
          <b-th>Marca</b-th>
          <b-th>Modelo</b-th>
          <b-th>Precio</b-th>
          <b-th>Envio</b-th>
          <b-th>Vendido</b-th>
          <b-th>Imagen</b-th>
          <b-th>Actions</b-th>
        </b-tr>
      </thead>
      <b-tbody>
        <b-tr v-for="item in instrumentos" :key="item.id">
          <b-td> {{item.id}} </b-td>
          <b-td> {{item.instrumento}} </b-td>
          <b-td> {{item.marca}} </b-td>
          <b-td> {{item.modelo}} </b-td>
          <b-td> {{item.precio}} </b-td>
          <b-td> {{item.costoEnvio  != 0 ? item.costoEnvio : 'Gratis' }} </b-td>
          <b-td> {{item.cantidadVendida}} </b-td>
          <b-td> <a :href="'http://localhost:8080/api/v1/crud/instrumento/uploads/img/'+item.id" target="_blank" rel="noopener noreferrer">Ver Imagen</a> </b-td>
          <b-td>
            <b-button variant="warning" v-on:click="onEdit(item)">Edit</b-button>
            {{' '}}
            <b-button variant="danger" v-on:click="onDelete(item.id)">Delete</b-button>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item"><button class="page-link" href="#" v-on:click="first()">First</button></li>
        <li class="page-item"><button class="page-link" href="#" v-on:click="prev()" :disabled="paginaActual == 0">Previous</button></li>
        <li class="page-item"><button class="page-link" href="#" v-on:click="next()" :disabled="isLast">Next</button></li>
        <li class="page-item"><button class="page-link" href="#" v-on:click="last()" :disabled="isLast">Last</button></li>
      </ul>
    </nav>
  </b-container>

</template>

<script>
//import axios from 'axios';
import Modal from "../Abm/Modal.vue"
export default {
  data() {
    return {
      instrumentos: [],
      instrumento: {
        id: 0,
        instrumento: '',
        marca: '',
        modelo: null,
        descripcion: '',
        imagen: null,
        precio: 0,
        costoEnvio: 0,
        cantidadVendida: 0
      },
      paginaActual: 0,
      ultimaPagina: 0,
      isLast: false,
      size: 4
    }
  },
  components:{
    "modal": Modal
  },
  mounted(){
    this.getInstrumentos()
  },
  methods: {
    async getInstrumentos(){
      const response = await fetch(`http://localhost:8080/api/v1/crud/instrumento/pagina?page=${this.paginaActual}&size=${this.size}`);
        let data = await response.json();
        this.ultimaPagina = data.totalPages;
        this.isLast = data.last;
        this.instrumentos = data.content;
      },
      first(){
        this.paginaActual = 0;
        this.getInstrumentos();
      },
      next(){
        this.paginaActual++;
        this.getInstrumentos();
      },
      prev(){
        this.paginaActual--;
        this.getInstrumentos();
      },
      last(){
        this.paginaActual = this.ultimaPagina-1;
        this.getInstrumentos();
      },
      onModal(){
        this.instrumento = {
          id: 0,
          instrumento: '',
          marca: '',
          modelo: null,
          descripcion: '',
          imagen: null,
          precio: 0,
          costoEnvio: 0,
          cantidadVendida: 0
        };
        this.tituloModal = 'Crear Instrumento';
        this.$bvModal.show('modal-1');
      },
      onEdit(item){
        this.instrumento = item;
        this.tituloModal = 'Editar Instrumento';
        this.$bvModal.show('modal-1');
      },
      async onDelete(id){
        if(confirm('Desea borrar el elemento con id '+id)){
          await fetch('http://localhost:8080/api/v1/crud/instrumento/'+id,{
            method:'DELETE'
          }
        ).then(() => {alert('Borrado Correctamente');
          if(this.instrumentos.length == 1){
            this.prev()
          }else{
            this.getInstrumentos()
          }
        })
        .catch((err)=>{alert('ERROR AL BORRAR');console.log(err)})
        }
      }
    }
  }
  </script>
  <style>
  </style>
