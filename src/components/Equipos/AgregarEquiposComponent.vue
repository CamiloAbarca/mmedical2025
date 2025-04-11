<template>
    <div class="container">
        <b-form @submit.prevent="onSubmit">
            <b-row>
                <b-col md="6">
                    <b-form-group label="ID" label-for="id">
                        <b-form-input id="id" v-model="formData.id" required></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md="6">
                    <b-form-group label="Marca" label-for="marca">
                        <b-form-input id="marca" v-model="formData.marca" required></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col md="6">
                    <b-form-group label="Modelo" label-for="modelo">
                        <b-form-input id="modelo" v-model="formData.modelo" required></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md="6">
                    <b-form-group label="Nro de Serie" label-for="nro_serie">
                        <b-form-input id="nro_serie" v-model="formData.nro_serie" required></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col md="6">
                    <b-form-group label="Fecha de Ingreso" label-for="fecha_ingreso">
                        <b-form-input type="date" id="fecha_ingreso" v-model="formData.fecha_ingreso"
                            required></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md="6">
                    <b-form-group label="Fecha de Entrega" label-for="fecha_entrega">
                        <b-form-input type="date" id="fecha_entrega" v-model="formData.fecha_entrega"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col md="6">
                    <b-form-group label="Estado" label-for="estado">
                        <b-form-select id="estado" v-model="formData.estado" :options="estadoOptions"
                            required></b-form-select>
                    </b-form-group>
                </b-col>
                <b-col md="6">
                    <b-form-group label="ID Cliente" label-for="id_cliente">
                        <b-form-select id="id_cliente" v-model="formData.id_cliente" :options="clienteOptions"
                            required></b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col md="4">
                    <b-form-group label="Detalle" label-for="detalle">
                        <b-form-textarea id="detalle" v-model="formData.detalle" rows="3" required></b-form-textarea>
                    </b-form-group>
                </b-col>
                <b-col md="4">
                    <b-form-group label="Otro Detalle" label-for="otroDetalle">
                        <b-form-textarea id="otroDetalle" v-model="formData.otroDetalle" rows="3"></b-form-textarea>
                    </b-form-group>
                </b-col>
                <b-col md="4">
                    <b-form-group label="Accesorios" label-for="accesorios">
                        <b-form-textarea id="accesorios" v-model="formData.accesorios" rows="3"></b-form-textarea>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-button type="submit" variant="primary">Agregar</b-button>
        </b-form>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'AgregarEquiposComponent',
    data() {
        return {
            formData: {
                id: '',
                marca: '',
                modelo: '',
                nro_serie: '',
                fecha_ingreso: '',
                fecha_entrega: '',
                fecha_mantencion: '',
                estado: '',
                detalle: '',
                otroDetalle: '',
                accesorios: '',
                id_cliente: ''
            },
            estadoOptions: [
                { value: 'En revisión', text: 'En revisión' },
                { value: 'Cotizado', text: 'Cotizado' },
                { value: 'OC Recibida', text: 'OC Recibida' },
                { value: 'Despachado', text: 'Despachado' },
                { value: 'Facturado', text: 'Facturado' },
                { value: 'Garantía', text: 'Garantía' }
            ]
        };
    },
    computed: {
        ...mapGetters(['getClientes', 'getEquipos']), // Mapea el getter para obtener los clientes y equipos
        clienteOptions() {
            return this.getClientes.map(cliente => {
                return {
                    value: cliente.id,
                    text: `${cliente.razonSocial} - ${cliente.centroMedico}`
                };
            });
        }
    },
    methods: {
        ...mapActions(['addItem']), // Mapea la acción addItem del store
        onSubmit() {
            // Validar que el número de serie no exista
            const existingEquipment = this.getEquipos.find(equipo => equipo.nro_serie === this.formData.nro_serie);
            if (existingEquipment) {
                this.$bvToast.toast('El número de serie ya existe. Por favor, ingrese uno diferente.', {
                    title: 'Advertencia!',
                    variant: 'warning',
                    solid: true
                });
                return; // Detener el envío del formulario
            }

            // Calcular la fecha de mantenimiento como un año después de la fecha de ingreso
            if (this.formData.fecha_ingreso) {
                const fechaIngreso = new Date(this.formData.fecha_ingreso);
                const fechaMantenimiento = new Date(fechaIngreso.setFullYear(fechaIngreso.getFullYear() + 1));
                this.formData.fecha_mantencion = fechaMantenimiento.toISOString().substr(0, 10); // Formato YYYY-MM-DD
            }

            // Llama a la acción del store para agregar el nuevo equipo
            this.addItem(this.formData);
            // Resetear el formulario después de agregar
            this.resetForm();
            // Cerrar el modal (asumiendo que tienes una propiedad para controlar la visibilidad del modal)
            this.$emit('close-modal'); // Emitir un evento para cerrar el modal
        },
        resetForm() {
            this.formData = {
                id: '',
                marca: '',
                modelo: '',
                nro_serie: '',
                fecha_ingreso: '',
                fecha_entrega: '',
                fecha_mantencion: '',
                estado: '',
                detalle: '',
                otroDetalle: '',
                accesorios: '',
                id_cliente: ''
            };
        }
    }
}
</script>

<style>
.container {
    margin-top: 20px;
}

h1 {
    margin-bottom: 20px;
}

.b-form-group {
    margin-bottom: 15px;
}

.b-button {
    margin-top: 20px;
}
</style>