<template>
    <div class="tabClientes">
        <b-table :items="items" :fields="fields" striped bordered hover responsive>
            <template #cell(acciones)="data">
                <b-button @click="openViewModal(data.item)" variant="primary">Ver</b-button>
            </template>
        </b-table>

        <!-- Modal para ver y editar la información del cliente -->
        <b-modal v-model="showEditModal" :title="`Cliente ID #${selectedItem.id}`">
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
            selectedItem: {},
            isEditing: false,
        };
    },
    computed: {
        ...mapGetters(['getClientes']),
        items() {
            return this.getClientes;
        }
    },
    methods: {
        ...mapActions(['updateCliente']),
        openViewModal(item) {
            this.selectedItem = { ...item };
            this.isEditing = false;
            this.showEditModal = true;
        },
        async saveChanges() {
            try {
                await this.updateCliente(this.selectedItem);
                console.log('Cambios guardados para el cliente:', this.selectedItem);
                this.showEditModal = false;
            } catch (error) {
                console.error('Error al guardar los cambios:', error);
            }
        }
    }
};
</script>

<style scoped></style>