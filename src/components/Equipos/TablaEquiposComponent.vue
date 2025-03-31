<template>
    <div class="tabEquipos">
        <b-table :items="items" :fields="fields" striped bordered hover responsive>
        </b-table>
    </div>
</template>

<script>
export default {
    name:'TablaEquiposComponent',
    data() {
        return {
            fields: [
                { key: 'id', label: 'ID' },
                { key: 'marca', label: 'Marca' },
                { key: 'modelo', label: 'Modelo' },
                { key: 'fecha_mantencion', label: 'Fecha Mantención' },
                { key: 'estado', label: 'Estado' }
            ],
            items: [
                { id: '10', marca: 'AEWX3453678', modelo: 'RotomPKM2396', fecha_mantencion: '10/06/2024', estado: 'Pendiente'},
                { id: '23', marca: 'AEWX3453678', modelo: 'RotomPKM2396', fecha_mantencion: '10/06/2024', estado: 'Pendiente'},
                { id: '46', marca: 'AEWX3453678', modelo: 'RotomPKM2396', fecha_mantencion: '10/06/2024', estado: 'Pendiente'},
                { id: '78', marca: 'AEWX3453678', modelo: 'RotomPKM2396', fecha_mantencion: '10/06/2024', estado: 'Pendiente'},
            ]
        };
    }
};
</script>

<style scoped>

</style>