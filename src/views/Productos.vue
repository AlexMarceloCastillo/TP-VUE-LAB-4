<template>
  <div class="productos ">
        <div v-for="instrumento in instrumentosData" :key="instrumento.id">
          <instrumento-item  :instrumentoParam="instrumento"></instrumento-item>
        </div>
  </div>

</template>

<script>
// @ is an alias to /src
import Instrumento from "@/components/Instrumento.vue";

export default {
  name: "Home",
  components: {
    "instrumento-item": Instrumento
  },
  mounted(){
    this.getInstrumentos()
  },
  data(){
    return {
      instrumentosData:[]
    };
  },
  methods:{
    async getInstrumentos() {
      const response = await fetch("http://localhost:8080/api/v1/crud/instrumento/");
      let data = await response.json();
      this.instrumentosData = data;
    }
  }

}
</script>

<style lang="css">
</style>
