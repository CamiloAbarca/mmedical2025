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
                    <b-form-group label="Razón Social" label-for="razonSocial">
                        <b-form-input id="razonSocial" v-model="formData.razonSocial" required></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col md="6">
                    <b-form-group label="RUT" label-for="rut">
                        <b-form-input id="rut" v-model="formData.rut" required></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md="6">
                    <b-form-group label="Centro Médico" label-for="centroMedico">
                        <b-form-input id="centroMedico" v-model="formData.centroMedico" required></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col md="6">
                    <b-form-group label="Contacto" label-for="contacto">
                        <b-form-input id="contacto" v-model="formData.contacto" required></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md="6">
                    <b-form-group label="Teléfono" label-for="fono">
                        <b-form-input id="fono" v-model="formData.fono" required></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col md="6">
                    <b-form-group label="Email" label-for="email">
                        <b-form-input type="email" id="email" v-model="formData.email" required></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-button type="submit" variant="primary">Agregar Cliente</b-button>
        </b-form>
    </div>
</template>

<script>
import { mapActions } from 'vuex'; // Importa mapActions para mapear acciones del store

export default {
    name: 'AgregarClientesComponent',
    data() {
        return {
            formData: {
                id: '',
                razonSocial: '',
                rut: '',
                centroMedico: '',
                contacto: '',
                fono: '',
                email: ''
            }
        };
    },
    methods: {
        ...mapActions(['addCliente']), // Mapea la acción addCliente del store
        onSubmit() {
            // Llama a la acción del store para agregar el nuevo cliente
            this.addCliente(this.formData);
            // Resetear el formulario después de agregar
            this.resetForm();
            // Cerrar el modal (asumiendo que tienes una propiedad para controlar la visibilidad del modal)
            this.$emit('close-modal'); // Emitir un evento para cerrar el modal
        },
        resetForm() {
            this.formData = {
                id: '',
                razonSocial: '',
                rut: '',
                centroMedico: '',
                contacto: '',
                fono: '',
                email: ''
            };
        }
    }
}
</script>

<style>
.container {
    margin-top: 20px;
}

.b-form-group {
    margin-bottom: 15px;
}

.b-button {
    margin-top: 20px;
}
</style>