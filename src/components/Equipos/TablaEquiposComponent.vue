<template>
    <div class="tabEquipos">
        <!-- Campo de búsqueda -->
        <b-form-group class="mb-3">
            <div class="d-flex align-items-center">
                <label class="mr-2" for="searchInput">Buscar</label>
                <b-form-input id="searchInput" v-model="searchQuery" placeholder="Buscar por marca, modelo,nro de serie, estado o ID"
                    class="form-control-sm" style="width: 300px;"> <!-- Ajusta el ancho según sea necesario -->
                </b-form-input>
            </div>
        </b-form-group>

        <b-table :items="filteredItems" :fields="fields" striped bordered hover responsive>
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
                <b-button variant="primary" @click="generatePDF">Generar PDF</b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { BButton, BModal, BForm, BFormGroup, BFormInput, BRow, BCol, BFormSelect, BFormTextarea } from 'bootstrap-vue';
import logo from '@/assets/logomm.png'
import jsPDF from 'jspdf'; // Importar jsPDF

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
            showCompleteViewModal: false,
            selectedItem: {},
            clienteInfo: {},
            estadoOptions: [
                { value: 'En revisión', text: 'En revisión' },
                { value: 'Cotizado', text: 'Cotizado' },
                { value: 'OC Recibida', text: 'OC Recibida' },
                { value: 'Despachado', text: 'Despachado' },
                { value: 'Facturado', text: 'Facturado' },
                { value: 'Garantía', text: 'Garantía' }
            ],
            isEditing: false,
            calculatedMaintenanceDate: '',
            searchQuery: '', // Nueva propiedad para almacenar la consulta de búsqueda
            logo
        };
    },
    computed: {
        ...mapGetters(['getItems', 'getClientes']),
        items() {
            return this.getItems;
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
                    item.marca.toLowerCase().includes(query) || // Filtrar por marca
                    item.modelo.toLowerCase().includes(query) || // Filtrar por modelo
                    item.nro_serie.toLowerCase().includes(query) || // Filtrar por nro de serie
                    item.estado.toLowerCase().includes(query) // Filtrar por estado
                );
            });
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
            this.selectedItem = { ...item };
            this.showCompleteViewModal = true;
        },
        calculateMaintenanceDate() {
            if (this.selectedItem.fecha_ingreso) {
                const fechaIngreso = new Date(this.selectedItem.fecha_ingreso);
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
        },
        generatePDF() {
            const doc = new jsPDF();

            // Cargar el logo (asegúrate de que la ruta sea correcta)
            const logo = new Image();
            logo.src = this.logo; // Cambia esto a la ruta de tu logo

            logo.onload = () => {
                // Agregar el logo al PDF
                doc.addImage(logo, 'PNG', 10, 10, 50, 20); // Ajusta las coordenadas y el tamaño según sea necesario

                // Título centrado "Mmedical"
                doc.setFontSize(22);
                const title = 'Mmedical';
                const titleWidth = doc.getTextWidth(title);
                const pageWidth = doc.internal.pageSize.getWidth();
                const titleX = (pageWidth - titleWidth) / 2; // Calcular la posición X para centrar
                doc.text(title, titleX, 40); // Ajusta la posición Y para que esté debajo del logo

                // Agregar un salto de línea bajo el título "Mmedical"
                const lineHeight = 10; // Altura de la línea
                const spaceBelowTitle = 10; // Espacio adicional que deseas agregar
                const nextYPosition = 40 + lineHeight + spaceBelowTitle; // Nueva posición Y para el siguiente texto

                // Título del documento
                doc.setFontSize(18);
                doc.text('Información del Equipo', 14, nextYPosition);
                doc.setFontSize(12);
                doc.text(`ID Equipo: ${this.selectedItem.id}`, 14, nextYPosition + 10);
                doc.text(`Marca: ${this.selectedItem.marca}`, 14, nextYPosition + 20);
                doc.text(`Modelo: ${this.selectedItem.modelo}`, 14, nextYPosition + 30);
                doc.text(`Nro Serie: ${this.selectedItem.nro_serie}`, 14, nextYPosition + 40);
                doc.text(`Fecha Ingreso: ${this.formatDate(this.selectedItem.fecha_ingreso)}`, 14, nextYPosition + 50);
                doc.text(`Fecha Entrega: ${this.formatDate(this.selectedItem.fecha_entrega)}`, 14, nextYPosition + 60);
                doc.text(`Fecha Mantenimiento: ${this.formatDate(this.selectedItem.fecha_mantencion)}`, 14, nextYPosition + 70);
                doc.text(`Estado: ${this.selectedItem.estado}`, 14, nextYPosition + 80);
                doc.text(`Detalle: ${this.selectedItem.detalle}`, 14, nextYPosition + 90);
                doc.text(`Otro Detalle: ${this.selectedItem.otroDetalle}`, 14, nextYPosition + 100);
                doc.text(`Accesorios: ${this.selectedItem.accesorios}`, 14, nextYPosition + 110);

                // Agregar un salto de línea antes de la información del cliente
                doc.text('', 14, nextYPosition + 120); // Esto crea un espacio en blanco

                // Información del Cliente
                doc.setFontSize(18);
                doc.text('Información del Cliente', 14, nextYPosition + 130);
                doc.setFontSize(12);
                doc.text(`Razón Social: ${this.clienteInfo.razonSocial}`, 14, nextYPosition + 140);
                doc.text(`RUT: ${this.clienteInfo.rut}`, 14, nextYPosition + 150);
                doc.text(`Centro Médico: ${this.clienteInfo.centroMedico}`, 14, nextYPosition + 160);
                doc.text(`Contacto: ${this.clienteInfo.contacto}`, 14, nextYPosition + 170);
                doc.text(`Teléfono: ${this.clienteInfo.fono}`, 14, nextYPosition + 180);
                doc.text(`Email: ${this.clienteInfo.email}`, 14, nextYPosition + 190);

                // Guardar el PDF
                doc.save(`informacion_equipo_${this.selectedItem.id}.pdf`);
            };
        }
    }
};
</script>

<style scoped>
/* Aquí puedes agregar estilos específicos si es necesario */
</style>