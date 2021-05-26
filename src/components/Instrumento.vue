<template>
  <div class="instrumento">
    <div class="img">
      <a :href='"/instrumento/"+instrumentoParam.id'><b-card-img  :src="'http://localhost:8080/api/v1/crud/instrumento/uploads/img/'+instrumentoParam.id"></b-card-img></a>
    </div>
    <div class="info">
      <h5>{{instrumentoParam.instrumento}}</h5>
      <h4 class="display-5">${{instrumentoParam.precio}}</h4>
      <p class="gratis" v-if='instrumentoParam.costoEnvio == 0'><img src="/images/camion.png" alt="">Envio Gratis</p>
      <p class="envio" v-else>Costo de Envio Interior de Argentina ${{instrumentoParam.costoEnvio}}</p>
      <p>{{instrumentoParam.cantidadVendida}} Vendidos</p>
    </div>
  </div>

</template>

<script>
export default {
  props: ["instrumentoParam"]
}
</script>

<style>
.instrumento{
  width: 50%;
  margin-left: 35%;
  margin-right: 15%;
  display: flex;
  margin-bottom: 2.5%;
}
.img{
  float: left;
  margin-right: 2.5%;
  width: auto;
}
.img a img{
  width: 150px;
  height: 150px;
}
.info{
  float: right;
}
.gratis{
  color: green;
}
.envio{
  color: orange;
}
</style>
