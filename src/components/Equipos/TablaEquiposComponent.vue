<template>
    <div class="tabEquipos">
        <b-table :items="items" :fields="fields" striped bordered hover responsive>
            <template #cell(fecha_mantencion)="data">
                <span>{{ formatDate(data.item.fecha_mantencion) }}</span>
            </template>
            <template #cell(acciones)="data">
                <div class="d-flex align-items-center">
                    <b-icon icon="eye-fill" @click="openViewModal(data.item)" scale="1" variant="success"
                        style="cursor: pointer; margin-right: 8px;"></b-icon>

                    <b-icon icon="pencil-fill" @click="openEditModal(data.item)" scale="1" variant="warning"
                        style="cursor: pointer; margin-right: 8px;"></b-icon>

                    <b-icon icon="trash-fill" @click="confirmDelete(data.item.id)" scale="1" variant="danger"
                        style="cursor: pointer; margin-right: 8px;"></b-icon>

                    <b-icon icon="card-list" @click="openCompleteViewModal(data.item)" scale="1" variant="info"
                        style="cursor: pointer; margin-right: 8px;"></b-icon>
                </div>
            </template>
        </b-table>

        <!-- Modal para ver y editar la información del elemento -->
        <b-modal v-model="showEditModal" :title="`Equipo ID #${selectedItem.id}`" size="lg">
            <div>
                <b-form @submit.prevent="isEditing ? saveChanges() : null">
                    <b-row>
                        <b-col cols="6">
                            <b-form-group label="ID">
                                <b-form-input v-model="selectedItem.id" disabled></b-form-input>
                            </b-form-group>
                            <b-form-group label="Marca">
                                <b-form-input v-model="selectedItem.marca" :disabled="!isEditing"></b-form-input>
                            </b-form-group>
                            <b-form-group label="Modelo">
                                <b-form-input v-model="selectedItem.modelo" :disabled="!isEditing"></b-form-input>
                            </b-form-group>
                            <b-form-group label="Nro Serie">
                                <b-form-input v-model="selectedItem.nro_serie" :disabled="!isEditing"></b-form-input>
                            </b-form-group>
                            <b-form-group label="ID Cliente">
                                <b-form-input v-model="selectedItem.id_cliente" :disabled="!isEditing"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col cols="6">
                            <b-form-group label="Fecha Ingreso">
                                <template v-if="isEditing">
                                    <b-form-input type="date" v-model="selectedItem.fecha_ingreso"></b-form-input>
                                </template>
                                <template v-else>
                                    <span>{{ formatDate(selectedItem.fecha_ingreso) }}</span>
                                </template>
                            </b-form-group>
                            <b-form-group label="Fecha Entrega">
                                <template v-if="isEditing">
                                    <b-form-input type="date" v-model="selectedItem.fecha_entrega"></b-form-input>
                                </template>
                                <template v-else>
                                    <span>{{ formatDate(selectedItem.fecha_entrega) }}</span>
                                </template>
                            </b-form-group>
                            <b-form-group label="Fecha Mantención">
                                <template v-if="isEditing">
                                    <span>{{ formatDate(calculatedMaintenanceDate) }}</span>
                                </template>
                                <template v-else>
                                    <span>{{ formatDate(calculatedMaintenanceDate) }}</span>
                                </template>
                            </b-form-group>
                            <b-form-group label="Estado">
                                <b-form-select v-model="selectedItem.estado" :options="estadoOptions"
                                    :disabled="!isEditing" required></b-form-select>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <b-form-group label="Detalle">
                                <b-form-textarea v-model="selectedItem.detalle" :disabled="!isEditing"
                                    rows="3"></b-form-textarea>
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group label="Otro Detalle">
                                <b-form-textarea v-model="selectedItem.otroDetalle" :disabled="!isEditing"
                                    rows="3"></b-form-textarea>
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group label="Accesorios">
                                <b-form-textarea v-model="selectedItem.accesorios" :disabled="!isEditing"
                                    rows="3"></b-form-textarea>
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

        <!-- Modal para ver la información del cliente y del equipo -->
        <b-modal v-model="showCompleteViewModal" title="Información Completa" size="lg">
            <div>
                <b-row>
                    <b-col cols="6">
                        <h5>Información del Equipo</h5>
                        <p><strong>ID Equipo:</strong> {{ selectedItem.id }}</p>
                        <p><strong>Marca:</strong> {{ selectedItem.marca }}</p>
                        <p><strong>Modelo:</strong> {{ selectedItem.modelo }}</p>
                        <p><strong>Nro Serie:</strong> {{ selectedItem.nro_serie }}</p>
                        <p><strong>Fecha Ingreso:</strong> {{ formatDate(selectedItem.fecha_ingreso) }}</p>
                        <p><strong>Fecha Entrega:</strong> {{ formatDate(selectedItem.fecha_entrega) }}</p>
                        <p><strong>Fecha Mantenimiento:</strong> {{ formatDate(selectedItem.fecha_mantencion) }}</p>
                        <p><strong>Estado:</strong> {{ selectedItem.estado }}</p>
                        <p><strong>Detalle:</strong> {{ selectedItem.detalle }}</p>
                        <p><strong>Otro Detalle:</strong> {{ selectedItem.otroDetalle }}</p>
                        <p><strong>Accesorios:</strong> {{ selectedItem.accesorios }}</p>
                    </b-col>

                    <b-col cols="6">
                        <h5>Información del Cliente</h5>
                        <p><strong>Razón Social:</strong> {{ clienteInfo.razonSocial }}</p>
                        <p><strong>RUT:</strong> {{ clienteInfo.rut }}</p>
                        <p><strong>Centro Médico:</strong> {{ clienteInfo.centroMedico }}</p>
                        <p><strong>Contacto:</strong> {{ clienteInfo.contacto }}</p>
                        <p><strong>Teléfono:</strong> {{ clienteInfo.fono }}</p>
                        <p><strong>Email:</strong> {{ clienteInfo.email }}</p>
                    </b-col>
                </b-row>
            </div>
            <template #modal-footer>
                <b-button variant="secondary" @click="showCompleteViewModal = false">Cerrar</b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { BButton, BModal, BForm, BFormGroup, BFormInput, BRow, BCol, BFormSelect, BFormTextarea } from 'bootstrap-vue';

export default {
    name: 'TablaEquiposComponent',
    components: {
        BButton,
        BModal,
        BForm,
        BFormGroup,
        BFormInput,
        BRow,
        BCol,
        BFormSelect,
        BFormTextarea
    },
    data() {
        return {
            fields: [
                { key: 'id', label: 'ID' },
                { key: 'marca', label: 'Marca' },
                { key: 'modelo', label: 'Modelo' },
                { key: 'nro_serie', label: 'Nro Serie' },
                { key: 'fecha_mantencion', label: 'Fecha Mantención' },
                { key: 'estado', label: 'Estado' },
                { key: 'acciones', label: 'Acciones' },
            ],
            showEditModal: false,
            showCompleteViewModal: false, // Nueva propiedad para el modal de información completa
            selectedItem: {},
            clienteInfo: {}, // Nueva propiedad para almacenar la información del cliente
            estadoOptions: [
                { value: 'En revisión', text: 'En revisión' },
                { value: 'Cotizado', text: 'Cotizado' },
                { value: 'OC Recibida', text: 'OC Recibida' },
                { value: 'Despachado', text: 'Despachado' },
                { value: 'Facturado', text: 'Facturado' },
                { value: 'Garantía', text: 'Garantía' }
            ],
            isEditing: false,
            calculatedMaintenanceDate: ''
        };
    },
    computed: {
        ...mapGetters(['getItems', 'getClientes']), // Asegúrate de incluir getClientes
        items() {
            return this.getItems;
        }
    },
    methods: {
        ...mapActions(['updateItem', 'deleteItem']),
        openViewModal(item) {
            this.selectedItem = { ...item };
            this.isEditing = false;
            this.showEditModal = true;
            this.calculateMaintenanceDate();
        },
        openEditModal(item) {
            this.selectedItem = { ...item };
            this.isEditing = true;
            this.showEditModal = true;
            this.calculateMaintenanceDate();
        },
        openCompleteViewModal(item) {
            const clienteId = item.id_cliente;
            this.clienteInfo = this.getClientes.find(cliente => cliente.id === String(clienteId)) || {};
            this.selectedItem = { ...item }; // Asegúrate de que selectedItem tenga la información del equipo
            this.showCompleteViewModal = true;
        },
        calculateMaintenanceDate() {
            if (this.selectedItem.fecha_ingreso) {
                const fechaIngreso = new Date(this.selectedItem.fecha_ingreso)
                const fechaMantenimiento = new Date(fechaIngreso.setFullYear(fechaIngreso.getFullYear() + 1));
                this.calculatedMaintenanceDate = fechaMantenimiento.toISOString().substr(0, 10);
            } else {
                this.calculatedMaintenanceDate = '';
            }
        },
        async saveChanges() {
            try {
                this.selectedItem.fecha_mantencion = this.calculatedMaintenanceDate;
                await this.updateItem(this.selectedItem);
                console.log('Cambios guardados para el item:', this.selectedItem);
                this.showEditModal = false;
            } catch (error) {
                console.error('Error al guardar los cambios:', error);
            }
        },
        confirmDelete(itemId) {
            this.$bvModal.msgBoxConfirm('¿Estás seguro de que deseas eliminar este elemento?', {
                title: 'Confirmar Eliminación',
                okTitle: 'Eliminar',
                cancelTitle: 'Cancelar',
                okVariant: 'danger',
                cancelVariant: 'secondary',
                centered: true
            }).then((value) => {
                if (value) {
                    this.deleteItem(itemId).then(() => {
                        console.log(`Elemento con ID ${itemId} eliminado.`);
                    }).catch(error => {
                        console.error('Error al eliminar el elemento:', error);
                    });
                }
            });
        },
        formatDate(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        }
    }
};
</script>

<style scoped></style>