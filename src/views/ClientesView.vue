<template>
  <div>
    <h1>Clientes</h1>
    <br>
    <TablaClientesComponent></TablaClientesComponent>
  </div>
</template>

<script>
import TablaClientesComponent from '../components/Clientes/TablaClientesComponent.vue'

export default {
  name: 'EquiposView',
  components: {
    TablaClientesComponent
  }

}
</script>

<style></style>