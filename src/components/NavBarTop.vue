<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="/">TP-VUE</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/">Home</b-nav-item>
          <b-nav-item href="/ubicacion">¿Donde estamos?</b-nav-item>
          <b-nav-item href="/productos">Productos</b-nav-item>
          <b-nav-item href="/crud">ABM Instrumentos</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>

</template>

<script>
export default {}
</script>

<style lang="css" scoped></style>
