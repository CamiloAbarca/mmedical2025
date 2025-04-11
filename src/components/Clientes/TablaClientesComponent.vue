<template>
    <div class="tabClientes">
        <!-- Campo de búsqueda -->
        <b-form-group class="mb-3">
            <div class="d-flex align-items-center">
                <label class="mr-2" for="searchInput">Buscar</label>
                <b-form-input id="searchInput" v-model="searchQuery" placeholder="Buscar por razón social, RUT o ID"
                    class="form-control-sm" style="width: 300px;"> <!-- Ajusta el ancho según sea necesario -->
                </b-form-input>
            </div>
        </b-form-group>

        <b-table :items="filteredItems" :fields="fields" striped bordered hover responsive>
            <template #cell(acciones)="data">
                <div class="d-flex align-items-center">
                    <b-icon icon="eye-fill" @click="openViewModal(data.item)" scale="1" variant="success"
                        style="cursor: pointer; margin-right: 8px;"></b-icon>

                    <b-icon icon="pencil-fill" @click="openEditModal(data.item)" scale="1" variant="warning"
                        style="cursor: pointer; margin-right: 8px;"></b-icon>

                    <b-icon icon="trash-fill" @click="confirmDelete(data.item.id)" scale="1" variant="danger"
                        style="cursor: pointer; margin-right: 8px;"></b-icon>
                </div>
            </template>
        </b-table>

        <!-- Modal para ver y editar la información del cliente -->
        <b-modal v-model="showEditModal" :title="`Cliente ID #${selectedItem.id}`" size="lg">
            <div>
                <b-form @submit.prevent="isEditing ? saveChanges() : null">
                    <b-row>
                        <b-col cols="6">
                            <b-form-group label="ID">
                                <b-form-input v-model="selectedItem.id" disabled></b-form-input>
                            </b-form-group>
                            <b-form-group label="Razón Social">
                                <b-form-input v-model="selectedItem.razonSocial" :disabled="!isEditing"></b-form-input>
                            </b-form-group>
                            <b-form-group label="RUT">
                                <b-form-input v-model="selectedItem.rut" :disabled="!isEditing"></b-form-input>
                            </b-form-group>
                            <b-form-group label="Centro Médico">
                                <b-form-input v-model="selectedItem.centroMedico" :disabled="!isEditing"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col cols="6">
                            <b-form-group label="Contacto">
                                <b-form-input v-model="selectedItem.contacto" :disabled="!isEditing"></b-form-input>
                            </b-form-group>
                            <b-form-group label="Teléfono">
                                <b-form-input v-model="selectedItem.fono" :disabled="!isEditing"></b-form-input>
                            </b-form-group>
                            <b-form-group label="Email">
                                <b-form-input v-model="selectedItem.email" :disabled="!isEditing"></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-form>
            </div>
            <template #modal-footer>
                <b-button variant="secondary" @click="showEditModal = false">Cerrar</b-button>
                <b-button v-if="isEditing" type="submit" variant="success" @click="saveChanges">Guardar
                    Cambios</b-button>
                <b-button v-else @click="isEditing = true" variant="primary">Editar</b-button>
            </template>
        </b-modal>

        <!-- Modal de confirmación para eliminar -->
        <b-modal v-model="showDeleteModal" title="Confirmar Eliminación">
            <div>
                <p>¿Estás seguro de que deseas eliminar este cliente?</p>
            </div>
            <template #modal-footer>
                <b-button variant="secondary" @click="showDeleteModal = false">Cancelar</b-button>
                <b-button variant="danger" @click="deleteCliente">Eliminar</b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { BButton, BModal, BForm, BFormGroup, BFormInput, BRow, BCol } from 'bootstrap-vue';

export default {
    name: 'TablaClientesComponent',
    components: {
        BButton,
        BModal,
        BForm,
        BFormGroup,
        BFormInput,
        BRow,
        BCol
    },
    data() {
        return {
            fields: [
                { key: 'id', label: 'ID' },
                { key: 'razonSocial', label: 'Razón Social' },
                { key: 'rut', label: 'RUT' },
                { key: 'centroMedico', label: 'Centro Médico' },
                { key: 'acciones', label: 'Acciones' },
            ],
            showEditModal: false,
            showDeleteModal: false,
            selectedItem: {},
            isEditing: false,
            searchQuery: '' // Nueva propiedad para almacenar la consulta de búsqueda
        };
    },
    computed: {
        ...mapGetters(['getClientes']),
        items() {
            return this.getClientes;
        },
        filteredItems() {
            // Filtrar los items según la búsqueda
            if (!this.searchQuery) {
                return this.items; // Si no hay búsqueda, devolver todos los items
            }
            const query = this.searchQuery.toLowerCase(); // Convertir a minúsculas para comparación
            return this.items.filter(item => {
                return (
                    item.id.toString().includes(query) || // Filtrar por ID
                    item.razonSocial.toLowerCase().includes(query) || // Filtrar por razón social
                    item.rut.toLowerCase().includes(query) || // Filtrar por RUT
                    item.centroMedico.toLowerCase().includes(query) // Filtrar por centro médico
                );
            });
        }
    },
    methods: {
        ...mapActions(['updateCliente', 'deleteCliente']),
        openViewModal(item) {
            this.selectedItem = { ...item };
            this.isEditing = false;
            this.showEditModal = true;
        },
        openEditModal(item) {
            this.selectedItem = { ...item };
            this.isEditing = true;
            this.showEditModal = true;
        },
        confirmDelete(itemId) {
            this.selectedItem.id = itemId; // Guardamos el ID del cliente a eliminar
            this.showDeleteModal = true; // Abrimos el modal de confirmación
        },
        async deleteCliente() {
            try {
                await this.$store.dispatch('deleteCliente', this.selectedItem.id); // Llamamos a la acción para eliminar el cliente
                console.log('Cliente eliminado:', this.selectedItem.id);
                this.showDeleteModal = false; // Cerramos el modal de confirmación
            } catch (error) {
                console.error('Error al eliminar el cliente:', error);
            }
        },
        async saveChanges() {
            try {
                await this.updateCliente(this.selectedItem); // Actualizamos el cliente en el store
                console.log('Cambios guardados para el cliente:', this.selectedItem);
                this.showEditModal = false; // Cerramos el modal
                this.isEditing = false; // Reiniciamos el estado de edición
            } catch (error) {
                console.error('Error al guardar los cambios:', error);
            }
        }
    }
};
</script>

<style scoped></style>