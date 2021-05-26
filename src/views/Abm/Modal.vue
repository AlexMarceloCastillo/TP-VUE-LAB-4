<template>
  <b-modal id="modal-1" :title="instrumento.id == 0 ? 'Crear instrumento': 'Editar Instrumento'" hide-footer @hide="onReset">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show" @click.self="onReset">
      <b-form-group
      id="input-group-1"
      label="Instrumento:"
      label-for="input-1"
      >
      <b-form-input
      id="input-1"
      v-model="instrumento.instrumento"
      type="text"
      placeholder="Instrumento"
      required
      ></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-2" label="Marca:" label-for="input-2">
      <b-form-input
      id="input-2"
      v-model="instrumento.marca"
      placeholder="Marca"
      type="text"
      required
      ></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-3" label="Modelo:" label-for="input-3">
      <b-form-input
      id="input-3"
      v-model="instrumento.modelo"
      placeholder="Modelo"
      type="text"
      required
      ></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-4" label="Precio $:" label-for="input-4">
      <b-form-input
      id="input-4"
      v-model="instrumento.precio"
      placeholder="1000"
      type="number"
      required
      ></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-5" label="Imagen:" label-for="input-5">
      <b-form-file
      v-model="imagen"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
      @change="previewFiles"
      :required="instrumento.id == 0"
      ></b-form-file>
      <div class="mt-3">Selected file: {{ imagen ? imagen.name : '' }}</div>
    </b-form-group>

    <b-form-group id="input-group-6" label="Costo de Envio $:" label-for="input-6" description="Dejar 0 para envio gratis.">
      <b-form-input
      id="input-6"
      v-model="instrumento.costoEnvio"
      type="number"
      required
      ></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-7" label="Cantidad Vendida:" label-for="input-7">
      <b-form-input
      id="input-7"
      v-model="instrumento.cantidadVendida"
      type="number"
      required
      ></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-8" label="Descripcion:" label-for="input-8">
      <b-form-textarea
      id="textarea"
      v-model="instrumento.descripcion"
      placeholder="Enter something..."
      rows="4"
      max-rows="8"
      required
      ></b-form-textarea>
    </b-form-group>
    <hr>
    <b-button class="border-top" type="submit" variant="primary">{{instrumento.id == 0 ? 'Crear instrumento': 'Editar Instrumento'}}</b-button>
  </b-form>
  <!-- {{instrumento}} -->
</b-modal>
</template>

<script>
export default {
  props: ['instrumento','edited','created'],
  data() {
    return {
      imagen: null,
      show: true
    }
  },
  methods: {
    instrumentCreated(){
      this.created()
    },
    instrumentEdited(){
      this.edited()
    }
    ,
    async onSubmit(event) {
      event.preventDefault()
      if(!this.imagen){
        this.imagen = new File([],'');
      }
      const formData = new FormData();
      formData.append('instrumento',this.instrumento.instrumento)
      formData.append('modelo',this.instrumento.modelo)
      formData.append('marca',this.instrumento.marca)
      formData.append('precio',this.instrumento.precio)
      formData.append('img',this.imagen)
      formData.append('costoEnvio',this.instrumento.costoEnvio)
      formData.append('cantidadVendida',this.instrumento.cantidadVendida)
      if(this.instrumento.id == 0){
        await fetch('http://localhost:8080/api/v1/crud/instrumento/crear-con-foto',{
          method: 'POST',
          body: formData
        })
        .then(() => {
          this.instrumentCreated()
          alert('CREADO CON EXITO')
        })
        .catch(err => console.log(err))
      }else{
        if(this.imagen.size != 0){
          await fetch('http://localhost:8080/api/v1/crud/instrumento/editar-con-foto/'+this.instrumento.id,{
            method: 'PUT',
            body: formData
          })
          .then(() => {
            this.instrumentEdited()
            alert('EDITADO CON EXITO')
          })
          .catch(err => console.log(err,'ERROR'))
        }else{
          await fetch('http://localhost:8080/api/v1/crud/instrumento/'+this.instrumento.id,{
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.instrumento)
          })
          .then(() => {
            this.instrumentEdited()
            alert('EDITADO CON EXITO')
          })
          .catch(err => console.log(err,'ERROR'))
        }
      }
      this.$bvModal.hide('modal-1')
    },
    onReset() {
      this.show = false
      this.imagen = null;
      this.$nextTick(() => {
        this.show = true
      })
    },
    previewFiles(event){
      this.imagen = event.target.files[0]
    }
  }
}
</script>

<style lang="css" scoped>
</style>
