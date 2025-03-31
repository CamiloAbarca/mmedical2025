<template>
  <div>
    <h1>Equipos</h1>
    <div class="add">

      <b-button v-b-modal.modal-1 variant="success">Nuevo equipo</b-button>

      <b-modal id="modal-1" title="Nuevo equipo" @close="resetForm">
        <p class="my-4">Aquí va el form</p>
      </b-modal>
    </div>
    <br>
    <br>
    <TablaEquiposComponent></TablaEquiposComponent>
  </div>
</template>

<script>
import TablaEquiposComponent from '../components/Equipos/TablaEquiposComponent.vue'

export default {
  name: 'EquiposView',
  components: {
    TablaEquiposComponent
  }

}
</script>

<style scoped>
.add {
  display: flex;
}
</style>