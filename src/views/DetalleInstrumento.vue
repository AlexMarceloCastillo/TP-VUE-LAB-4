<template lang="html">
  <div class="detalle">
    <div class="detalle-img">
      <img :src="'http://localhost:8080/api/v1/crud/instrumento/uploads/img/'+instrumentoEncontrado.id" alt="">
      <p>{{instrumentoEncontrado.descripcion}}</p>
    </div>
    <div class="detalle-info border-right border-left">
      <p class="text-muted">{{instrumentoEncontrado.cantidadVendida}} vendidos</p>
      <h4>{{instrumentoEncontrado.instrumento}}</h4>
      <h3 class="display-4">${{instrumentoEncontrado.precio}}</h3>
      <p class="font-weight-ligh">Marca: {{instrumentoEncontrado.marca}}</p>
      <p class="font-weight-ligh">Modelo: {{instrumentoEncontrado.modelo}}</p>
      <p class="font-weight-lighl">Costo Envio: </p>
      <p class="gratis" v-if='instrumentoEncontrado.costoEnvio == 0'><img src="/images/camion.png" alt="">Envio Gratis</p>
      <p class="envio" v-else>Costo de Envio Interior de Argentina ${{instrumentoEncontrado.costoEnvio}}</p>
      <button type="button" class="btn btn-outline-primary">Agregar al carrito</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetalleInstrumento",
  components: {},
  mounted() {
    this.getInstrumentoById();
  },
  data() {
    return {
      instrumentoEncontrado: []
    };
  },
  methods: {
    async getInstrumentoById() {
      const parametroId = this.$route.params.id;
      const response = await fetch("http://localhost:8080/api/v1/crud/instrumento/"+parametroId);
      let data = await response.json();
      this.instrumentoEncontrado = data;
      // const res = await fetch("/instrumentos.json");
      // const resJson = await res.json();
      // this.instrumentoEncontrado = await resJson.instrumentos.find(
      //   instrumento => instrumento.id === parametroId
      // );
    }
  }
};
</script>

<style lang="css" scoped>
.detalle{
  width: 75%;
  margin: auto;
  display: flex;
}
.detalle-img{
  float: left;
  width: 65%;
}
.detalle-img img{
  width: 100%;
  height: 250px;
  margin-bottom: 2.5%;
}
.detalle-info{
  float: right;
  width: 35%;
  padding: 2.5%;
}
.gratis{
  color: green;
}
.envio{
  color: orange;
}
</style>
