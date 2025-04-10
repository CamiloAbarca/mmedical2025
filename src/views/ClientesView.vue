<template>
  <div>
    <h1>Clientes</h1>
    <div class="add">
      <b-button v-b-modal.modal-1 variant="success">Nuevo cliente</b-button>

      <b-modal id="modal-1" title="Nuevo cliente" @close="resetForm" hide-footer>
        <AgregarClientesComponent @close-modal="closeModal" />
      </b-modal>
    </div>
    <br>
    <br>
    <TablaClientesComponent></TablaClientesComponent>
  </div>
</template>

<script>
import AgregarClientesComponent from '@/components/Clientes/AgregarClientesComponent.vue';
import TablaClientesComponent from '../components/Clientes/TablaClientesComponent.vue'

export default {
  name: 'ClientesView',
  components: {
    TablaClientesComponent,
    AgregarClientesComponent
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