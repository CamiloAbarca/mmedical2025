<template>
  <div>
    <h1>Equipos</h1>
    <div class="add">
      <b-button v-b-modal.modal-1 variant="success">Nuevo equipo</b-button>

      <b-modal id="modal-1" title="Nuevo equipo" @close="resetForm" hide-footer size="lg">
        <AgregarEquiposComponent @close-modal="closeModal" />
      </b-modal>
    </div>
    <br>
    <br>
    <TablaEquiposComponent></TablaEquiposComponent>
  </div>
</template>

<script>
import TablaEquiposComponent from '../components/Equipos/TablaEquiposComponent.vue';
import AgregarEquiposComponent from '../components/Equipos/AgregarEquiposComponent.vue'; // Importa el componente

export default {
  name: 'EquiposView',
  components: {
    TablaEquiposComponent,
    AgregarEquiposComponent // Registra el componente
  },
  methods: {
    resetForm() {
      // Aquí puedes agregar lógica para resetear el formulario si es necesario
    },
    closeModal() {
      this.$bvModal.hide('modal-1'); // Cierra el modal
    }
  }
}
</script>

<style scoped>
.add {
  display: flex;
}
</style>